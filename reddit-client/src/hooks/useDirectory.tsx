import React, { useState } from "react";
import {
  IDirectoryMenuItem,
  directoryMenuAtom,
} from "../atoms/directoryMenuAtom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

const useDirectory = () => {
  const [directoryState, setDirectoryState] = useRecoilState(directoryMenuAtom);

  const router = useRouter();

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

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};
export default useDirectory;
