import { MenuItem, Flex, Icon, Image } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons/lib";

type MenuListItemProps = {
  text: string;
  linkToCommunity: string;
  icon: IconType;
  imageURL?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  icon,
  linkToCommunity,
  text,
  imageURL,
}) => {
  return (
    <>
      {/* @ts-ignore*/}
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => {}}
      >
        <Flex align="center">
          {imageURL ? (
            <Image boxSize="18px" borderRadius="full" mr="2" src={imageURL} />
          ) : (
            <>
              <Icon as={icon} fontSize="20" mr="2" />
            </>
          )}
          {text}
        </Flex>
      </MenuItem>
    </>
  );
};
export default MenuListItem;
