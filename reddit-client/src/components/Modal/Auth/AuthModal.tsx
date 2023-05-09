import { AuthModalState } from "@/atoms/authModalAtom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { useEffect } from "react";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(AuthModalState);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  }, [user]);

  const onCloseClickHandler = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={onCloseClickHandler}>
        <ModalOverlay />
        {/* @ts-ignore*/}
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "login" && "login"}
            {modalState.view === "signup" && "signup"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pb="6"
          >
            <Flex
              direction="column"
              align="center"
              justify="center"
              width="70%"
            >
              {modalState.view === "resetPassword" ? (
                <ResetPassword />
              ) : (
                <>
                  <OAuthButtons />
                  <Text color="gray.400" fontWeight="700">
                    OR
                  </Text>
                  <AuthInputs />
                </>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
