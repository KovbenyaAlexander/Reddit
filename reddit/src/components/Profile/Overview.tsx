import { auth, firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import {
  Box,
  Divider,
  Flex,
  Image,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultAvatar from "../../../public/images/default_user_avatar.png";
import PageContent from "../Layout/PageContent";

interface IProfile {
  metadata: {
    creationTime: string;
  };
  email: string;
  uid: string;
  photoURL: string;
  displayName: string;
}

const Overview = ({ userId }: { userId: string }) => {
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { onSelectFile, selectedFile } = useSelectFile();
  const [uploadingImg, setUploadingImg] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(true);
  const [isAvatarUpdated, setIsAvatarUpdated] = useState(false);
  const [profile, setProfile] = useState<undefined | IProfile>();

  const fetchProfile = async () => {
    setLoadingAvatar(true);
    const profileDocRef = doc(firestore, "users", userId);
    const profileDoc = await getDoc(profileDocRef);
    console.log(profileDoc.data());
    setProfile(profileDoc.data() as IProfile);
    setLoadingAvatar(false);
  };

  const onUpdateImg = async () => {
    try {
      setIsAvatarUpdated(false);
      if (!selectedFile || !user) return;
      setUploadingImg(true);
      const imgRef = ref(storage, `users/${user?.uid}/avatar`);
      await uploadString(imgRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imgRef);
      await updateDoc(doc(firestore, "users", user.uid), {
        photoURL: downloadURL,
      });
      setIsAvatarUpdated(true);
    } catch (e) {
      console.log(e);
    } finally {
      setUploadingImg(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchProfile();
    })();
  }, [userId]);

  useEffect(() => {
    setIsAvatarUpdated(false);
  }, [selectedFile]);

  return (
    <>
      <PageContent>
        {/* @ts-ignore*/}
        <Flex border="1px solid black">Pinned posts</Flex>
        <Flex
          w="312px"
          flexDirection="column"
          bg="white"
          borderRadius="5px"
          mt="5px"
          position="relative"
          zIndex={0}
          padding={"5px"}
        >
          <Box
            position="absolute"
            top="0px"
            right="0px"
            left="0px"
            h="50px"
            w="100%"
            bgColor="rgb(51, 168, 255)"
            borderRadius="5px 5px 0px 0px"
            zIndex={1}
          />
          {loadingAvatar ? (
            <Skeleton mt="4" height="80px" width="80px" borderRadius="full" />
          ) : (
            <>
              <Image
                src={selectedFile || profile?.photoURL || defaultAvatar.src}
                alt="avatar"
                width="80px"
                height="80px"
                onLoad={() => {
                  setLoadingAvatar(false);
                }}
                borderRadius="full"
                border={"1px solid gray"}
                bg={"white"}
                zIndex={2}
              />
              {user?.uid === userId && (
                <>
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Change Avatar
                  </Text>

                  <input
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    hidden
                    ref={selectedFileRef}
                    onChange={onSelectFile}
                  />

                  {selectedFile &&
                    !isAvatarUpdated &&
                    (uploadingImg ? (
                      <Spinner />
                    ) : (
                      <Text
                        cursor="pointer"
                        onClick={onUpdateImg}
                        color={"red.500"}
                        _hover={{ textDecoration: "underline" }}
                      >
                        Save Changes
                      </Text>
                    ))}

                  {isAvatarUpdated && (
                    <Text color="green.500">Avatar updated</Text>
                  )}
                  <Divider />
                </>
              )}

              <Text fontSize="12px" mt="5px" fontWeight="bold">
                u/{profile?.displayName || profile?.email}
              </Text>

              <Divider />

              <Flex justifyContent="space-between" mt="5px">
                <Flex direction="column">
                  <Text fontSize="14px">Karma</Text>
                  <Text fontSize="11px">1</Text>
                </Flex>
                <Flex direction="column">
                  <Text fontSize="14px">Cake day</Text>
                  <Text fontSize="11px">{profile?.metadata.creationTime}</Text>
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
      </PageContent>
    </>
  );
};
export default Overview;
