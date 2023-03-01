import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      {/* @ts-ignore*/}
      <Flex justify="center" align="center"></Flex>
      <AuthButtons />
    </>
  );
};
export default RightContent;
