'use client';

import { useState } from "react";
import { Box, Flex, Spacer, Button, HStack, VStack, Container, Center } from "@chakra-ui/react";
import Logo from "@/app/_assets/logo.svg";
import AlertBlack from"@/app/_assets/alert-black.svg";
import AlertWhite from"@/app/_assets/alert-white.svg";
import MessageIcon from "@/app/_assets/message.svg";
import EditIcon from "@/app/_assets/edit.svg";
import LogoutIcon from "@/app/_assets/logout.svg";


export default function Home() {
  const [isReportHover, setIsReportHover] = useState(false);

  function handleReportMouseover() {
    setIsReportHover(true);
  };
  function handleReportMouseout() {
    setIsReportHover(false);
  };

  return (
    <>
      <Flex alignItems="center" width="100%" height="77px" px="32px" bg="primaryPrimary">
        <HStack spacing={0}>
          <Box>
            <Logo />
          </Box>
          <VStack spacing={0} color="white">
            <Container fontSize={20} fontWeight={700} lineHeight="24px">
              <h1>麥脆雞皮</h1>
            </Container>
            <Container fontSize={14} fontWeight={300}>
              <h2>CCS GPT</h2>
            </Container>
          </VStack>
        </HStack>
        <Spacer />
        <Button
          px="24px"
          bg="white"
          color="gray.800"
          _hover={{ bg:'gray.600', color: 'white' }}
          onMouseOver={handleReportMouseover}
          onMouseOut={handleReportMouseout}
        >
          <HStack spacing="8px">
            {isReportHover ? <AlertWhite /> : <AlertBlack />}
            <Box fontSize={16}>
              問題回報
            </Box>
          </HStack>
        </Button>
      </Flex>
      <Flex width="100%">
        <Box p="12px" bg="#F9F9F9">
          <VStack width="60px" height="799px" py="32px" px="12px" bg="primaryPrimary" borderRadius={16}>
            <Flex direction="column" flex="1" gap="16px" >
              <Center width="36px" height="36px">
                <Button p="8px" bg="#9FB4FF" borderRadius="20px">
                  <MessageIcon />
                </Button>
              </Center>
              <Center width="36px" height="36px">
                <Button p="8px" bg="none" borderRadius="20px">
                  <EditIcon />
                </Button>
              </Center>
              <Spacer />
            </Flex>
            <Center width="36px" height="36px">
              <Button p="8px" bg="none" borderRadius="20px">
                <LogoutIcon />
              </Button>
            </Center>
          </VStack>
        </Box>
        <Box>2</Box>
        <Box>3</Box>
      </Flex>
    </>
  );
}
