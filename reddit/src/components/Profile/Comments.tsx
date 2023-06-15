import { auth, firestore, storage } from "@/firebase/clientApp";
import { Box, Flex, Skeleton, SkeletonText, Spinner } from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Comment } from "../Posts/Comments/CommentItem";
import CommentItem from "./CommentItem";

const Comments = ({ profileId }: { profileId: string }) => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const commentsQuery = query(
        collection(firestore, "comments", ``),
        where("creatorId", "==", profileId)
      );

      const commentsDocs = await getDocs(commentsQuery);
      const comments = commentsDocs.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Comment)
      );
      console.log(comments);
      setComments(comments);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchComments();
    })();
  }, [profileId]);

  return (
    <>
      {/* @ts-ignore*/}
      <Flex direction="column">
        {loading ? (
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        ) : (
          <>
            {comments.map((comment) => (
              <CommentItem comment={comment} key={comment.id} />
            ))}
          </>
        )}
      </Flex>
    </>
  );
};
export default Comments;
