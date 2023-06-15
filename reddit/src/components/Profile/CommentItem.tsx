import React from "react";
import { Comment } from "../Posts/Comments/CommentItem";
import {
  Box,
  Divider,
  Flex,
  Skeleton,
  SkeletonText,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

const CommentItem = ({ comment }: { comment: Comment }) => {
  console.log(comment);
  return (
    <>
      {/* @ts-ignore*/}
      <Flex direction="column" bgColor="white" m="3px" p="5px">
        <Flex gap="2px" alignItems="center">
          <Text
            color="blue.500"
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
            fontSize="13px"
          >
            <Link href={`/r/profile/${comment.creatorId}`}>
              {comment.creatorDisplayText}
            </Link>
          </Text>
          <Text fontSize="12px" color="gray.500">
            commented on{" "}
          </Text>
          <Link href={`/r/${comment.communityId}/comments/${comment.postId}`}>
            <Text fontSize="12px" fontWeight={"bold"} color="gray">
              {comment.postTitle}
            </Text>
          </Link>
          <Text fontSize="11px">•</Text>
          <Link href={`/r/${comment.communityId}`}>
            <Text
              fontSize="10px"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              fontWeight="bold"
            >
              r/{comment.communityId}
            </Text>
          </Link>
          <Text fontSize="12px">•</Text>
          <Text fontSize="12px" fontWeight="light" color="gray">
            Posted by
          </Text>
          <Link href={`/r/${comment.creatorId}`}>
            <Text
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              fontSize="12px"
              fontWeight="light"
              color="gray"
            >
              u/{comment.postAuthor}
            </Text>
          </Link>
        </Flex>
        <Divider />
        <Flex mt="5px">
          <Text>{comment.text}</Text>
        </Flex>
      </Flex>
    </>
  );
};
export default CommentItem;
