import { Container, VStack, Heading, Button, Input, Image, Box, SimpleGrid, useToast } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { FaUpload } from "react-icons/fa";

import { useDropzone } from "react-dropzone";

const Index = () => {
  const toast = useToast();
  const [photos, setPhotos] = useState([]);
  const [photoURL, setPhotoURL] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos((prevPhotos) => [...prevPhotos, reader.result]);
      };
      reader.onerror = () => {
        toast({
          title: "Error uploading file",
          description: "There was an error uploading the file. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      };
      reader.readAsDataURL(file);
    });
  }, [toast]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = () => {
    if (photoURL) {
      setPhotos([...photos, photoURL]);
      setPhotoURL("");
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Photo Sharing Platform</Heading>
        <Box width="100%" display="flex" alignItems="center">
          <Input
            placeholder="Enter photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            mr={2}
          />
          <Button leftIcon={<FaUpload />} colorScheme="teal" onClick={handleUpload}>
            Upload
          </Button>
        </Box>
        <Box
          {...getRootProps()}
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="md"
          p={4}
          mt={4}
          width="100%"
          textAlign="center"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </Box>
        <SimpleGrid columns={[1, 2, 3]} spacing={4} width="100%" mt={6}>
          {photos.map((url, index) => (
            <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={url} alt={`Photo ${index + 1}`} />
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;