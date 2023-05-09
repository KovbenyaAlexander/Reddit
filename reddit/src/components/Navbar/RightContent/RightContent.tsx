import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { auth } from "../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <AuthModal />
      {/* @ts-ignore*/}
      <Flex justify="center" align="center"></Flex>

      {user ? <Icons /> : <AuthButtons />}
      <UserMenu />
    </>
  );
};
export default RightContent;
