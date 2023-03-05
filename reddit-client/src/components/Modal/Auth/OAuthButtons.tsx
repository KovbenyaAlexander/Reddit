import React from "react";
import { Input, Button, Flex, Text, Image } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <>
      {/* @ts-ignore*/}
      <Flex direction="column" width="100%" mb="4">
        <Button
          variant="oauth"
          mb="2"
          isLoading={loading}
          onClick={() => {
            signInWithGoogle();
          }}
        >
          <Image src="/images/googlelogo.png" height="20px" mr="4" />
          Continue with Google
        </Button>
        <Button variant="oauth">Some Other Provider</Button>
        {error?.message && <Text>{error.message}</Text>}
      </Flex>
    </>
  );
};
export default OAuthButtons;
