import { Icon, Text, Flex } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

type TabProps = {
  title: string;
  icon: typeof Icon.arguments;
  isSelected: boolean;
  setSelectedTab: Dispatch<SetStateAction<string>>;
};

const Tab: React.FC<TabProps> = ({
  title,
  icon,
  isSelected,
  setSelectedTab,
}) => {
  const onTabClickHandler = () => {
    setSelectedTab(title);
  };

  return (
    <>
      {/* @ts-ignore*/}
      <Flex
        align="center"
        justify="center"
        flexGrow="1"
        p="14px 0px"
        cursor="pointer"
        _hover={{ bg: "gray.50" }}
        color={isSelected ? "blue.500" : "gray.500"}
        borderWidth={isSelected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
        borderBottomColor={isSelected ? "blue.500" : "gray.200"}
        borderRightColor="gray.200"
        fontWeight="700"
        onClick={onTabClickHandler}
      >
        <Flex align="center" height="20px" mr="2">
          <Icon as={icon} />
        </Flex>
        <Text fontSize="10pt">{title}</Text>
      </Flex>
    </>
  );
};
export default Tab;
