import { MelodyGenerator } from "./enhanced-melody-generator"
import { VocalGenerator } from "./enhanced-vocal-generator"
import type { Song } from "@shared/schema"

export interface EnhancedSongData {
  title: string
  lyrics: string
  genre: string
  mood: string
  tempo?: number
  vocals?: string
  userVoiceSample?: Blob
  structure?: string[]
  vocalSettings?: VocalSettings
  metadata?: Record<string, any>
}

export interface VocalSettings {
  voiceType: string
  pitchRange: [number, number]
  vibratoIntensity: number
  breathControl: number
  articulationStyle: string
}

export class EnhancedMusicGenerator {
  private melodyGenerator: MelodyGenerator
  private vocalGenerator: VocalGenerator

  // Genre-specific configurations
  private genreConfigs = {
    pop: {
      tempoRange: [100, 140],
      energyRange: [0.6, 0.9],
      structure: ["intro", "verse", "chorus", "verse", "chorus", "bridge", "chorus", "outro"],
      vocalStyle: "clear_melodic",
    },
    rock: {
      tempoRange: [110, 160],
      energyRange: [0.7, 1.0],
      structure: ["intro", "verse", "chorus", "verse", "chorus", "solo", "chorus", "outro"],
      vocalStyle: "powerful_raspy",
    },
    hip_hop: {
      tempoRange: [70, 100],
      energyRange: [0.6, 0.8],
      structure: ["intro", "verse", "hook", "verse", "hook", "bridge", "hook", "outro"],
      vocalStyle: "rhythmic_rap",
    },
    electronic: {
      tempoRange: [120, 140],
      energyRange: [0.8, 1.0],
      structure: ["intro", "buildup", "drop", "breakdown", "buildup", "drop", "outro"],
      vocalStyle: "processed_synthetic",
    },
  }

  constructor() {
    this.melodyGenerator = new MelodyGenerator()
    this.vocalGenerator = new VocalGenerator()
  }

