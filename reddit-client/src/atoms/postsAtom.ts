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
  communityImageURL?: string;
  createdAt: Timestamp;
}

interface PostState {
  selectePost: IPost | null;
  posts: IPost[];
}

const DefaultPostState: PostState = {
  selectePost: null,
  posts: [],
};

export const postState = atom<PostState>({
  key: "Post",
  default: DefaultPostState,
});
