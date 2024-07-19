'use client';

import { useState, useEffect } from "react";
import {
    Center,
    Flex,
    Box,
    Container,
    HStack,
    VStack,
    Image,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Checkbox,
    Button,
    Link,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    useDisclosure
} from "@chakra-ui/react";
import { createIcon } from '@chakra-ui/icons';
import { Field, Formik } from 'formik';
import axios from 'axios';

import Logo from "@/app/_assets/logo.svg";
import Background from "@/app/_assets/background.svg";

const EyeOpenIcon = createIcon({
  displayName: 'EyeOpenIcon',
  viewBox: '0 0 20 20',
  path: (
    <>
      <path d="M10 12C10.2626 12 10.5227 11.9483 10.7654 11.8478C11.008 11.7473 11.2285 11.5999 11.4142 11.4142C11.5999 11.2285 11.7473 11.008 11.8478 10.7654C11.9483 10.5227 12 10.2626 12 10C12 9.73736 11.9483 9.47728 11.8478 9.23463C11.7473 8.99198 11.5999 8.7715 11.4142 8.58579C11.2285 8.40007 11.008 8.25275 10.7654 8.15224C10.5227 8.05173 10.2626 8 10 8C9.46957 8 8.96086 8.21071 8.58579 8.58579C8.21071 8.96086 8 9.46957 8 10C8 10.5304 8.21071 11.0391 8.58579 11.4142C8.96086 11.7893 9.46957 12 10 12Z" fill="#666666"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M0 10C1.3345 5.94333 5.30655 3 10 3C14.6934 3 18.6655 5.94333 20 10C18.6655 14.0567 14.6934 17 10 17C5.30655 17 1.3345 14.0567 0 10ZM14.1921 10C14.1921 11.0609 13.7505 12.0783 12.9643 12.8284C12.1781 13.5786 11.1118 14 10 14C8.88817 14 7.82189 13.5786 7.03571 12.8284C6.24953 12.0783 5.80786 11.0609 5.80786 10C5.80786 8.93913 6.24953 7.92172 7.03571 7.17157C7.82189 6.42143 8.88817 6 10 6C11.1118 6 12.1781 6.42143 12.9643 7.17157C13.7505 7.92172 14.1921 8.93913 14.1921 10Z" fill="#666666"/>
    </>
  ),
});
const EyeCloseIcon = createIcon({
  displayName: 'EyeOpenIcon',
  viewBox: '0 0 20 20',
  path: (
    <>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.72812 2.26923C3.53332 2.09204 3.27568 1.99557 3.00946 2.00016C2.74325 2.00474 2.48925 2.11002 2.30097 2.29381C2.1127 2.4776 2.00486 2.72555 2.00016 2.98543C1.99546 3.24531 2.09428 3.49682 2.27579 3.68698L16.662 17.7308C16.8568 17.908 17.1145 18.0044 17.3807 17.9998C17.6469 17.9953 17.9009 17.89 18.0892 17.7062C18.2775 17.5224 18.3853 17.2744 18.39 17.0146C18.3947 16.7547 18.2959 16.5032 18.1144 16.313L16.6012 14.8351C18.2015 13.5892 19.3848 11.9058 20 10C18.6898 5.93065 14.7961 2.97811 10.1951 2.97811C8.58437 2.97609 6.99591 3.34528 5.55894 4.05563L3.72983 2.26923H3.72812ZM8.10736 6.54255L9.66245 8.06229C10.0109 7.97207 10.3775 7.97274 10.7256 8.06425C11.0736 8.15576 11.391 8.33489 11.6459 8.58372C11.9008 8.83255 12.0843 9.14236 12.178 9.48215C12.2718 9.82195 12.2725 10.1798 12.18 10.52L13.736 12.038C14.199 11.2717 14.388 10.3769 14.2733 9.49428C14.1585 8.61167 13.7465 7.79132 13.1021 7.16222C12.4576 6.53311 11.6173 6.13093 10.7131 6.01891C9.809 5.90689 8.89237 6.09055 8.10736 6.54255Z" fill="#666666"/>
      <path d="M12 16.7089L9.29489 14.1134C8.32233 14.0549 7.40545 13.6579 6.71632 12.997C6.02718 12.3362 5.61315 11.4568 5.55193 10.5239L1.87732 7C1.03239 7.96524 0.394426 9.08098 0 10.2832C1.27378 14.1758 5.06676 17 9.54498 17C10.3919 17 11.2147 16.8992 12 16.7089Z" fill="#666666"/>
    </>
  ),
});

const initialValues = {
  username: '',
  password: '',
};

