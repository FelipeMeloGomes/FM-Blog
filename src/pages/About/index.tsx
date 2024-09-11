import { Image, Box, Flex, IconButton } from "@chakra-ui/react";
import { TextField } from "../../components/TextField";
import { LayoutPage } from "../../components/LayoutPage";
import { Icon } from "../../components/IconComponent";
import { ButtonProps } from "./types";
import aboutImg from "./assets/about.webp";

const ChakraButton = ({ alt, children, ...rest }: ButtonProps) => (
  <IconButton
    aria-label={alt}
    icon={children}
    borderRadius="full"
    bg="white"
    boxShadow="md"
    _hover={{
      transform: "scale(1.5) rotate(-360deg) translateY(-1em)",
      boxShadow: "0 0 20px rgba(29,161,242,0.5)",
      transition: "transform 0.5s, box-shadow 0.5s",
    }}
    w="64px"
    h="64px"
    perspective="500px"
    {...rest}
  />
);

const About = () => {
  return (
    <LayoutPage>
      <TextField
        title="Sobre o FM Blog"
        paragraph="Este projeto consiste em um blog feito com React, salvando os dados no Firebase."
      />
      <Flex mt={4} gap={8} justify="center">
        <ChakraButton alt="Linkedin">
          <a
            href="https://www.linkedin.com/in/felipemelog/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              name="Linkedin"
              color="#0b65c2"
              width="64px"
              height="64px"
              _hover={{ transform: "scale(1.5)", transition: "transform 0.5s" }}
            />
          </a>
        </ChakraButton>
        <ChakraButton alt="Github">
          <a
            href="https://github.com/FelipeMeloGomes/FM-Blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              name="Github"
              color="#080808"
              width="64px"
              height="64px"
              _hover={{ transform: "scale(1.5)", transition: "transform 0.5s" }}
            />
          </a>
        </ChakraButton>
      </Flex>
      <Box mt={4} display="flex" justifyContent="center">
        <Image
          src={aboutImg}
          alt="Garoto mexendo no computador"
          loading="lazy"
          boxSize={{ base: "90%", md: "400px" }}
          objectFit="cover"
          className="animate-float"
        />
      </Box>
    </LayoutPage>
  );
};

export { About };
