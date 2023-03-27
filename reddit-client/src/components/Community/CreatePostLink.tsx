import { Flex, Icon, Input } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";
import { BsLink45Deg } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { AuthModalState } from "@/atoms/authModalAtom";
import { useRouter } from "next/router";

const CreatePostLink: React.FC = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(AuthModalState);
  const router = useRouter();

  const onInputClickHandler = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
    } else {
      const { communityId } = router.query;
      router.push(`/r/${communityId}/submit`);
    }
  };

  return (
    <>
      {/* @ts-ignore*/}
      <Flex
        justify="space-around"
        align="center"
        bg="white"
        p="2"
        height="56px"
        borderRadius="4"
      >
        <Icon as={FaReddit} color="gray.300" fontSize="36" mr="4" />
        <Input
          placeholder="Create Post"
          color="gray.300"
          bg="gray.50"
          borderRadius="4"
          mr="4"
          height="36px"
          borderColor="gray.200"
          onClick={onInputClickHandler}
          _hover={{ borderColor: "blue.500", bg: "white" }}
          fontSize="10pt"
        />
        <Icon as={IoImageOutline} color="gray.300" fontSize="24" mr="4" />
        <Icon as={BsLink45Deg} color="gray.300" fontSize="24" mr="4" />
      </Flex>
    </>
  );
};
export default CreatePostLink;
