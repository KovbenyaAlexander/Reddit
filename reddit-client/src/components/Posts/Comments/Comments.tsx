import { IPost } from "@/atoms/postsAtom";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { useSetRecoilState } from "recoil";
import { AuthModalState } from "@/atoms/authModalAtom";
import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import {
  Timestamp,
  collection,
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";

type CommentsProps = {
  user: User | undefined | null;
  selectedPost: IPost;
  communityId: string;
};

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const setAuthModalState = useSetRecoilState(AuthModalState);

  const onCreateComment = async (comment: string) => {
    setCreateLoading(true);

    try {
      const batch = writeBatch(firestore);
      const commentDocRef = doc(collection(firestore, "comments"));
      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user!.uid,
        creatorDisplayText: user!.email!.split("@")[0],
        communityId,
        postId: selectedPost.id,
        postTitle: selectedPost.title,
        text: comment,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);

      const postDocRef = doc(firestore, "posts", selectedPost.id);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();
      setCommentText("");

      setComments((prev) => [newComment, ...prev]);
    } catch (err) {
      console.log(err);
    }
    setCreateLoading(false);
  };

  const onDeleteComment = async (comment: string) => {};

  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <Box bg="white" borderRadius="0px 0px 4px 4px" p="2">
      {/* @ts-ignore*/}

      <Flex direction="column" pl="10" pr="4" mb="6" width="100%">
        {user ? (
          <CommentInput
            commentText={commentText}
            onCreateComment={onCreateComment}
            createLoading={createLoading}
            setCommentText={setCommentText}
            user={user}
          />
        ) : (
          <Flex justifyContent="space-between">
            <Text>Log in or sign up to comment</Text>

            <AuthButtons />
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
export default Comments;
