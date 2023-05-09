import React, { useEffect } from "react";
import { Input, Button, Flex, Text, Image } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { json } from "stream/consumers";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  const [signInWithGoogle, userCredentials, loading, error] =
    useSignInWithGoogle(auth);

  // const createUserDocument = async (user: User) => {
  //   const userDocRef = doc(firestore, "users", user.uid);
  //   await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  // };

  // useEffect(() => {
  //   if (userCredentials) {
  //     createUserDocument(userCredentials.user);
  //   }
  // }, [userCredentials]);

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
