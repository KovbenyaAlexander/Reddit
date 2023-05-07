import { CommunityState } from "@/atoms/communitiesAtom";
import { IPost } from "@/atoms/postsAtom";
import CreatePostLink from "@/components/Community/CreatePostLink";
import PageContent from "@/components/Layout/PageContent";
import PostItem from "@/components/Posts/PostItem";
import PostLoader from "@/components/Posts/PostLoader";
import usePosts from "@/components/Posts/usePosts";
import { auth, firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { Stack } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();

  const { communityStateValue } = useCommunityData();

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(`no user posts:`);
      console.log(posts);

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as IPost[],
      }));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const buildUserHomeFeed = async () => {
    setLoading(true);

    try {
      if (communityStateValue.mySnippets.length) {
        const myCommynitiesIds = communityStateValue.mySnippets.map(
          (item) => item.communityId
        );

        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", myCommynitiesIds),
          limit(10)
        );

        const postDocs = await getDocs(postQuery);

        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as IPost[],
        }));
      } else {
        buildNoUserHomeFeed();
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const getUserPostVotes = () => {};

  useEffect(() => {
    if (!user && !loadingUser) {
      buildNoUserHomeFeed();
    }
  }, [user, loadingUser]);

  useEffect(() => {
    if (communityStateValue.isSnippetsFetched) {
      buildUserHomeFeed();
    }
  }, [communityStateValue.isSnippetsFetched]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <>
            {/* @ts-ignore*/}
            <Stack mt="4">
              {postStateValue.posts.map((item) => (
                <PostItem
                  onDeletePost={onDeletePost}
                  onSelectPost={onSelectPost}
                  onVote={onVote}
                  key={item.id}
                  userIsCreator={user?.uid === item.creatorId}
                  post={item}
                  userVoteValue={
                    postStateValue.postVotes.find(
                      (vote) => vote.postId === item.id
                    )?.voteValue
                  }
                  isHomePage
                />
              ))}
            </Stack>
          </>
        )}
      </>
      <>dd</>
    </PageContent>
  );
}
