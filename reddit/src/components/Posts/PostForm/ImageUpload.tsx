import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useRef } from "react";

type ImageUploadProps = {
  onSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
  setSelectedFile: Dispatch<SetStateAction<string>>;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onSelectImage,
  selectedFile,
  setSelectedFile,
  setSelectedTab,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  const uploadClickHandler = () => {
    selectedFileRef.current?.click();
  };

  return (
    <>
      {/* @ts-ignore*/}
      <Flex justify="center" align="center" width="100%" direction="column">
        {selectedFile ? (
          <>
            <Image src={selectedFile} maxWidth="400px" maxHeight="400px" />
            <Stack direction="row" mt="4">
              <Button
                height="28px"
                onClick={() => {
                  setSelectedTab("Post");
                }}
              >
                Back to post
              </Button>
              <Button
                variant="outline"
                height="28px"
                onClick={() => setSelectedFile("")}
              >
                Remove
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Flex
              justify="center"
              align="center"
              p="20"
              border="1px dashed"
              borderColor="gray.200"
              width="100%"
              borderRadius="4"
            >
              <Button
                variant="outline"
                height="28px"
                onClick={uploadClickHandler}
              >
                Upload
              </Button>
              <input
                ref={selectedFileRef}
                type="file"
                hidden
                onChange={onSelectImage}
              />
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};
export default ImageUpload;
