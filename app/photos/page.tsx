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
    title: "John Yurick",
    subtitle: "Signal",
    alt: "John Yurick"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member5.jpg",
    title: "D'Andre Watson",
    subtitle: "Facility Maintainer",
    alt: "D'Andre Watson"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member6.jpg",
    title: "Quadir Gallemore",
    subtitle: "Utility",
    alt: "Quadir Gallemore"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member7.jpg",
    title: "Edward Pfister",
    subtitle: "Facility Maintainer",
    alt: "Edward Pfister"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member8.jpg",
    title: "Pete Carino",
    subtitle: "Track",
    alt: "Pete Carino"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member9.jpg",
    
    alt: "Phil Aliotta"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/memberscarousel/member10.jpg",
    title: "Phil Aliotta ",
    subtitle: "Train Operator",
    alt: "Phil Aliotta"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/gallery/edison2.jpg",
    
    alt: "Edison Nanan"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/gallery/edison.jpg",
    title: "Edison Nanan",
    subtitle: "Train Operator",
    alt: "Edison Nanan"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/gallery/peguero.jpg",
    title: "Jeremiah Peguero",
    subtitle: "Train Operator",
    alt: "Jeremiah Peguero"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/gallery/reva.jpg",
    title: "Reva Stridiron",
    subtitle: "Train Operator",
    alt: "Reva Stridiron"
  },
  {
    src: "https://local229.s3.us-east-1.amazonaws.com/gallery/trav.jpg",
    title: "Travis Griffin",
    subtitle: "Train Operator",
    alt: "Travis Griffin"
  },

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