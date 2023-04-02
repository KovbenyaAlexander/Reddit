import { ICommunity } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import usePosts from "./usePosts";
import { IPost } from "@/atoms/postsAtom";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@chakra-ui/react";

type PostsProps = {
  communityData: ICommunity;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();

  const getPosts = async () => {
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateValue((prev) => {
        return { ...prev, posts: posts as IPost[] };
      });
    } catch (error) {
      console.log(`fetching posts error`);
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Stack>
      {postStateValue.posts.map((item) => (
        <PostItem
          onDeletePost={onDeletePost}
          onSelectPost={onSelectPost}
          onVote={onVote}
          key={item.id}
          userIsCreator={user?.uid === item.creatorId}
          post={item}
          userVoteValue={undefined}
        />
      ))}
    </Stack>
  );
};
export default Posts;
