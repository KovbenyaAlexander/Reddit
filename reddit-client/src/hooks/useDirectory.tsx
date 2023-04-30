import React, { useEffect, useState } from "react";
import {
  IDirectoryMenuItem,
  directoryMenuAtom,
} from "../atoms/directoryMenuAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { CommunityState } from "@/atoms/communitiesAtom";
import { FaReddit } from "react-icons/fa";

const useDirectory = () => {
  const [directoryState, setDirectoryState] = useRecoilState(directoryMenuAtom);

  const router = useRouter();
  const communityStateValue = useRecoilValue(CommunityState);

  const toggleMenuOpen = () => {
    console.log(`toggle`);
    setDirectoryState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const onSelectMenuItem = (menuItem: IDirectoryMenuItem) => {
    setDirectoryState((prev) => {
      return {
        ...prev,
        selectedMenuItem: menuItem,
        isOpen: false,
      };
    });

    router.push(menuItem.linkToCommunity);
  };

  useEffect(() => {
    const { currentCommunity } = communityStateValue;
    if (!currentCommunity) return;

    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: {
        text: `r/${currentCommunity.id}`,
        imageURL: currentCommunity.imageURL,
        linkToCommunity: `/r/${currentCommunity.id}`,
        icon: FaReddit,
      },
    }));
  }, [communityStateValue.currentCommunity]);

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};
export default useDirectory;
