import Comments from "@/components/Profile/Comments";
import Overview from "@/components/Profile/Overview";
import Posts from "@/components/Profile/Posts";
import Upvoted from "@/components/Profile/Upvoted";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IProfile {
  metadata: {
    creationTime: string;
  };
  email: string;
  uid: string;
  photoURL: string;
  displayName: string;
}

const Profile = () => {
  const router = useRouter();
  const { profileId } = router.query;
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState<undefined | IProfile>();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profileDocRef = doc(firestore, "users", String(profileId));
      const profileDoc = await getDoc(profileDocRef);
      setProfile(profileDoc.data() as IProfile);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchProfile();
    })();
  }, [profileId]);

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

        {!profile || isLoading ? (
          <div>Loading...</div>
        ) : (
          <TabPanels>
            <TabPanel>
              <Overview profile={profile} isLoading={isLoading} />
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
        )}
      </Tabs>
    </div>
  );
};
export default Profile;
