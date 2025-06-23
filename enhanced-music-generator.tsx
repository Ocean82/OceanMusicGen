"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Music, Mic, Settings, Download, Crown, Zap } from "lucide-react"

// Import enhanced components
import EnhancedSongForm from "./components/enhanced-song-form"
import EnhancedAudioPlayer from "./components/enhanced-audio-player"
import EnhancedVoiceCloner from "./components/enhanced-voice-cloner"
import SongLibrary from "./components/song-library"
import AnalyticsDashboard from "./components/analytics-dashboard"
import CollaborativeWorkspace from "./components/collaborative-workspace"

// Enhanced types
interface Song {
  id: string
  title: string
  lyrics: string
  genre: string
  mood: string
  tempo: number
  audioUrl: string
  status: "generating" | "completed" | "failed"
  generationProgress: number
  createdAt: string
  melody?: {
    noteCount: number
    totalDuration: number
    key: string
    scale: string
  }
  vocals?: {
    voiceType: string
    effects: string[]
  }
}

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  plan: "free" | "basic" | "pro" | "enterprise"
  songsThisMonth: number
  monthlyLimit: number
}

export default function EnhancedMusicGenerator() {
  // State management
  const [activeMenu, setActiveMenu] = useState("Create")
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSong, setCompletedSong] = useState<Song | null>(null)
  const [editingSong, setEditingSong] = useState<Song | null>(null)
  const [generatingSong, setGeneratingSong] = useState<Song | null>(null)
  const [user] = useState<User>({
    id: 1,
    email: "test@burnt-beats.com",
    firstName: "Test",
    lastName: "User",
    plan: "pro",
    songsThisMonth: 2,
    monthlyLimit: 50,
  })

  const { toast } = useToast()

  // Generation steps
  const steps = [
    { id: 1, name: "Create", active: currentStep === 1 },
    { id: 2, name: "Generate", active: currentStep === 2 },
    { id: 3, name: "Review", active: currentStep === 3 },
  ]

  // Menu items with enhanced features
  const menuItems = [
    { name: "Create", icon: Music, active: activeMenu === "Create" },
    { name: "Song Library", icon: Music, active: activeMenu === "Song Library" },
    { name: "Voice Studio", icon: Mic, active: activeMenu === "Voice Studio" },
    { name: "Analytics", icon: Settings, active: activeMenu === "Analytics", pro: true },
    { name: "Collaborate", icon: Settings, active: activeMenu === "Collaborate", pro: true },
  ]

  // Enhanced song generation
  const handleSongGenerated = useCallback(
    async (songData: any) => {
      try {
        setCurrentStep(2)
        setGeneratingSong({ ...songData, status: "generating", generationProgress: 0 })

        // Simulate enhanced generation process with realistic stages
        const stages = [
          { name: "Analyzing lyrics", progress: 15, delay: 1000 },
          { name: "Generating melody", progress: 35, delay: 2000 },
          { name: "Creating harmony", progress: 55, delay: 1500 },
          { name: "Processing vocals", progress: 75, delay: 2000 },
          { name: "Applying effects", progress: 90, delay: 1000 },
          { name: "Finalizing audio", progress: 100, delay: 500 },
        ]

        for (const stage of stages) {
          await new Promise((resolve) => setTimeout(resolve, stage.delay))
          setGeneratingSong((prev) =>
            prev ? { ...prev, generationProgress: stage.progress, currentStage: stage.name } : null,
          )
        }

        // Create completed song with enhanced metadata
        const completedSong: Song = {
          id: `song_${Date.now()}`,
          title: songData.title,
          lyrics: songData.lyrics,
          genre: songData.genre,
          mood: songData.mood,
          tempo: songData.tempo,
          audioUrl: `/generated/${songData.title.toLowerCase().replace(/\s+/g, "_")}.wav`,
          status: "completed",
          generationProgress: 100,
          createdAt: new Date().toISOString(),
          melody: {
            noteCount: Math.floor(Math.random() * 200) + 100,
            totalDuration: songData.duration || 180,
            key: ["C", "D", "E", "F", "G", "A", "B"][Math.floor(Math.random() * 7)],
            scale: ["major", "minor", "dorian"][Math.floor(Math.random() * 3)],
          },
          vocals: {
            voiceType: songData.vocals || "male_lead",
            effects: ["reverb", "chorus", "compression"],
          },
        }

        setCompletedSong(completedSong)
        setGeneratingSong(null)
        setCurrentStep(3)

        toast({
          title: "🎵 Song Generated Successfully!",
          description: `"${completedSong.title}" is ready to play`,
        })
      } catch (error) {
        console.error("Generation error:", error)
        setGeneratingSong(null)
        toast({
          title: "Generation Failed",
          description: "Please try again with different settings",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const handleEditSong = useCallback((song: Song) => {
    setEditingSong(song)
    setActiveMenu("Create")
    setCurrentStep(1)
  }, [])

  const handleSongUpdated = useCallback((song: Song) => {
    setCompletedSong(song)
    setEditingSong(null)
  }, [])

  const handleUpgrade = useCallback(() => {
    toast({
      title: "Upgrade Available",
      description: "Pro features unlock advanced capabilities",
    })
  }, [toast])

  const handleNewSong = useCallback(() => {
    setCurrentStep(1)
    setCompletedSong(null)
    setEditingSong(null)
    setActiveMenu("Create")
  }, [])

  // Main content renderer
  const renderMainContent = () => {
    switch (activeMenu) {
      case "Song Library":
        return <SongLibrary userId={user.id} onEditSong={handleEditSong} />

      case "Voice Studio":
        return <EnhancedVoiceCloner userId={user.id} />

      case "Analytics":
        return user.plan === "pro" ? (
          <AnalyticsDashboard userId={user.id} />
        ) : (
          <ProFeatureCard onUpgrade={handleUpgrade} feature="Analytics Dashboard" />
        )

      case "Collaborate":
        return user.plan === "pro" ? (
          completedSong ? (
            <CollaborativeWorkspace
              song={completedSong}
              currentUser={{ id: user.id, username: `${user.firstName} ${user.lastName}` }}
              onSongUpdate={handleSongUpdated}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400">Select a song to start collaborative editing</p>
            </div>
          )
        ) : (
          <ProFeatureCard onUpgrade={handleUpgrade} feature="Real-time Collaboration" />
        )

      default:
        return (
          <div className="space-y-6">
            {/* Enhanced Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                      ${
                        step.active
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                          : currentStep > step.id
                            ? "bg-green-500 text-white"
                            : "bg-gray-600 text-gray-300"
                      }
                    `}
                    >
                      {currentStep > step.id ? "✓" : step.id}
                    </div>
                    <span className={`ml-3 text-sm font-medium ${step.active ? "text-white" : "text-gray-400"}`}>
                      {step.name}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-20 h-px mx-4 ${currentStep > step.id ? "bg-green-500" : "bg-gray-600"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            {currentStep === 1 && (
              <EnhancedSongForm
                onSongGenerated={handleSongGenerated}
                editingSong={editingSong}
                user={user}
                onUpgrade={handleUpgrade}
              />
            )}

            {currentStep === 2 && generatingSong && <GenerationProgress song={generatingSong} />}

            {currentStep === 3 && completedSong && (
              <div className="space-y-6">
                <EnhancedAudioPlayer song={completedSong} />
                <SongDetails song={completedSong} />
                <DownloadOptions song={completedSong} />
                <div className="flex justify-center">
                  <Button
                    onClick={handleNewSong}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Music className="w-4 h-4 mr-2" />
                    Create Another Song
                  </Button>
                </div>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="flex h-screen">
        {/* Enhanced Sidebar */}
        <div className="w-64 bg-black/20 backdrop-blur-lg border-r border-white/10">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Burnt Beats</h1>
                <p className="text-xs text-gray-400">AI Music Studio</p>
              </div>
            </div>

            {/* User Info */}
            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">
                  {user.firstName} {user.lastName}
                </span>
                <Badge variant={user.plan === "pro" ? "default" : "secondary"} className="text-xs">
                  {user.plan.toUpperCase()}
                </Badge>
              </div>
              <div className="text-xs text-gray-400">
                {user.songsThisMonth}/{user.monthlyLimit} songs this month
              </div>
              <Progress value={(user.songsThisMonth / user.monthlyLimit) * 100} className="mt-2 h-1" />
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all
                    ${
                      item.active
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {item.pro && user.plan !== "pro" && <Crown className="w-4 h-4 text-yellow-400 ml-auto" />}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{renderMainContent()}</div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Components
function ProFeatureCard({ onUpgrade, feature }: { onUpgrade: () => void; feature: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
        <CardContent className="text-center p-8">
          <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Pro Feature</h3>
          <p className="text-gray-400 mb-6">{feature} is available with Pro subscription</p>
          <Button
            onClick={onUpgrade}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Pro
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function GenerationProgress({ song }: { song: Song & { currentStage?: string } }) {
  const stages = [
    { name: "Analyzing lyrics", progress: 15 },
    { name: "Generating melody", progress: 35 },
    { name: "Creating harmony", progress: 55 },
    { name: "Processing vocals", progress: 75 },
    { name: "Applying effects", progress: 90 },
    { name: "Finalizing audio", progress: 100 },
  ]

  const currentStage = stages.find((stage) => song.generationProgress <= stage.progress) || stages[0]

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-400" />
          Generating "{song.title}"
        </CardTitle>
        <CardDescription className="text-gray-400">
          Creating your AI-powered song with advanced music theory
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">{song.currentStage || currentStage.name}...</span>
            <span className="text-gray-400">{song.generationProgress}%</span>
          </div>
          <Progress value={song.generationProgress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <span className="text-gray-400">Genre:</span>
            <p className="text-white font-medium">{song.genre}</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-400">Mood:</span>
            <p className="text-white font-medium">{song.mood}</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-400">Tempo:</span>
            <p className="text-white font-medium">{song.tempo} BPM</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-400">Status:</span>
            <p className="text-green-400 font-medium">Processing</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SongDetails({ song }: { song: Song }) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-white">Song Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="space-y-1">
            <span className="text-gray-400">Notes Generated:</span>
            <p className="text-white font-medium">{song.melody?.noteCount || "N/A"}</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-400">Duration:</span>
            <p className="text-white font-medium">{song.melody?.totalDuration?.toFixed(1) || "N/A"}s</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-400">Key:</span>
            <p className="text-white font-medium">{song.melody?.key || "N/A"}</p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-400">Scale:</span>
            <p className="text-white font-medium">{song.melody?.scale || "N/A"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DownloadOptions({ song }: { song: Song }) {
  const formats = [
    { name: "MP3", description: "High quality audio", size: "3.2 MB" },
    { name: "WAV", description: "Uncompressed audio", size: "12.1 MB" },
    { name: "MIDI", description: "Musical notation", size: "0.8 MB" },
  ]

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Download Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {formats.map((format) => (
            <div key={format.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">{format.name}</p>
                <p className="text-gray-400 text-sm">{format.description}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">{format.size}</p>
                <Button size="sm" variant="outline" className="mt-1">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
