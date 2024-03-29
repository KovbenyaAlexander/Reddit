import { IconType } from "react-icons/lib";
import { TiHome } from "react-icons/ti";
import { atom } from "recoil";

export interface IDirectoryMenuItem {
  icon: IconType;
  linkToCommunity: string;
  text: string;
  imageURL?: string;
}

export interface IDirectoryMenu {
  isOpen: boolean;
  selectedMenuItem: IDirectoryMenuItem;
}

export const DefaultdirectoryMenuItem: IDirectoryMenuItem = {
  icon: TiHome,
  linkToCommunity: "/",
  text: "Home",
};

export const defaultMenuState = {
  isOpen: false,
  selectedMenuItem: DefaultdirectoryMenuItem,
};

export const directoryMenuAtom = atom<IDirectoryMenu>({
  key: "directoryMenuAtom",
  default: defaultMenuState,
});
