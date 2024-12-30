'use client'

import { useEffect, useState } from 'react'
import ArticlePreview from './ArticlePreview'
import Pagination from './Pagination'
import { getArticles } from '@/lib/firebase'
import { Article } from '@/lib/firebase'





const ITEMS_PER_PAGE = 6

const Articles = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [articles, setArticles] = useState<Article[]>([])
  
//   const indexOfLastArticle = currentPage * ITEMS_PER_PAGE
// const indexOfFirstArticle = indexOfLastArticle - ITEMS_PER_PAGE
//   const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle)


  useEffect(() => {
    const fetchArticles = async () => {
      const result = await getArticles()
      setArticles(result)
    }
    fetchArticles()
  }, [])  
  return (
    <section className="py-12 space-y-8">
    {articles.length > 0 ? articles.map((article) => (
      <ArticlePreview
        title={article.title}
        slug={article.title}
        key={article.title}
        excerpt={article.paragraphOne}
        image={article.image}
        date={article.date}
        source={article.source}
      />
    )) : <p>Loading...</p>}
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
