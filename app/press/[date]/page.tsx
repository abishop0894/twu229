    import { getArticles } from '@/lib/firebase'
    import Article from '@/app/modules/components/press/Article'
    import { notFound } from 'next/navigation'
    import { PageLayout } from '@/app/modules/layout/layout-comp'

    export default async function ArticlePage({ params }: { params: { date: string } }) {
    const articles = await getArticles()
    
    

    const article = articles.find(article => {
        const articleDate = new Date(article.date).toISOString().split('T')[0]
        const paramDate = params.date
    console.log(articleDate, paramDate)
        return articleDate === paramDate
    })

    if (!article) {
        notFound()
    }

    return (
        <PageLayout>
            <div className="w-full h-[24vh] z-[100] bg-[#0a0086]" />
        <Article 
        title={article.title}
        date={article.date}
        image={article.image}
        
        paragraphOne={article.paragraphOne}
        paragraphTwo={article.paragraphTwo}
        paragraphThree={article.paragraphThree}
        />
        </PageLayout>
    )
    } 