import { auth, firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import { Flex, Image, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultAvatar from "../../../public/images/default_user_avatar.png";

const Overview = ({ userId }: { userId: string }) => {
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { onSelectFile, selectedFile } = useSelectFile();
  const [uploadingImg, setUploadingImg] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState("");
  const [loadingAvatar, setLoadingAvatar] = useState(true);

  const fetchAvatar = async () => {
    setLoadingAvatar(true);
    const avatarDocRef = doc(firestore, "users", userId);
    const avatarDoc = await getDoc(avatarDocRef);
    setCurrentAvatar(avatarDoc.data()?.photoURL);
    setLoadingAvatar(false);
  };

  const onUpdateImg = async () => {
    try {
      if (!selectedFile || !user) return;
      setUploadingImg(true);
      const imgRef = ref(storage, `users/${user?.uid}/avatar`);
      await uploadString(imgRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imgRef);
      await updateDoc(doc(firestore, "users", user.uid), {
        photoURL: downloadURL,
      });
    } catch (e) {
      console.log(e);
    }
    setUploadingImg(false);
  };

  useEffect(() => {
    (async () => {
      await fetchAvatar();
    })();
  }, [userId]);

  return (
    <>
      {/* @ts-ignore*/}
      <Flex>
        <Flex border="1px solid black" w="60%">
          Pinned posts
        </Flex>
        <Flex w="30%" flexDirection="column">
          {loadingAvatar ? (
            <Skeleton mt="4" height="200px" />
          ) : (
            <>
              <Image
                src={selectedFile || currentAvatar || defaultAvatar.src}
                alt="logo"
                width="200"
                height="200"
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
                    (uploadingImg ? (
                      <Spinner />
                    ) : (
                      <Text cursor="pointer" onClick={onUpdateImg}>
                        Save Changes
                      </Text>
                    ))}
                </>
              )}
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
export default Overview;