  async generateSong(songData: EnhancedSongData): Promise<Song> {
    console.log(`🎵 Starting enhanced song generation: ${songData.title}`)

    try {
      // Validate and enhance input data
      const enhancedData = this.enhanceSongData(songData)

      // Generate melody with lyrics integration
      console.log("🎼 Generating melody from lyrics...")
      const melody = await this.melodyGenerator.generateMelodyFromLyrics({
        lyrics: enhancedData.lyrics,
        genre: enhancedData.genre,
        mood: enhancedData.mood,
        tempo: enhancedData.tempo!,
        structure: enhancedData.structure,
      })

      // Generate vocals with melody synchronization
      console.log("🎤 Generating vocals...")
      const vocals = await this.vocalGenerator.generateVocalsWithMelody({
        lyrics: enhancedData.lyrics,
        melody: melody,
        vocalSettings: enhancedData.vocalSettings,
        userVoiceSample: enhancedData.userVoiceSample,
      })

      // Create comprehensive song object
      const song: Song = {
        id: `song_${Date.now()}`,
        title: enhancedData.title,
        lyrics: enhancedData.lyrics,
        genre: enhancedData.genre,
        mood: enhancedData.mood,
        tempo: enhancedData.tempo!,
        melody: melody,
        vocals: vocals,
        audioUrl: `/generated/${enhancedData.title.toLowerCase().replace(/\s+/g, "_")}.wav`,
        createdAt: new Date().toISOString(),
        metadata: {
          ...enhancedData.metadata,
          generationTime: Date.now(),
          noteCount: melody.noteCount,
          duration: melody.totalDuration,
          vocalEffects: Object.keys(vocals.vocalEffects),
        },
      }

      console.log(`✅ Song generation completed: ${melody.noteCount} notes, ${melody.totalDuration.toFixed(1)}s`)
      return song
    } catch (error) {
      console.error("❌ Error generating song:", error)
      throw new Error(`Failed to generate song: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  private enhanceSongData(songData: EnhancedSongData): Required<EnhancedSongData> {
    const genre = songData.genre.toLowerCase()
    const config = this.genreConfigs[genre as keyof typeof this.genreConfigs] || this.genreConfigs.pop

    // Set tempo if not provided
    const tempo = songData.tempo || this.randomInRange(config.tempoRange[0], config.tempoRange[1])

    // Set structure if not provided
    const structure = songData.structure || config.structure

    // Set vocal settings if not provided
    const vocalSettings: VocalSettings = songData.vocalSettings || {
      voiceType: songData.vocals || "male_lead",
      pitchRange: [60, 84], // C4 to C6
      vibratoIntensity: 0.3,
      breathControl: 0.7,
      articulationStyle: config.vocalStyle,
    }

    return {
      ...songData,
      tempo,
      structure,
      vocalSettings,
      vocals: songData.vocals || "male_lead",
      userVoiceSample: songData.userVoiceSample || undefined,
      metadata: songData.metadata || {},
    }
  }

  private randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Advanced analysis methods
  async analyzeLyrics(lyrics: string): Promise<{
    emotionalArc: number[]
    syllableCounts: number[]
    complexity: "low" | "medium" | "high"
    sentiment: "positive" | "negative" | "neutral"
    themes: string[]
  }> {
    // This would integrate with NLP services
    const lines = lyrics.split("\n").filter((line) => line.trim())

    // Mock analysis - replace with actual NLP
    const emotionalArc = lines.map(() => Math.random() * 2 - 1) // -1 to 1
    const syllableCounts = lines.map((line) => this.countSyllables(line))
    const totalSyllables = syllableCounts.reduce((sum, count) => sum + count, 0)

    return {
      emotionalArc,
      syllableCounts,
      complexity: totalSyllables > 100 ? "high" : totalSyllables > 50 ? "medium" : "low",
      sentiment: emotionalArc.reduce((sum, val) => sum + val, 0) > 0 ? "positive" : "negative",
      themes: this.extractThemes(lyrics),
    }
  }

  private countSyllables(text: string): number {
    // Simple syllable counting
    return text
      .toLowerCase()
      .split(/\s+/)
      .reduce((count, word) => {
        const vowels = word.match(/[aeiou]/g)
        return count + Math.max(1, vowels ? vowels.length : 1)
      }, 0)
  }

  private extractThemes(lyrics: string): string[] {
    const themeKeywords = {
      love: ["love", "heart", "kiss", "romance", "together"],
      freedom: ["free", "fly", "escape", "break", "chains"],
      dreams: ["dream", "hope", "wish", "future", "believe"],
      party: ["dance", "party", "night", "fun", "celebrate"],
      sadness: ["sad", "cry", "tears", "pain", "hurt"],
      success: ["win", "success", "achieve", "goal", "victory"],
    }

    const lyricsLower = lyrics.toLowerCase()
    const themes: string[] = []

    for (const [theme, keywords] of Object.entries(themeKeywords)) {
      if (keywords.some((keyword) => lyricsLower.includes(keyword))) {
        themes.push(theme)
      }
    }

    return themes
  }

  // Export methods for different formats
  async exportToMIDI(song: Song): Promise<Blob> {
    // Convert song data to MIDI format
    console.log("🎼 Exporting to MIDI...")

    // This would use a MIDI library like 'midi-writer-js'
    // For now, return mock data
    const midiData = new Uint8Array([
      /* MIDI bytes */
    ])
    return new Blob([midiData], { type: "audio/midi" })
  }

  async exportToWAV(song: Song): Promise<Blob> {
    // Convert song data to WAV format
    console.log("🎵 Exporting to WAV...")

    // This would use audio synthesis libraries
    // For now, return mock data
    const wavData = new Uint8Array([
      /* WAV bytes */
    ])
    return new Blob([wavData], { type: "audio/wav" })
  }

  async exportToJSON(song: Song): Promise<string> {
    // Export complete song data as JSON
    return JSON.stringify(song, null, 2)
  }
}

// Usage example
export async function createEnhancedSong(songData: EnhancedSongData): Promise<Song> {
  const generator = new EnhancedMusicGenerator()
  return await generator.generateSong(songData)
}
