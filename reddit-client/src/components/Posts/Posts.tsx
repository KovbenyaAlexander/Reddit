import { ICommunity } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import usePosts from "./usePosts";
import { IPost } from "@/atoms/postsAtom";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@chakra-ui/react";
import PostLoader from "./PostLoader";

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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [communityData]);

  console.log();

  return (
    <>
      {isLoading ? (
        <PostLoader />
      ) : (
        <>
          {/* @ts-ignore*/}
          <Stack mt="4">
            {postStateValue.posts.map((item) => (
              <PostItem
                onDeletePost={onDeletePost}
                onSelectPost={onSelectPost}
                onVote={onVote}
                key={item.id}
                userIsCreator={user?.uid === item.creatorId}
                post={item}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (vote) => vote.postId === item.id
                  )?.voteValue
                }
              />
            ))}
          </Stack>
        </>
      )}
    </>
  );
};
export default Posts;
