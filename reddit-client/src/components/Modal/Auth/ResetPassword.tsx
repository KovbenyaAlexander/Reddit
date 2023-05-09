import { AuthModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsReddit } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { auth } from "../../../firebase/clientApp";

const ResetPassword: React.FC = () => {
  const [sendPassword, sending, firebaseErr] = useSendPasswordResetEmail(auth);
  const [email, setEmail] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(false);

  const setAuthModalState = useSetRecoilState(AuthModalState);

  const onChangeEmailhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await sendPassword(email);
    setIsMessageSent(true);
  };

  return (
    <>
      {/* @ts-ignore*/}
      <Flex direction="column" justifyContent="center">
        <Icon as={BsReddit} color="brand.100" width="100%" fontSize="40"></Icon>

        <>
          {isMessageSent && !firebaseErr ? (
            <Text textAlign="center" mt="2">
              We have sent you an email to reset your password
            </Text>
          ) : (
            <>
              <Text textAlign="center" mt="2">
                Enter the email with your account and we will send you a reset
                link
              </Text>
              <form onSubmit={formSubmitHandler}>
                <Flex direction="column" justifyContent="center">
                  <Input
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChangeEmailhandler}
                    mt="3"
                  />

                  {firebaseErr && (
                    <Text
                      textAlign="center"
                      color="red"
                      mt="2"
                      fontWeight="700"
                      fontSize="10pt"
                    >
                      Wrong email
                    </Text>
                  )}

                  <Button type="submit" mt="3" isLoading={sending}>
                    Reset Password
                  </Button>
                </Flex>
              </form>
            </>
          )}
        </>

        <Flex
          fontSize="9pt"
          color="blue.500"
          fontWeight="700"
          justifyContent="space-between"
          alignSelf="center"
          width="100px"
          mt="3"
        >
          <Text
            cursor="pointer"
            onClick={() => {
              setAuthModalState((prev) => ({ ...prev, view: "login" }));
            }}
          >
            Log In
          </Text>
          <Text color="gray.700">|</Text>
          <Text
            fontWeight="700"
            cursor="pointer"
            onClick={() => {
              setAuthModalState((prev) => ({ ...prev, view: "signup" }));
            }}
          >
            Sign Up
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
export default ResetPassword;
