    import Hero from '@/app/modules/layout/Hero'
    import ContactForm from '../modules/components/contact/ContactForm'
    import ContactInfo from '../modules/components/contact/ContactInfo'
    import SupportLinks from '../modules/components/contact/SupportLinks'
    import SocialMedia from '../modules/components/contact/SocialMedia'
    import { PageLayout } from '@/app/modules/layout/layout-comp'
    // This would come from your CMS
    const pageData = {
    hero: {
        title: "We're Here to Help",
        description: "Get in touch with TWU Local 229. We're ready to assist with any questions or concerns you may have.",
        image: "https://local229.s3.us-east-1.amazonaws.com/contact-hero.jpg"
    }
    }



    export default function ContactPage() {
    return (
        <PageLayout className="pt-[12vh]">
        <Hero 
            title={pageData.hero.title}
            description={pageData.hero.description}
            image={pageData.hero.image}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 py-20">
            <ContactForm />
            <div className="space-y-12">
            <ContactInfo />
            <SupportLinks />
            <SocialMedia />
            </div>
        </div>
        </PageLayout>
    )
    }
