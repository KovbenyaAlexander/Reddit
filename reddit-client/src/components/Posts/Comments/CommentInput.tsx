import { Flex, Textarea, Button, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type CommentInputProps = {
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  createLoading: boolean;
  onCreateComment: (comment: string) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  commentText,
  createLoading,
  onCreateComment,
  setCommentText,
  user,
}) => {
  return (
    <>
      {/* @ts-ignore*/}
      <Flex direction="column">
        <>
          <Text mb="1">
            Comment as{" "}
            <span style={{ color: "#3182CE" }}>
              {user.email?.split("@")[0]}
            </span>
          </Text>

          <Textarea
            width="100%"
            height="100px"
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
            placeholder="Add a comment..."
            fontSize="10pt"
            minHeight="160px"
            pb="10"
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid black",
            }}
          ></Textarea>
          <Flex
            justify="flex-end"
            bg="gray.100"
            p="6px 8px"
            borderRadius="0px 0px 4px 4px"
          >
            <Button
              height="28px"
              isLoading={createLoading}
              isDisabled={!commentText.trim()}
              onClick={(e) => onCreateComment(commentText)}
            >
              Comment
            </Button>
          </Flex>
        </>
      </Flex>
    </>
  );
};
export default CommentInput;
