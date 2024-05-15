import { Container, Text, VStack, Button, Input, Box, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [chatData, setChatData] = useState("");
  const toast = useToast();

  const handleExport = () => {
    if (!chatData) {
      toast({
        title: "No data to export.",
        description: "Please paste your Telegram chat data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const blob = new Blob([chatData], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "telegram_chat_export.txt";
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export successful.",
      description: "Your Telegram chat has been exported.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Telegram Chat Exporter</Heading>
        <Text>Paste your Telegram chat data below and click "Export" to download it as a text file.</Text>
        <Input
          placeholder="Paste your chat data here..."
          size="lg"
          value={chatData}
          onChange={(e) => setChatData(e.target.value)}
          height="200px"
          as="textarea"
        />
        <Button colorScheme="blue" size="lg" onClick={handleExport}>Export</Button>
      </VStack>
    </Container>
  );
};

export default Index;