import { IPost } from "@/atoms/postsAtom";
import { Box, Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";

type CommentsProps = {
  user: User;
  selectedPost: IPost;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const onCreateComment = async (comment: string) => {
    console.log(comment);
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
        <CommentInput
          commentText={commentText}
          onCreateComment={onCreateComment}
          createLoading={createLoading}
          setCommentText={setCommentText}
          user={user}
        />
      </Flex>
    </Box>
  );
};
export default Comments;
