import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <>
      {/* @ts-ignore*/}
      <Flex
        alignItems="center"
        justifyContent="center"
        direction="column"
        minHeight="60vh"
      >
        Community does not exist
        <Link href="/">
          <Button mt="4">Go home</Button>
        </Link>
      </Flex>
    </>
  );
};
export default NotFound;
