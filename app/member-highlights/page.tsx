import PageLayout from "../modules/layout/layout-comp"
import Intro from "../modules/components/about/Intro"
import GetInvolved from "../modules/components/polls/GetInvolved"
import Hero from "../modules/layout/Hero"
import QandA from "../modules/components/about/QandA"

const MemberHighlights = () => {
    return (
        <PageLayout className="mt-[10vh]">
            <Hero 
                title="Member Highlights"
                description="Welcome to the Member Highlights page! Here, you'll find a collection of stories and achievements from our members. These stories highlight the dedication, passion, and contributions of our members to our union and the community."
                image="https://local229.s3.us-east-1.amazonaws.com/twuBig.png"
            />
            <Intro />
            <QandA />
            <GetInvolved highlight />
        </PageLayout>
    )
}

export default MemberHighlights