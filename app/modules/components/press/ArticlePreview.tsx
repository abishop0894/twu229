    'use client'

    import { motion } from 'framer-motion'
    import Image from 'next/image'
    import Link from 'next/link'

    interface ArticlePreviewProps {
    title: string
    excerpt: string
    image: string
    slug: string
    date: string
    source?: string
    paragraphOne?: string
    paragraphTwo?: string
    paragraphThree?: string
    }

    const ArticlePreview = ({ title, image,  date, excerpt }: ArticlePreviewProps) => {
    // Format date for URL
    const formattedDate = new Date(date).toISOString().split('T')[0]
    
    return (
        <Link href={`/press/${formattedDate}`}>
        <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-[95%] mx-auto bg-white rounded-lg shadow-lg overflow-hidden min-h-[200px] h-auto sm:h-[35vh] md:h-[40vh] lg:h-[40vh] relative"
        >
        <div className="grid grid-cols-1 sm:grid-cols-3 h-full">
            <div className="relative h-48 sm:h-full">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
            />
            </div>
            
            <div className="col-span-1 sm:col-span-2 p-4 sm:p-6 relative">
            <div className="text-sm text-gray-600 mb-2">{date}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0a0086] mb-2 sm:mb-3 line-clamp-2">
                {title}
            </h2>
            <div className="text-gray-700 relative mb-12 sm:mb-0">
                <p className="text-sm sm:text-base">{excerpt}</p>
                <div 
                className="absolute bottom-0 left-0 w-full h-16 sm:h-24"
                style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)'
                }}
                />
            </div>
        
            </div>
        </div>
        </motion.article>
        </Link>
    )
    }

    export default ArticlePreview
