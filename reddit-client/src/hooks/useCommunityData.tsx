import {
  CommunitySnippet,
  CommunityState,
  ICommunity,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

type useCommunityDataProps = {};

const useCommunityData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
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

  const getMySnippets = async () => {
    try {
      setIsLoading(true);
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getMySnippets();
    }
  }, [user]);

  return {
    communityStateValue,
    toggleJoinCommynity,
    isLoading,
  };
};
export default useCommunityData;
