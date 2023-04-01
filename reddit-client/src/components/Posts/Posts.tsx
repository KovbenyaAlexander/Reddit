import { ICommunity } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import usePosts from "./usePosts";
import { IPost } from "@/atoms/postsAtom";

type PostsProps = {
  communityData: ICommunity;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { postStateValue, setPostStateValue } = usePosts();

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

  return <div>posts</div>;
};
export default Posts;
