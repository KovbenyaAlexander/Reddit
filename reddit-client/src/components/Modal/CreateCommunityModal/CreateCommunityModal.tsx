import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Input,
  Checkbox,
  Stack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { HiLockClosed } from "react-icons/hi";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import React, { useState } from "react";

type CreateCommunityProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityProps> = ({
  isModalOpen,
  closeModal,
}) => {
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("Public");

  const communityNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const length = e.target.value.length;
    if (length > 21) return;
    setCharsRemaining(21 - length);
    setCommunityName(e.target.value);
  };

  const onCommunityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.name);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        {/* @ts-ignore*/}
        <ModalContent>
          <ModalHeader fontSize="15">Create a community</ModalHeader>
          <Divider />
          <Box ml="3" mr="3">
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight="600" fontSize="15">
                Name
              </Text>
              {/* @ts-ignore*/}
              <Text color="gray.500" fontSize="11">
                Community names including capitalization cannot be changed
              </Text>

              <Input value={communityName} onChange={communityNameHandler} />

              <Text
                ml="2"
                color={charsRemaining === 0 ? "red.500" : "gray.500"}
                fontSize="10"
              >
                {charsRemaining} Characters remaining
              </Text>

              <Box mt="2" mb="4">
                <Text fontWeight="600" fontSize={15}>
                  Community Type
                </Text>
                <Stack spacing="2">
                  <Checkbox
                    onChange={onCommunityTypeChange}
                    name="Public"
                    isChecked={communityType === "Public"}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" />
                      <Text fontSize="10pt" mr="1">
                        Public
                      </Text>

                      <Text fontSize="8pt" color="gray.500">
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    onChange={onCommunityTypeChange}
                    name="Restricted"
                    isChecked={communityType === "Restricted"}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr="2" />
                      <Text fontSize="10pt" mr="1">
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500">
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    onChange={onCommunityTypeChange}
                    name="Private"
                    isChecked={communityType === "Private"}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr="2" />
                      <Text fontSize="10pt" mr="1">
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500">
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              colorScheme="blue"
              mr={3}
              onClick={closeModal}
              height="30px"
            >
              Cancel
            </Button>
            <Button height="30px" onClick={() => {}}>
              Create community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;