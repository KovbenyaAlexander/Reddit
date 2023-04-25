import { IPost, postState } from "@/atoms/postsAtom";
import { Box, Flex, Button, Text, Stack } from "@chakra-ui/react";
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
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import CommentItem, { Comment } from "./CommentItem";

type CommentsProps = {
  user: User | undefined | null;
  selectedPost: IPost;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const setAuthModalState = useSetRecoilState(AuthModalState);
  const setPostState = useSetRecoilState(postState);
  const [loadingDeleteId, setLoadingDeleteId] = useState("");

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

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      const postDocRef = doc(firestore, "posts", selectedPost.id);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();
      setCommentText("");

      setComments((prev) => [newComment, ...prev]);
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as IPost,
      }));
    } catch (err) {
      console.log(err);
    }
    setCreateLoading(false);
  };

  const onDeleteComment = async (comment: Comment) => {
    setLoadingDeleteId(comment.id);
    try {
      const batch = writeBatch(firestore);
      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);

      const postDocRef = doc(firestore, "posts", comment.postId);
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });

      await batch.commit();

      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as IPost,
      }));

      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (error) {
      console.log(error);
    }
    setLoadingDeleteId("");
  };

  const getPostComments = async () => {
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost.id),
        orderBy("createdAt", "desc")
      );

      const commentDocs = await getDocs(commentsQuery);
      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments as Comment[]);
    } catch (error) {
      console.log(error);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    if (selectedPost.id) {
      getPostComments();
    }
  }, [selectedPost]);

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
      <Stack spacing={6} p="2">
        {fetchLoading ? (
          <>Loading</>
        ) : (
          <>
            {comments.length > 0 ? (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={loadingDeleteId === comment.id}
                    userId={user?.uid}
                  />
                ))}
              </>
            ) : (
              <Text fontWeight="700" align="center">
                No comments yet
              </Text>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};
export default Comments;
