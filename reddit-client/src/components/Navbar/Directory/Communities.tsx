import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunityModal/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";

type CommunityProps = {};

const Communities: React.FC<CommunityProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CreateCommunityModal
        isModalOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
        }}
      />
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
    </>
  );
};
export default Communities;
