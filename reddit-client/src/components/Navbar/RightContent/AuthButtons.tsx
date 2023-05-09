import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import React from "react";
import { AuthModalState } from "@/atoms/authModalAtom";

const AuthButtons: React.FC = () => {
  const setModalState = useSetRecoilState(AuthModalState);

  return (
    <>
      {/* @ts-ignore*/}
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr="2"
        fontFamily={"Open Sans, sans-serif"}
        onClick={() => {
          setModalState({ open: true, view: "login" });
        }}
      >
        Log In
      </Button>
      <Button
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr="2"
        onClick={() => {
          setModalState({ open: true, view: "signup" });
        }}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
