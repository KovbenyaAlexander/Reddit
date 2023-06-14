import { useRouter } from "next/router";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Overview from "@/components/Profile/Overview";
import Posts from "@/components/Profile/Posts";
import Comments from "@/components/Profile/Comments";
import Upvoted from "@/components/Profile/Upvoted";

type indexProps = {};

const index: React.FC<indexProps> = (props) => {
  const router = useRouter();
  const { userId } = router.query;
  console.log(userId);

  return (
    <div>
      {/* @ts-ignore*/}
      <Tabs>
        <TabList bgColor={"white"} pl={"2"}>
          <Tab>OVERVIEW</Tab>
          <Tab>POSTS</Tab>
          <Tab>COMMENTS</Tab>
          <Tab>UPVOTED</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Overview />
          </TabPanel>
          <TabPanel>
            <Posts />
          </TabPanel>
          <TabPanel>
            <Comments />
          </TabPanel>
          <TabPanel>
            <Upvoted />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
export default index;
