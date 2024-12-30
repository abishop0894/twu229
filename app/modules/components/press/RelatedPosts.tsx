'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface RelatedPost {
  id: string
  title: string
  image: string
  slug: string
}

const relatedPosts: RelatedPost[] = [
  {
    id: '1',
    title: 'TWU Local 229 Secures New Safety Measures',
    image: 'https://local229.s3.us-east-1.amazonaws.com/press-1.jpg',
    slug: '/press/safety-measures'
  },
  {
    id: '2',
    title: 'Community Outreach Program Launches',
    image: 'https://local229.s3.us-east-1.amazonaws.com/press-2.jpg',
    slug: '/press/community-outreach'
  },
  {
    id: '3',
    title: 'Member Training Initiative Success',
    image: 'https://local229.s3.us-east-1.amazonaws.com/press-3.jpg',
    slug: '/press/training-initiative'
  }
]

const RelatedPosts = () => {
  return (
    <section className="w-[95%] mt-12">
      <h2 className="text-2xl font-bold text-[#0a0086] mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link href={post.slug}>
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#0a0086] hover:text-blue-700">
                  {post.title}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default RelatedPosts 