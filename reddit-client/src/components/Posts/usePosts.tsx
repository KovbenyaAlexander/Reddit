import { IPost, IPostVote, postState } from "@/atoms/postsAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { collection, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

type usePostsProps = {};

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [user] = useAuthState(auth);

  const onVote = async (post: IPost, vote: number, communityId: string) => {
    try {
      const { voteStatus } = post;
      const existingVote = postStateValue.postVotes.find(
        (item) => item.id === post.id
      );

      const batch = writeBatch(firestore);
      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      let updatedPostVotes = [...postStateValue.postVotes];
      let voteChange = vote;

      if (!existingVote) {
        const postVoteRef = doc(
          collection(firestore, "users", `${user?.uid}/postVotes`)
        );

        const newVote: IPostVote = {
          id: postVoteRef.id,
          postId: post.id,
          communityId,
          voteValue: vote,
        };

        batch.set(postVoteRef, newVote);
        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      } else {
        const postVoteRef = doc(
          firestore,
          "users",
          `${user?.uid}/postVotes/${existingVote.id}`
        );

        if (existingVote.voteValue === vote) {
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (item) => item.id !== existingVote.id
          );
          batch.delete(postVoteRef);

          voteChange *= -1;
        } else {
          voteChange *= 2;
          updatedPost.voteStatus = voteStatus + 2 + vote;

          const voteIdx = postStateValue.postVotes.findIndex(
            (item) => item.id === existingVote.id
          );

          if (voteIdx !== -1) {
            updatedPostVotes[voteIdx] = {
              ...existingVote,
              voteValue: vote,
            };
          }

          batch.update(postVoteRef, { voteValue: vote });
        }
      }

      const postIdx = postStateValue.posts.findIndex(
        (item) => item.id === post.id
      );

      updatedPosts[postIdx] = updatedPost;

      setPostStateValue((prev) => ({
        ...prev,
        postVotes: updatedPostVotes,
        posts: updatedPosts,
      }));

      const postRef = doc(firestore, "posts", post.id);
      batch.update(postRef, { voteStatus: voteStatus + voteChange });
      await batch.commit();
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectPost = () => {};

  const onDeletePost = async (post: IPost): Promise<boolean> => {
    try {
      if (post.imageURL) {
        const imgRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imgRef);
      }

      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};
export default usePosts;
