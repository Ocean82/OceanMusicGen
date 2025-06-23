"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Settings } from "lucide-react"

interface CollaborativeWorkspaceProps {
  song: any
  currentUser: { id: number; username: string }
  onSongUpdate: (song: any) => void
}

export default function CollaborativeWorkspace({ song, currentUser, onSongUpdate }: CollaborativeWorkspaceProps) {
  const [title, setTitle] = useState(song.title)
  const [lyrics, setLyrics] = useState(song.lyrics)
  const [isPublic, setIsPublic] = useState(false)
  const { toast } = useToast()

  const handleSave = useCallback(() => {
    const updatedSong = { ...song, title, lyrics }
    onSongUpdate(updatedSong)
    toast({
      title: "Song Updated",
      description: `"${title}" has been updated successfully`,
    })
  }, [song, title, lyrics, onSongUpdate, toast])

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Collaborative Workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Song Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter song title"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lyrics" className="text-white">
              Lyrics
            </Label>
            <Textarea
              id="lyrics"
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Enter lyrics"
              className="bg-white/10 border-white/20 text-white min-h-40"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="isPublic" checked={isPublic} onCheckedChange={setIsPublic} />
            <Label htmlFor="isPublic" className="text-white">
              Make Public
            </Label>
          </div>
          <Button onClick={handleSave} className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white">Activity Log</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-400">
          {/* Mock activity log */}
          <p>
            <span className="text-white font-medium">{currentUser.username}</span> updated the lyrics
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