export default function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const {
      isOpen: isForgetPasswordOpen,
      onOpen: onForgetPasswordOpen,
      onClose: onForgetPasswordClose,
  } = useDisclosure();

  function handleForgetPassword() {
      setIsShowPassword(!isShowPassword);
  };

  function handleSubmit(values, actions) {
    handleLogin(values, actions);
  };

  async function handleLogin(values, { setErrors, resetForm }) {
    try {
      setIsLogin(true);
      const response = await axios.post(
          'https://sit-ccsgptapi.flypa.com.tw/api/v1/user/login',
          {
              username: values.username,
              password: values.password,
          },
      );

      const { idToken } = response.data;
      document.cookie = `idToken=${idToken}`;
    } catch (error) {
      if (error.response.status === 400) {
        setErrors({ password: '帳號或密碼輸入錯誤' });
      } else {
        setErrors({ password: '登入失敗請重新嘗試' });
      }
    } finally {
      setIsLogin(false);
    }
  };

  return (
    <Box pos="relative">
      <Background
        width="100vw"
        height="100vh"
      />
      <Center pos="absolute" top="50%" left="50%">
        <Flex
          height="471px"
          position="absolute"
        >
          <Center width="290px" bg="primaryPrimary" borderLeftRadius="8px">
            <VStack spacing="4px" color="white">
              <HStack spacing={0}>
                <Box>
                  <Logo />
                </Box>
                <VStack spacing={0}>
                  <Container fontSize={20} fontWeight={700}>
                    <h1>麥脆雞皮</h1>
                  </Container>
                  <Container fontSize={14} fontWeight={300}>
                    <h2>CCS GPT</h2>
                  </Container>
                </VStack>
              </HStack>
              <Container fontSize={36} fontWeight={500} lineHeight="52px">
                <h5>Welcome!</h5>
              </Container>
              <Container fontSize={16} fontWeight={300} lineHeight="23px">
                <h6>Welcome to CCSGPT:)</h6>
              </Container>
            </VStack>
          </Center>
          <Center width="440px" bg="white" borderRightRadius="8px">
            <Box width="80%">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing="16px">
                      <Container
                        mb={5}
                        fontSize={36}
                        fontWeight={500}
                        lineHeight="52px"
                        textAlign="center"
                        color="primaryPrimary"
                      >
                        LOG IN
                      </Container>
                      <FormControl isInvalid={errors.username && touched.username}>
                        <FormLabel htmlFor="username">帳號</FormLabel>
                        <Field
                          as={Input}
                          type="text"
                          id="username"
                          name="username"
                          py="8.5px"
                          px="12px"
                          borderRadius={8}
                          _focus={{ borderColor:'primaryPrimary' }}
                          css={{ caretColor:'#3663FF' }}
                          validate={(value) => {
                            let error;
                            if (value.length === 0) {
                                error = '請輸入帳號';
                            }
                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.username}</FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors.password && touched.password}>
                        <FormLabel htmlFor="password">密碼</FormLabel>
                        <InputGroup>
                          <Field
                            as={Input}
                            type={isShowPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            py="8.5px"
                            px="12px"
                            borderRadius={8}
                            placeholder="請輸入密碼"
                            _placeholder={{ color:'gray.200' }}
                            _focus={{ borderColor:'primaryPrimary' }}
                            css={{ caretColor:'#3663FF' }}
                            validate={(value) => {
                                let error;
                                if (value.length === 0) {
                                    error = '請輸入密碼';
                                }
                                return error;
                            }}
                          />
                          <InputRightElement>
                            <IconButton
                              onClick={handleForgetPassword}
                              icon={isShowPassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
                              bg="none"
                              _hover={{ bg:'none' }}
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <FormControl>
                        <Checkbox
                          css={{
                            '.chakra-checkbox__control': {
                              borderWidth: '1px',
                              borderRadius: '4px',
                            },
                          }}
                          _hover={{ borderColor: 'primaryPrimary', }}
                          _checked={{
                            '.chakra-checkbox__control': {
                              bg: 'primaryPrimary',
                              borderColor: 'primaryPrimary',
                            },
                          }}
                          _focus={{ borderColor: 'primaryPrimary', }}
                        >
                          記得我
                        </Checkbox>
                      </FormControl>
                      <Button
                        type="submit"
                        width="100%"
                        color="white"
                        bg="gray.100"
                        isLoading={isLogin}
                        loadingText='登入'
                        spinnerPlacement='start'
                      >
                        登入
                      </Button>
                      <Link
                        py="8px"
                        px="24px"
                        color="primaryPrimary"
                        _hover={{ color:'primaryDark' }}
                        _disabled={{ color:'gray.200' }}
                        onClick={onForgetPasswordOpen}
                      >
                        忘記密碼
                      </Link>
                      <Modal isOpen={isForgetPasswordOpen} onClose={onForgetPasswordClose} zIndex={10} isCentered>
                        <ModalOverlay />
                        <ModalContent width="300px" py="24px" px="16px">
                          <VStack spacing="16px">
                            <ModalBody py={0} px={0} alignSelf="start" fontWeight={400} color="gray.800">
                              忘記密碼請與新創部門聯繫，謝謝
                            </ModalBody>
                            <ModalFooter py={0} px={0} alignSelf="end">
                              <Button
                                py="8px"
                                px="24px"
                                bg="primaryPrimary"
                                color="white"
                                _hover={{ bg:'primaryDark' }}
                                onClick={onForgetPasswordClose}
                              >
                                我知道了
                              </Button>
                            </ModalFooter>
                          </VStack>
                        </ModalContent>
                      </Modal>
                    </VStack>
                  </form>
                )}
              </Formik>
            </Box>
          </Center>
        </Flex>
      </Center>
    </Box>
  );
}