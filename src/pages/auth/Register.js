import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { AuthLayout, CardAuth } from "components";
import authRequest from "api/auth";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const toast = useToast();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const notif = (title, message, type) => {
    toast({
      title: title,
      description: message,
      status: type,
      duration: 5000,
      isClosable: true,
    });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await authRequest.register(data);
      notif("Success!", "Please sign in", "success");
    } catch (error) {
      notif("Ooops!", error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <AuthLayout>
        <CardAuth
          p={{ base: 20, md: 10, lg: 20, sm: 5 }}
          mx={{ base: 0, sm: 10, md: 10, lg: 0 }}
          my={{ base: 0, sm: 20, md: 0, lg: 0 }}
        >
          <Center fontWeight="semibold" fontSize="30px">
            Sign Up
          </Center>
          <FormControl mb={4} mt={4} isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              variant="filled"
              bg="#F2F2F2"
              _hover={{ bg: "#F2F2F2" }}
              _focus={{ bg: "#F2F2F2" }}
              isRequired={true}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </FormControl>
          <FormControl mb={4} mt={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              variant="filled"
              bg="#F2F2F2"
              _hover={{ bg: "#F2F2F2" }}
              _focus={{ bg: "#F2F2F2" }}
              isRequired={true}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </FormControl>
          <FormControl mb={4} isRequired>
            <Flex justifyContent="space-between">
              <FormLabel>Password</FormLabel>
            </Flex>
            <Input
              type="password"
              variant="filled"
              bg="#F2F2F2"
              _hover={{ bg: "#F2F2F2" }}
              _focus={{ bg: "#F2F2F2" }}
              isRequired={true}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </FormControl>
          <Button
            mt={4}
            w="full"
            variant="gray"
            onClick={handleRegister}
            isLoading={isLoading}
            loadingText="Please wait..."
          >
            Sign Up
          </Button>
          <Flex mt={5} justifyContent="center">
            <Button as={Link} variant="link" color="black" to="/">
              Sign in here
            </Button>
          </Flex>
        </CardAuth>
        <CardAuth
          bg="#DFDFDF"
          py={{ base: 0, lg: "50vh", md: "50vh", sm: "50vh" }}
          px={{ base: 0, lg: "12vh", md: "25%", sm: "15vh" }}
        ></CardAuth>
      </AuthLayout>
    </>
  );
}