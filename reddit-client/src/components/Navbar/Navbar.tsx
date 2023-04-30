import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import Directory from "./Directory/Directory";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import { DefaultdirectoryMenuItem } from "@/atoms/directoryMenuAtom";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    // @ts-ignore
    <Flex bg="white" height="44px" padding="6px 12px" align="center">
      <Flex
        align="center"
        onClick={() => {
          onSelectMenuItem(DefaultdirectoryMenuItem);
        }}
        cursor="pointer"
      >
        <Image src="/images/logoFace.svg" height="30px" />
        <Image
          src="/images/logoText.svg"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {user && <Directory />}
      <SearchInput />
      <RightContent />
    </Flex>
  );
};
export default Navbar;
