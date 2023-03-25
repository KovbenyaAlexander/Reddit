import { CommunityState, ICommunity } from "@/atoms/communitiesAtom";
import React from "react";
import { useRecoilState } from "recoil";

type useCommunityDataProps = {};

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(CommunityState);

  const toggleJoinCommynity = (
    communityData: ICommunity,
    isJoined: boolean
  ) => {
    if (isJoined) {
      leaveComminity(communityData.id);
    } else {
      joinComminity(communityData);
    }
  };

  const joinComminity = (communityData: ICommunity) => {};
  const leaveComminity = (communityId: string) => {};

  return {
    communityStateValue,
    toggleJoinCommynity,
  };
};
export default useCommunityData;
