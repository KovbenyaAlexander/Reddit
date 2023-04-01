import { postState } from "@/atoms/postsAtom";
import React from "react";
import { useRecoilState } from "recoil";

type usePostsProps = {};

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = () => {};
  const onSelectPost = () => {};
  const onDeletePost = () => {};

  return {
    postStateValue,
    setPostStateValue,
  };
};
export default usePosts;
