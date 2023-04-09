import { CommunityState, ICommunity } from "@/atoms/communitiesAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import {
  Box,
  Flex,
  Icon,
  Text,
  Stack,
  Divider,
  Button,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { useSetRecoilState } from "recoil";

type AboutProps = {
  communityData: ICommunity;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { onSelectFile, selectedFile, setSelectedFile } = useSelectFile();
  const [uploadingImg, setUploadingImg] = useState(false);
  const setCommunityStateValue = useSetRecoilState(CommunityState);

  const onUpdateImg = async () => {
    try {
      if (!selectedFile) return;
      setUploadingImg(true);
      const imgRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imgRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imgRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as ICommunity,
      }));
    } catch (e) {
      console.log(e);
    }
    setUploadingImg(false);
  };

  return (
    <>
      <Box position="sticky" top="14px">
        {/* @ts-ignore*/}
        <Flex
          justify="space-between"
          align="center"
          bg="blue.400"
          color="white"
          borderRadius="4px 4ps 0px 0px"
          p="3"
        >
          <Text fontSize="10pt" fontWeight="700">
            About Community
          </Text>
          <Icon as={HiOutlineDotsHorizontal} />
        </Flex>

        <Flex
          direction="column"
          p="3"
          bg="white"
          borderRadius="0px 0px 4px 4px"
        >
          <Stack>
            <Flex width="100%" p="2" fontSize="10pt" fontWeight="700">
              <Flex direction="column" flexGrow="1">
                <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
                <Text>Members</Text>
              </Flex>
              <Flex direction="column" flexGrow="1">
                <Text>1</Text>
                <Text>Online</Text>
              </Flex>
            </Flex>
            <Divider />
            <Flex
              align="center"
              width="100%"
              p="1"
              fontWeight="500"
              fontSize="10pt"
            >
              <Icon as={RiCakeLine} fontSize="18" mr="2" />
              {communityData.createdAt && (
                <Text>
                  Created{" "}
                  {moment(
                    new Date(communityData.createdAt.seconds * 1000)
                  ).format("MMM DD, YYYY")}
                </Text>
              )}
            </Flex>
            <Link href={`/r/${router.query.communityId}/submit`}>
              <Button mt="3" height="30px">
                Create Post
              </Button>
            </Link>
            {user?.uid === communityData.creatorId && (
              <>
                <Divider />
                <Stack spacing="1" fontSize="10pt">
                  <Text fontWeight="600">Admin</Text>
                  <Flex align="center" justify="space-between">
                    <Text
                      color="blue.500"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      onClick={() => {
                        selectedFileRef.current?.click();
                      }}
                    >
                      Change Image
                    </Text>
                    {communityData.imageURL || selectedFile ? (
                      <Image
                        src={communityData.imageURL || selectedFile}
                        borderRadius="full"
                        boxSize="40px"
                        alt="logo"
                      />
                    ) : (
                      <Icon
                        as={FaReddit}
                        fontSize="40"
                        color="brand.100"
                        mr="2"
                      />
                    )}
                  </Flex>
                  {selectedFile &&
                    (uploadingImg ? (
                      <Spinner />
                    ) : (
                      <Text cursor="pointer" onClick={onUpdateImg}>
                        Save Changes
                      </Text>
                    ))}
                  <input
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    hidden
                    ref={selectedFileRef}
                    onChange={onSelectFile}
                  />
                </Stack>
              </>
            )}
          </Stack>
        </Flex>
      </Box>
    </>
  );
};
export default About;
