import { Topic } from '@/lib/firebase/types'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface TopicCardProps {
  topic: Topic
  onPress: (topicId: string) => void
}

export default function TopicCard({ topic, onPress }: TopicCardProps) {
  return (
    <div
      onClick={() => onPress(topic.id)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* User Info */}
      <div className="p-4 flex items-center space-x-3 border-b">
        <Image
          src={topic.userAvatar}
          alt={topic.username}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h3 className="font-medium">{topic.username}</h3>
          <p className="text-sm text-gray-500">
            {formatDistanceToNow(topic.timestamp.toDate(), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{topic.title}</h2>
        <p className="text-gray-600 line-clamp-3">{topic.content}</p>
      </div>

      {/* Media Preview */}
      {topic.mediaUrl && (
        <div className="relative h-48 bg-gray-100">
          {topic.mediaType === 'image' || topic.mediaType === 'gif' ? (
            <Image
              src={topic.mediaUrl}
              alt="Topic media"
              fill
              className="object-cover"
            />
          ) : (
            <video
              src={topic.mediaUrl}
              className="w-full h-full object-cover"
              controls
            />
          )}
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t flex items-center justify-between">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {topic.category}
        </span>
        <div className="flex items-center space-x-2 text-gray-500">
          <MessageCircle size={18} />
          <span>{topic.commentCount} {topic.commentCount === 1 ? 'comment' : 'comments'}</span>
        </div>
      </div>
    </div>
  )
} 