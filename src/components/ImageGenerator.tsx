
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from '@/integrations/supabase/client'
import { Loader2, ImagePlus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const { toast } = useToast()

  const generateImage = async () => {
    if (!prompt) {
      toast({
        title: "Please enter a prompt",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { prompt }
      })

      if (error) throw error

      setGeneratedImage(data.image)
      toast({
        title: "Image generated successfully!",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error generating image",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">Generate AI Images</h2>
      <div className="flex gap-2">
        <Input
          placeholder="Describe the image you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        <Button 
          onClick={generateImage} 
          disabled={loading}
          className="min-w-[120px]"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <ImagePlus className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4"
          >
            <img
              src={generatedImage}
              alt="Generated"
              className="rounded-lg w-full max-w-md mx-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
