import { Container, VStack, Heading, Button, Input, Image, Box, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";

const Index = () => {
  const [photos, setPhotos] = useState([]);
  const [photoURL, setPhotoURL] = useState("");

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