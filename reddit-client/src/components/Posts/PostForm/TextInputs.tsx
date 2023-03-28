import { Button, Input, Stack, Textarea, Flex } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

type TextInputsProps = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  postText: string;
  setPostText: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  postText,
  setPostText,
  setTitle,
  title,
  isLoading,
}) => {
  return (
    <>
      {/* @ts-ignore*/}
      <Stack spacing="3" width="100%">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fontSize="10pt"
          borderRadius="4"
          placeholder="Title"
          _placeholder={{ color: "gray.500" }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "black",
          }}
        />
        <Textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          fontSize="10pt"
          borderRadius="4"
          placeholder="Text (optional)"
          _placeholder={{ color: "gray.500" }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "black",
          }}
        />
        <Flex justify="flex-end">
          <Button height="34px" padding="0px 30px" isLoading={isLoading}>
            Post
          </Button>
        </Flex>
      </Stack>
    </>
  );
};
export default TextInputs;
