import Comments from "@/components/Profile/Comments";
import Overview from "@/components/Profile/Overview";
import Posts from "@/components/Profile/Posts";
import Upvoted from "@/components/Profile/Upvoted";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";

type indexProps = {};

const Profile: React.FC<indexProps> = (props) => {
  const router = useRouter();
  const { userId } = router.query;
  if (!userId) return null;

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
            <Overview userId={String(userId)} />
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
export default Profile;
