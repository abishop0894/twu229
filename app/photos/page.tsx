import PageLayout from "@/app/modules/layout/layout-comp";
import Hero from "../modules/layout/Hero";
import Masonry from "../modules/components/photos/masonry";
import GetInvolved from "../modules/components/polls/GetInvolved";

const Photos = () => {
const carouselImages = [
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member1.jpg",
    title: "Stephen Ayitey",
    subtitle: "MOW",
    alt: "Stephen Ayitey"
  },

  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member4.jpg",
    title: "Member Name",
        subtitle: "Member Position",
    alt: "Member Name"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member5.jpg",
    title: "Member Name",
    subtitle: "Member Position",
    alt: "Member Name"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member6.jpg",
    title: "Member Name",
    subtitle: "Member Position",
    alt: "Member Name"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member7.jpg",
    title: "Member Name",
    subtitle: "Member Position",
    alt: "Member Name"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member8.jpg",
    title: "Member Name",
    subtitle: "Member Position",
    alt: "Member Name"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member9.jpg",
    title: "Member Name",
    subtitle: "Member Position",
    alt: "Member Name"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member10.jpg",
    title: "Member Name",
    subtitle: "Member Position",
    alt: "Member Name"
  }
]

    return (
        <PageLayout className="mt-[12vh]">
            <Hero 
                title="Photos"
                description="Welcome to the Photos page! Here, you'll find a collection of photos from our members. These photos highlight the dedication, passion, and contributions of our members to our union and the community."
                image="https://local229.s3.us-east-1.amazonaws.com/twuBig.png"
            />
            <Masonry photos={carouselImages} />
            <GetInvolved photo />
        </PageLayout>
    )
}

export default Photos