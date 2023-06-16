import React, { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { Box, Flex, Icon, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import moment from "moment";
import Link from "next/link";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultAvatar from "../../../../public/images/default_user_avatar.png";
import { user } from "firebase-functions/v1/auth";
import IProfile from "@/Types/Profile";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
  postAuthor: string;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId?: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  loadingDelete,
  onDeleteComment,
  userId,
}) => {
  const [profile, setProfile] = useState<IProfile>();

  const fetchProfile = async () => {
    try {
      const profileDocRef = doc(firestore, "users", comment.creatorId);
      const profileDoc = await getDoc(profileDocRef);
      setProfile(profileDoc.data() as IProfile);
      console.log(profileDoc.data());
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    (async () => {
      await fetchProfile();
    })();
  }, [userId]);

  return (
    <>
      {/* @ts-ignore*/}
      <Flex>
        <Box mr="2">
          {/* <Icon as={FaReddit} fontSize="30" color="gray.300" /> */}
          <Image
            src={profile?.photoURL || defaultAvatar.src}
            height="40px"
            width="40px"
            borderRadius="full"
          />
        </Box>

        <Stack spacing={1}>
          <Stack direction="row" align="center" fontSize="8pt">
            <Link href={`/r/profile/${comment.creatorId}`}>
              <Text
                fontWeight="700"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
              >
                {comment.creatorDisplayText}
              </Text>
            </Link>
            <Text color="gray.600">
              {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
            </Text>
            {loadingDelete && <Spinner size="sm" />}
          </Stack>

          <Text fontSize="10pt">{comment.text}</Text>

          <Stack
            direction="row"
            align="center"
            cursor="pointer"
            color="gray.500"
          >
            <Icon as={IoArrowUpCircleOutline} />
            <Icon as={IoArrowDownCircleOutline} />
            {userId === comment.creatorId && (
              <>
                <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                  Edit
                </Text>
                <Text
                  fontSize="9pt"
                  _hover={{ color: "blue.500" }}
                  onClick={() => onDeleteComment(comment)}
                >
                  Delete
                </Text>
              </>
            )}
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};
export default CommentItem;
