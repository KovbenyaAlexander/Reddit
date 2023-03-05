import React, { useState } from "react";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { AuthModalState } from "@/atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import FIREBASE_ERRORS from "../../../firebase/errors";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuthModalState = useSetRecoilState(AuthModalState);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  const emailOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      {/* @ts-ignore*/}
      <Input
        required
        value={email}
        placeholder="email"
        type="email"
        mb="2"
        onChange={emailOnchangeHandler}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        value={password}
        placeholder="password"
        type="password"
        mb="2"
        onChange={passwOnchangeHandler}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />

      <Text textAlign="center" color="red" fontSize="10pt" fontWeight="700">
        {error &&
          FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>

      <Button
        width="100%"
        height="36px"
        type="submit"
        mb="2"
        isLoading={loading}
      >
        Log In
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr="1">New here?</Text>
        <Text
          color="blue.500"
          fontWeight="700"
          cursor="pointer"
          onClick={() => {
            setAuthModalState((prev) => ({ ...prev, view: "signup" }));
          }}
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
