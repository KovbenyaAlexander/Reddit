import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdOutlineLogin } from "react-icons/md";
import { signOut } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { AuthModalState } from "@/atoms/authModalAtom";

type UserMynuProps = {};

const UserMenu: React.FC<UserMynuProps> = () => {
  const [user] = useAuthState(auth);
  const setModalState = useSetRecoilState(AuthModalState);

  return (
    <>
      <Menu>
        {/* @ts-ignore*/}
        <MenuButton
          padding="0px 6px"
          borderRadius="4"
          _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        >
          {user ? (
            <Flex align="center">
              <Icon as={FaRedditSquare} fontSize="24" mr="1" color="gray.300" />
              <ChevronDownIcon />
            </Flex>
          ) : (
            <Icon as={VscAccount} fontSize="24" color="gray.400" mr="1" />
          )}
        </MenuButton>
        <MenuList>
          {user ? (
            <>
              <MenuItem
                fontSize="10pt"
                fontWeight="700"
                _hover={{ bg: "blue.500", color: "white" }}
              >
                <Flex align="center">
                  <Icon as={CgProfile} fontSize="20" mr="2" />
                  Profile
                </Flex>
              </MenuItem>

              <MenuDivider />

              <MenuItem
                fontSize="10pt"
                fontWeight="700"
                _hover={{ bg: "blue.500", color: "white" }}
                onClick={() => {
                  signOut(auth);
                }}
              >
                <Flex align="center">
                  <Icon as={MdOutlineLogin} fontSize="20" mr="2" />
                  LogOut
                </Flex>
              </MenuItem>
            </>
          ) : (
            <MenuItem
              fontSize="10pt"
              fontWeight="700"
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => {
                setModalState({ open: true, view: "login" });
              }}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} fontSize="20" mr="2" />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
};
export default UserMenu;
