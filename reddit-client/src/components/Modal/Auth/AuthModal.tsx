import { AuthModalState } from "@/atoms/authModalAtom";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";

const AuthModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useRecoilState(AuthModalState);

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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>sadadsad</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
