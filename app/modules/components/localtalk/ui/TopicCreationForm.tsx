'use client'

import { useState, useRef } from 'react'
import { useUserData } from '@/lib/hooks/useUserData'
// import { uploadToS3 } from '@/lib/s3'
import { createTopic } from '@/lib/firebase/operations'
import { Category, MediaType } from '@/lib/firebase/types'
import { ImagePlus, X, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { Timestamp } from 'firebase/firestore'

interface TopicForm {
  title: string
  content: string
  category: Category
  media?: File
}

interface MediaUpload {
  file: File
  type: MediaType
  previewUrl: string
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif'],
  video: ['video/mp4'],
  gif: ['image/gif']
}

export default function TopicCreationForm() {
  const userData = useUserData()
  const [form, setForm] = useState<TopicForm>({
    title: '',
    content: '',
    category: 'transportation'
  })
  const [media, setMedia] = useState<MediaUpload | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateMedia = (file: File): MediaType | null => {
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 10MB')
      return null
    }

    if (ALLOWED_FILE_TYPES.image.includes(file.type)) return 'image'
    if (ALLOWED_FILE_TYPES.video.includes(file.type)) return 'video'
    if (ALLOWED_FILE_TYPES.gif.includes(file.type)) return 'gif'

    setError('Invalid file type. Please upload an image, video, or GIF')
    return null
  }

  const handleMediaSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const mediaType = validateMedia(file)
    if (!mediaType) return

    const previewUrl = URL.createObjectURL(file)
    setMedia({ file, type: mediaType, previewUrl })
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userData) return

    setIsSubmitting(true)
    setError(null)

    try {
      // let mediaUrl: string | undefined
      // let mediaType: MediaType | undefined
      console.log("media")

      if (media) {
        // mediaUrl = await uploadToS3(media.file)
        // mediaType = media.type
      }

      await createTopic({
        title: form.title.trim(),
        content: form.content.trim(),
        category: form.category,
        userId: userData.id,
        username: userData.firstName,
        userAvatar: userData.imageUrl,
        timestamp: Timestamp.now(),
        commentCount: 0,
        ...(media ? {
          mediaUrl: media.previewUrl,
          mediaType: media.type
        } : {})
      })

    
      // Reset form
      setForm({ title: '', content: '', category: 'transportation' })
      setMedia(null)
      if (fileInputRef.current) fileInputRef.current.value = ''

    } catch (err) {
      setError('Failed to create topic. Please try again.')
      console.error('Error creating topic:', err)
    } finally {

      setIsSubmitting(false)
    }
   window.location.reload()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg shadow-md p-6">
      {/* Title Input */}
      <input
        type="text"
        value={form.title}
        onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
        placeholder="Topic title"
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        required
        minLength={3}
        maxLength={100}
      />

      {/* Content Input */}
      <textarea
        value={form.content}
        onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
        placeholder="What's on your mind?"
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        rows={4}
        required
        minLength={10}
      />

      {/* Category Selection */}
      <select
        value={form.category}
        onChange={e => setForm(prev => ({ ...prev, category: e.target.value as Category }))}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option value="mow">MOW</option>
        <option value="transportation">Transportation</option>
      </select>

      {/* Media Upload */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
        >
          <ImagePlus size={20} />
          <span>Add Media</span>
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleMediaSelect}
          accept={Object.values(ALLOWED_FILE_TYPES).flat().join(',')}
          className="hidden"
        />

        {/* Media Preview */}
        {media && (
          <div className="relative inline-block">
            {media.type === 'image' || media.type === 'gif' ? (
              <Image
                src={media.previewUrl}
                alt="Preview"
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
            ) : (
              <video
                src={media.previewUrl}
                className="rounded-lg max-w-[200px]"
                controls
              />
            )}
            <button
              type="button"
              onClick={() => setMedia(null)}
              className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !form.title.trim() || !form.content.trim()}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin mr-2" />
            Creating Topic...
          </>
        ) : (
          'Create Topic'
        )}
      </button>
    </form>
  )
} 