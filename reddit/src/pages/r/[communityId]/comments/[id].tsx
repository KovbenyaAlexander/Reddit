import { IPost } from "@/atoms/postsAtom";
import About from "@/components/Community/About";
import PageContent from "@/components/Layout/PageContent";
import Comments from "@/components/Posts/Comments/Comments";
import PostItem from "@/components/Posts/PostItem";
import usePosts from "@/components/Posts/usePosts";
import { auth, firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { postStateValue, onDeletePost, onVote, setPostStateValue } =
    usePosts();
  const router = useRouter();
  const { communityStateValue } = useCommunityData();

  const fetchPost = async (postId: string) => {
    try {
      const postDocRef = doc(firestore, "posts", postId);
      const postDoc = await getDoc(postDocRef);

      setPostStateValue((prev) => {
        return {
          ...prev,
          selectedPost: { id: postDoc.id, ...postDoc.data() } as IPost,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { id } = router.query;

    if (id && !postStateValue.selectedPost) {
      fetchPost(id as string);
    }
  }, [router.query, postStateValue.selectedPost]);

  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.postId === postStateValue.selectedPost?.id
              )?.voteValue
            }
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
          />
        )}
        {communityStateValue.currentCommunity &&
          postStateValue.selectedPost &&
          communityStateValue.currentCommunity && (
            <Comments
              user={user}
              communityId={communityStateValue.currentCommunity.id}
              selectedPost={postStateValue.selectedPost}
              key={postStateValue.selectedPost?.id}
            />
          )}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};
export default PostPage;
