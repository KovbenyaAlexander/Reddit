import { Flex, Icon, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";
import useDirectory from "@/hooks/useDirectory";

const Directory: React.FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();
  return (
    <>
      <Menu isOpen={directoryState.isOpen}>
        {/* <Menu> */}
        {/* @ts-ignore*/}
        <MenuButton
          padding="0px 6px"
          borderRadius="4"
          _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
          ml="2"
          mr="2"
          onClick={toggleMenuOpen}
        >
          <Flex
            align="center"
            width={{ base: "auto", lg: "200px" }}
            justify="space-between"
          >
            <Flex align="center">
              <Icon fontSize="24" as={TiHome} />
              <Flex display={{ base: "none", lg: "flex" }}>
                <Text fontWeight="600" fontSize="10pt" ml="2">
                  Home
                </Text>
              </Flex>
            </Flex>

            <ChevronDownIcon />
          </Flex>
        </MenuButton>
        <MenuList>
          <Communities />
        </MenuList>
      </Menu>
    </>
  );
};
export default Directory;
