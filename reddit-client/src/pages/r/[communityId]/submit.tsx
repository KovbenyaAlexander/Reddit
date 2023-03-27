import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import { Flex, Icon, Text, Box } from "@chakra-ui/react";
import React from "react";

const SubmitPostPage: React.FC = () => {
  return (
    <>
      <PageContent>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          {/* @ts-ignore*/}
          <Text>Create a post</Text>

          <NewPostForm />
        </Box>
        <>right</>
      </PageContent>
    </>
  );
};

export default SubmitPostPage;
