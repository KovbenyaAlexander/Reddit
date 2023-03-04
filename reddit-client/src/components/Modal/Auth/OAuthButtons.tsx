import React from "react";
import { Input, Button, Flex, Text, Image } from "@chakra-ui/react";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  return (
    <>
      {/* @ts-ignore*/}
      <Flex direction="column" width="100%" mb="4">
        <Button variant="oauth" mb="2">
          <Image src="/images/googlelogo.png" height="20px" mr="4" />
          Continue with Google
        </Button>
        <Button variant="oauth">Some Other Provider</Button>
      </Flex>
    </>
  );
};
export default OAuthButtons;
