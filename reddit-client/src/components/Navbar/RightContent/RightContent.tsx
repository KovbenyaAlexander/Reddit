import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      <AuthModal />
      {/* @ts-ignore*/}
      <Flex justify="center" align="center"></Flex>
      <AuthButtons />
    </>
  );
};
export default RightContent;
