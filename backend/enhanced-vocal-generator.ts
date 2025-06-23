import type { GeneratedMelody, VocalSettings } from "@shared/schema"

export interface VocalGenerationConfig {
  lyrics: string
  melody: GeneratedMelody
  vocalSettings?: VocalSettings
  userVoiceSample?: Blob
}

export interface PhonemeData {
  phoneme: string
  startTime: number
  duration: number
  pitch: number
  velocity: number
}

export interface VoiceModel {
  id: string
}
