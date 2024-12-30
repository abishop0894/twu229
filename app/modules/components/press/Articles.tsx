'use client'

import { useState } from 'react'
import ArticlePreview from './ArticlePreview'
import Pagination from './Pagination'

interface Article {
  id: string
  title: string
  excerpt: string
  image: string
  slug: string
  date: string
}

const articles: Article[] = [
  {
    id: '1',
    title: 'TWU Local 229 Secures Historic Contract Agreement',
    excerpt: 'In a landmark victory for transit workers, TWU Local 229 has successfully negotiated a new contract that includes significant improvements in wages, benefits, and working conditions. The agreement, reached after months of intensive negotiations, represents a major step forward for our members...',
    image: 'https://local229.s3.us-east-1.amazonaws.com/TWU_Invincible.jpg',
    slug: '/press/historic-contract-agreement',
    date: 'March 15, 2024'
  },
  {
    id: '2',
    title: 'Safety First: New Initiatives Launch Across Hudson County',
    excerpt: 'TWU Local 229 is proud to announce the implementation of comprehensive safety measures across all transit facilities in Hudson County. The new program, developed in collaboration with management and safety experts, includes state-of-the-art equipment upgrades and enhanced training protocols...',
    image: 'https://local229.s3.us-east-1.amazonaws.com/hblrnight.jpg',
    slug: '/press/safety-initiatives',
    date: 'March 10, 2024'
  },
  {
    id: '3',
    title: 'Community Outreach Program Expands',
    excerpt: 'Building on our commitment to community engagement, TWU Local 229 has expanded its outreach program to include new partnerships with local organizations. This initiative aims to strengthen our connection with the communities we serve and promote understanding of transit workers\' vital role...',
    image: 'https://local229.s3.us-east-1.amazonaws.com/contact-hero.jpg',
    slug: '/press/community-outreach',
    date: 'March 5, 2024'
  },
  {
    id: '4',
    title: 'Member Training Program Shows Promising Results',
    excerpt: 'The recently launched professional development program has already shown impressive results, with over 100 members completing advanced certification courses. This initiative, designed to enhance skills and create career advancement opportunities, demonstrates our commitment to member growth...',
    image: 'https://local229.s3.us-east-1.amazonaws.com/events-hero.jpg',
    slug: '/press/training-program-success',
    date: 'February 28, 2024'
  },
  {
    id: '5',
    title: 'TWU Local 229 Advocates for Infrastructure Investment',
    excerpt: 'In a series of meetings with state and local officials, TWU Local 229 leadership has presented a comprehensive plan for transit infrastructure improvement. The proposal emphasizes the need for modern equipment, facility upgrades, and enhanced safety measures...',
    image: 'https://local229.s3.us-east-1.amazonaws.com/polls-hero.jpg',
    slug: '/press/infrastructure-advocacy',
    date: 'February 20, 2024'
  },
  {
    id: '6',
    title: 'Annual Member Recognition Event Celebrates Excellence',
    excerpt: 'TWU Local 229 hosted its annual recognition ceremony, honoring members who have demonstrated exceptional service, leadership, and dedication to their work. The event highlighted outstanding achievements and long-term service milestones...',
    image: 'https://local229.s3.us-east-1.amazonaws.com/press-hero.jpg',
    slug: '/press/member-recognition',
    date: 'February 15, 2024'
  },
  {
    id: '7',
    title: 'New Health and Wellness Program Launches',
    excerpt: 'TWU Local 229 introduces a comprehensive health and wellness initiative for members and their families. The program includes access to mental health resources, fitness programs, and preventive care services...',
    image: 'https://local229.s3.us-east-1.amazonaws.com/lightrail.jpg',
    slug: '/press/wellness-program',
    date: 'February 10, 2024'
  }
]

const ITEMS_PER_PAGE = 6

const Articles = () => {
  const [currentPage, setCurrentPage] = useState(1)
  
  const indexOfLastArticle = currentPage * ITEMS_PER_PAGE
  const indexOfFirstArticle = indexOfLastArticle - ITEMS_PER_PAGE
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle)
  
  return (
    <section className="py-12 space-y-8">
      {currentArticles.map((article) => (
        <ArticlePreview
          key={article.id}
          {...article}
        />
      ))}
      <Pagination
        totalItems={articles.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </section>
  )
}

export default Articles
