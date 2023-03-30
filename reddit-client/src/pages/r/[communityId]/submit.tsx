import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Text, Box } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <PageContent>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          {/* @ts-ignore*/}
          <Text>Create a post</Text>

          {user && <NewPostForm user={user} />}
        </Box>
        <>right</>
      </PageContent>
    </>
  );
};

export default SubmitPostPage;
