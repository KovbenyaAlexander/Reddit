import { AuthModalState } from "@/atoms/authModalAtom";
import { CommunityState } from "@/atoms/communitiesAtom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgProfile } from "react-icons/cg";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { auth } from "../../../firebase/clientApp";
import defaultAvatar from "../../../../public/images/default_user_avatar.png";

type UserMynuProps = {};

const UserMenu: React.FC<UserMynuProps> = () => {
  const [user] = useAuthState(auth);
  const setModalState = useSetRecoilState(AuthModalState);

  const resetCommunityState = useResetRecoilState(CommunityState);

  const logout = async () => {
    signOut(auth);
    resetCommunityState();
  };
  const router = useRouter();

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
              {/* <Icon as={FaRedditSquare} fontSize="48" mr="1" color="gray.300" /> */}
              <Image
                src={user?.photoURL || defaultAvatar.src}
                height="35px"
                width="35px"
                borderRadius="full"
                mr="2"
              />
              <Flex
                direction="column"
                fontSize="8pt"
                display={{ base: "none", lg: "flex" }}
              >
                <Text fontWeight="700">{user?.displayName || user?.email}</Text>
                <Flex align="center">
                  <Icon as={IoSparkles} color="brand.100" mr="1" />
                  <Text color="gray.400">0 karma</Text>
                </Flex>
              </Flex>

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
                onClick={() => {
                  router.push(`/r/profile/${user.uid}`);
                }}
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
                onClick={logout}
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
