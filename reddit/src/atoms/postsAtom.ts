import { Timestamp } from "@google-cloud/firestore";
import { atom } from "recoil";

export interface IPost {
  id: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  communityImageUrl?: string;
  createdAt: Timestamp;
}

export interface IPostVote {
  id: string;
  postId: string;
  communityId: string;
  voteValue: number;
}
interface PostState {
  selectedPost: IPost | null;
  posts: IPost[];
  postVotes: IPostVote[];
}

const DefaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
};

export const postState = atom<PostState>({
  key: "Post",
  default: DefaultPostState,
});
