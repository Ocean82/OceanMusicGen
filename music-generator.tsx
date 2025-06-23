"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Download, Share2, Settings, Music, Mic, Palette, Volume2, Clock, Zap } from "lucide-react"

export default function MusicGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [generatedSong, setGeneratedSong] = useState<string | null>(null)
  const [lyrics, setLyrics] = useState("")
  const [songTitle, setSongTitle] = useState("")

  // Audio parameters
  const [tempo, setTempo] = useState([120])
  const [energy, setEnergy] = useState([70])
  const [duration, setDuration] = useState([180])
  const [creativity, setCreativity] = useState([75])

  const genres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "Electronic",
    "Jazz",
    "Classical",
    "Country",
    "R&B",
    "Reggae",
    "Folk",
    "Blues",
    "Funk",
    "Disco",
    "Ambient",
    "Lo-fi",
  ]

  const vocals = [
    "Male Lead",
    "Female Lead",
    "Choir",
    "Rap",
    "Whisper",
    "Powerful",
    "Soft",
    "Raspy",
    "Auto-tuned",
    "Acapella",
    "Duet",
    "No Vocals",
  ]

  const themes = [
    "Love",
    "Heartbreak",
    "Adventure",
    "Party",
    "Motivation",
    "Nostalgia",
    "Freedom",
    "Dreams",
    "Friendship",
    "Success",
    "Nature",
    "City Life",
    "Romance",
    "Rebellion",
    "Hope",
    "Celebration",
  ]

  const moods = [
    "Happy",
    "Sad",
    "Energetic",
    "Calm",
    "Mysterious",
    "Uplifting",
    "Dark",
    "Playful",
    "Intense",
    "Dreamy",
    "Aggressive",
    "Peaceful",
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate generation process
    setTimeout(() => {
      setGeneratedSong("generated-song-url")
      setIsGenerating(false)
    }, 3000)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Music Generator
          </h1>
          <p className="text-gray-600">Transform your ideas into music with AI-powered generation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Song Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Song Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Song Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter your song title..."
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lyrics">Lyrics / Prompt</Label>
                  <Textarea
                    id="lyrics"
                    placeholder="Enter your lyrics or describe the song you want to create..."
                    className="min-h-32"
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Style Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Style Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Genre</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select genre" />
                          </SelectTrigger>
                          <SelectContent>
                            {genres.map((genre) => (
                              <SelectItem key={genre} value={genre.toLowerCase()}>
                                {genre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Vocals</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vocals" />
                          </SelectTrigger>
                          <SelectContent>
                            {vocals.map((vocal) => (
                              <SelectItem key={vocal} value={vocal.toLowerCase()}>
                                {vocal}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Theme</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            {themes.map((theme) => (
                              <SelectItem key={theme} value={theme.toLowerCase()}>
                                {theme}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Mood</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mood" />
                          </SelectTrigger>
                          <SelectContent>
                            {moods.map((mood) => (
                              <SelectItem key={mood} value={mood.toLowerCase()}>
                                {mood}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Tempo: {tempo[0]} BPM
                        </Label>
                        <Slider value={tempo} onValueChange={setTempo} max={200} min={60} step={1} className="w-full" />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Volume2 className="w-4 h-4" />
                          Energy: {energy[0]}%
                        </Label>
                        <Slider
                          value={energy}
                          onValueChange={setEnergy}
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Duration: {Math.floor(duration[0] / 60)}:{(duration[0] % 60).toString().padStart(2, "0")}
                        </Label>
                        <Slider
                          value={duration}
                          onValueChange={setDuration}
                          max={300}
                          min={30}
                          step={15}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Creativity: {creativity[0]}%
                        </Label>
                        <Slider
                          value={creativity}
                          onValueChange={setCreativity}
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Card>
              <CardContent className="pt-6">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !lyrics.trim()}
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Generating Music...
                    </>
                  ) : (
                    <>
                      <Music className="w-5 h-5 mr-2" />
                      Generate Song
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Audio Player */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  Generated Song
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {generatedSong ? (
                  <>
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Music className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold">{songTitle || "Untitled Song"}</h3>
                      <p className="text-sm text-gray-600">AI Generated • 3:00</p>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={togglePlayback} className="flex-1">
                        {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                        {isPlaying ? "Pause" : "Play"}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Generate a song to see it here</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Presets */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Presets</CardTitle>
                <CardDescription>Popular style combinations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-purple-100">
                    Pop Ballad
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-purple-100">
                    Hip Hop Beat
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-purple-100">
                    Electronic Dance
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-purple-100">
                    Acoustic Folk
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-purple-100">
                    Rock Anthem
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-purple-100">
                    Jazz Smooth
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Generations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Generations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center py-4 text-gray-500 text-sm">Your generated songs will appear here</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
