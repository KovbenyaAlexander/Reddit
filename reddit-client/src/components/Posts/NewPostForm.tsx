import { Alert, AlertDescription, AlertIcon, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import { Timestamp } from "@google-cloud/firestore";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import ImageUpload from "./PostForm/ImageUpload";
import TextInputs from "./PostForm/TextInputs";
import Tab from "./Tab";

type newPostFormProps = {
  user: User;
  communityImageUrl?: string;
};

const tabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Vedeo",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

const NewPostForm: React.FC<newPostFormProps> = ({
  user,
  communityImageUrl,
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].title);
  const { onSelectFile, selectedFile, setSelectedFile } = useSelectFile();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  const handleCreatePost = async () => {
    const { communityId } = router.query;
    const newPost = {
      communityId: communityId as string,
      creatorId: user?.uid,
      creatorDisplayName: user.email!.split("@")[0],
      body: postText,
      title,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
      communityImageUrl: communityImageUrl || "",
    };

    setIsLoading(true);
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      if (selectedFile) {
        const imgRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imgRef, selectedFile, "data_url");
        const downloadUrl = await getDownloadURL(imgRef);

        await updateDoc(postDocRef, { imageURL: downloadUrl });
      }
      router.back();
    } catch (e) {
      console.log(e);
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* @ts-ignore*/}
      <Flex direction="column" bg="white" borderRadius="4" mt="2">
        <Flex width="100%">
          {tabs.map((item, i) => (
            <>
              <Tab
                icon={item.icon}
                title={item.title}
                key={i}
                isSelected={selectedTab === item.title}
                setSelectedTab={setSelectedTab}
              />
            </>
          ))}
        </Flex>
        <Flex p="4">
          {selectedTab === "Post" && (
            <TextInputs
              title={title}
              setTitle={setTitle}
              postText={postText}
              setPostText={setPostText}
              isLoading={isLoading}
              handleCreatePost={handleCreatePost}
            />
          )}
          {selectedTab === "Images & Vedeo" && (
            <ImageUpload
              onSelectImage={onSelectFile}
              setSelectedTab={setSelectedTab}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          )}
        </Flex>
        {isError && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>Error creating post</AlertDescription>
          </Alert>
        )}
      </Flex>
    </>
  );
};
export default NewPostForm;
