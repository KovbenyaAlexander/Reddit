import PageContent from "@/components/Layout/PageContent";
import PostItem from "@/components/Posts/PostItem";
import usePosts from "@/components/Posts/usePosts";
import { auth } from "@/firebase/clientApp";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { postStateValue, onDeletePost, onVote, setPostStateValue } =
    usePosts();

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
      </>
      <>aboutCommunity</>
    </PageContent>
  );
};
export default PostPage;
