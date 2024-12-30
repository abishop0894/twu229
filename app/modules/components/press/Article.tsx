'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import RelatedPosts from './RelatedPosts'

interface ArticleProps {
  title: string
  paragraphOne: string
  paragraphTwo?: string
  paragraphThree?: string
  image: string
  date: string
  
}

const Article = ({ title, paragraphOne, paragraphTwo, paragraphThree, image, date }: ArticleProps) => {
  return (
    <div className="flex flex-col items-center w-full py-12">
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[95%] bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="relative h-[40vh] w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-8">
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0a0086] mb-2">
              {title}
            </h1>
            <div className="text-gray-600">
              <span>{date}</span>
              <span className="mx-2">•</span>
              
            </div>
          </div>
          
          <div className="prose max-w-none text-xl text-gray-700">
            {paragraphOne}
            <br />
            <br />
            {paragraphTwo}
            <br />
            <br />
            {paragraphThree}
          </div>
        </div>
      </motion.article>
      
      <RelatedPosts />
    </div>
  )
}

export default Article
