import { Flex, Icon, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TiHome } from "react-icons/ti";

const Directory: React.FC = () => {
  return (
    <>
      <Menu>
        {/* @ts-ignore*/}
        <MenuButton
          padding="0px 6px"
          borderRadius="4"
          _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
          ml="2"
          mr="2"
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
        <MenuList></MenuList>
      </Menu>
    </>
  );
};
export default Directory;
