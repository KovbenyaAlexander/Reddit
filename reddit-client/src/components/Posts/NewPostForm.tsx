import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import Tab from "./Tab";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { IPost } from "@/atoms/postsAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Timestamp } from "@google-cloud/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type newPostFormProps = {
  user: User;
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

const NewPostForm: React.FC<newPostFormProps> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].title);
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);

    // router.back();
  };

  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
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
              onSelectImage={onSelectImage}
              setSelectedTab={setSelectedTab}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          )}
        </Flex>
      </Flex>
    </>
  );
};
export default NewPostForm;
