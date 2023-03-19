import React, { useState } from "react";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { AuthModalState } from "@/atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import FIREBASE_ERRORS from "../../../firebase/errors";

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const setAuthModalState = useSetRecoilState(AuthModalState);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setValidationError("Passwords don't match");
    }

    setValidationError("");
    createUserWithEmailAndPassword(email, password);
  };

  const emailOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const confPasswOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setconfirmPassword(e.target.value);
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
      <Input
        required
        value={confirmPassword}
        placeholder="confirm password"
        type="password"
        mb="2"
        onChange={confPasswOnchangeHandler}
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
        {(validationError || error?.message) &&
          (validationError ||
            FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS])}
      </Text>

      <Button
        width="100%"
        height="36px"
        type="submit"
        mb="2"
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr="1">Already a redditor?</Text>
        <Text
          color="blue.500"
          fontWeight="700"
          cursor="pointer"
          onClick={() => {
            setAuthModalState((prev) => ({ ...prev, view: "login" }));
          }}
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
