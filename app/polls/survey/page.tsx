import PollResults from "@/app/modules/components/polls/PollResults";
import GetInvolved from "@/app/modules/components/polls/GetInvolved";
import  SurveyComponent  from "@/app/modules/components/polls/SurveyComponent";
import {PageLayout} from "@/app/modules/layout/layout-comp";

export default function SurveyPage() {
  return (
    <PageLayout className="pt-[14vh]">
      <SurveyComponent />
      <PollResults />
      <GetInvolved />   
    </PageLayout>
  )
}
