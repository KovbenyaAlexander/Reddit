import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunityModal/CreateCommunityModal";
import { Flex, Icon, MenuItem, Text, Box } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { CommunityState } from "@/atoms/communitiesAtom";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

type CommunityProps = {};

const Communities: React.FC<CommunityProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mySnippets = useRecoilValue(CommunityState).mySnippets;
  const mySnippets1 = useRecoilValue(CommunityState);

  console.log(mySnippets1);
  return (
    <>
      <CreateCommunityModal
        isModalOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
        }}
      />
      {/* @ts-ignore*/}
      <Box mt="3" mb="4">
        <Text pl="3" mb="1" fontSize="9pt" fontWeight="700" color="gray.500">
          MODERATING
        </Text>
      </Box>
      {/* @ts-ignore*/}
      {mySnippets
        .filter((snippet) => snippet.isModerator)
        .map((snippet) => (
          <MenuListItem
            icon={FaReddit}
            linkToCommunity={`/r/${snippet.communityId}`}
            key={snippet.communityId}
            text={`/r/${snippet.communityId}`}
            imageURL={snippet.imageUrl}
          />
        ))}
      {/*------------*/}
      <Box mt="3" mb="4">
        <Text pl="3" mb="1" fontSize="9pt" fontWeight="700" color="gray.500">
          MY COMMUNITIES
        </Text>
      </Box>
      {/* @ts-ignore*/}
      <MenuItem
        fontSize="10pt"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <Flex align="center">
          <Icon fontSize="20" mr="2" as={GrAdd} />
          Create Community
        </Flex>
      </MenuItem>
      {mySnippets.map((snippet) => (
        <MenuListItem
          icon={FaReddit}
          linkToCommunity={`/r/${snippet.communityId}`}
          key={snippet.communityId}
          text={`/r/${snippet.communityId}`}
          imageURL={snippet.imageUrl}
        />
      ))}
    </>
  );
};
export default Communities;
