import { IPost } from "@/atoms/postsAtom";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Link,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import Posts from "./Posts";
import { FaReddit } from "react-icons/fa";

type PostItemProps = {
  post: IPost;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    post: IPost,
    vote: number,
    communityId: string,
    e: React.MouseEvent
  ) => void;
  onDeletePost: (post: IPost) => Promise<boolean>;
  onSelectPost?: (post: IPost) => void;
  isHomePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  onDeletePost,
  onSelectPost,
  onVote,
  post,
  userIsCreator,
  userVoteValue,
  isHomePage,
}) => {
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  const [error, setError] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const isSinglePostPage = !onSelectPost;
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setLoadingDelete(true);
      const succes = await onDeletePost(post);

      if (!succes) {
        throw new Error("Failed to delete the post");
      }
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);

    if (isSinglePostPage) {
      router.push(`/r/${post.communityId}`);
    }
  };

  return (
    <>
      {/* @ts-ignore*/}
      <Flex
        border="1px solid"
        bg="white"
        borderColor="gray.300"
        borderRadius={4}
        _hover={{ borderColor: isSinglePostPage ? "none" : "gray.500" }}
        cursor={isSinglePostPage ? "unset" : "pointer"}
        onClick={() => onSelectPost && onSelectPost(post)}
      >
        <Flex
          direction="column"
          align="center"
          bg="gray.100"
          p="2"
          width="40px"
          borderRadius={4}
        >
          <Icon
            as={
              userVoteValue === 1
                ? IoArrowUpCircleSharp
                : IoArrowUpCircleOutline
            }
            color={userVoteValue === 1 ? "brand.100" : "gray.400"}
            fontSize="22"
            onClick={(e) => onVote(post, 1, post.communityId, e)}
            cursor="pointer"
          />

          <Text fontSize="9pt">{post.voteStatus}</Text>

          <Icon
            as={
              userVoteValue === -1
                ? IoArrowDownCircleSharp
                : IoArrowDownCircleOutline
            }
            color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
            fontSize="22"
            onClick={(e) => onVote(post, -1, post.communityId, e)}
            cursor="pointer"
          />
        </Flex>
        <Flex direction="column" width="100%">
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Stack spacing={1} p="10px">
            <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
              {isHomePage && (
                <>
                  {post.communityImageURL ? (
                    <Image
                      src={post.communityImageURL}
                      borderRadius="full"
                      boxSize="18px"
                      mr="2"
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      fontSize="18pt"
                      mr="1"
                      color="blue.500"
                    />
                  )}

                  <Link href={`r/${post.communityId}`}>
                    <Text
                      fontWeight="700"
                      _hover={{ textDecoration: "underline" }}
                      onClick={(e) => e.stopPropagation()}
                    >{`r/${post.communityId}`}</Text>
                  </Link>

                  <Icon as={BsDot} color="gray.400" fontSize="8" />
                </>
              )}
              <Text>
                Posted by u/{post.creatorDisplayName}
                {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
              </Text>
            </Stack>

            <Text fontSize="12pt" fontWeight="600">
              {post.title}
            </Text>
            <Text>{post.body}</Text>
          </Stack>

          {post.imageURL && (
            <Flex justify="center" align="center">
              {isLoadingImg && (
                <Skeleton height="200px" width="100%" borderRadius="4" />
              )}

              <Image
                src={post.imageURL}
                maxHeight="460px"
                alt="img"
                display={isLoadingImg ? "none" : "block"}
                onLoad={() => setIsLoadingImg(false)}
              />
            </Flex>
          )}
          <Flex ml="1" mb="0.5" color="gray.500" fontWeight="600">
            <Flex
              align="center"
              p="8px 10px"
              borderRadius="4"
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
            >
              <Icon as={BsChat} mr="2" />
              <Text fontSize="9pt">{post.numberOfComments}</Text>
            </Flex>

            <Flex
              align="center"
              p="8px 10px"
              borderRadius="4"
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
            >
              <Icon as={IoArrowRedoOutline} mr="2" />
              <Text fontSize="9pt">Share</Text>
            </Flex>

            <Flex
              align="center"
              p="8px 10px"
              borderRadius="4"
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
            >
              <Icon as={IoBookmarkOutline} mr="2" />
              <Text fontSize="9pt">Save</Text>
            </Flex>

            {userIsCreator && (
              <Flex
                align="center"
                p="8px 10px"
                borderRadius="4"
                _hover={{ bg: "gray.200" }}
                cursor="pointer"
                onClick={(e) => {
                  handleDelete(e);
                }}
              >
                {loadingDelete ? (
                  <Spinner size="sm" />
                ) : (
                  <>
                    <Icon as={AiOutlineDelete} mr="2" />
                    <Text fontSize="9pt">Delete</Text>
                  </>
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
export default PostItem;
