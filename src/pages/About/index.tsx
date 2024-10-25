import { Box, Flex, Image } from "@chakra-ui/react";
import { AboutButton } from "../../components/AboutButton";
import { LayoutPage } from "../../components/LayoutPage";
import { TextField } from "../../components/TextField";
import aboutImg from "./assets/about.webp";

const About = () => {
  return (
    <LayoutPage>
      <TextField
        title="Sobre o FM Blog"
        paragraph="Este projeto consiste em um blog feito com React, salvando os dados no Firebase."
      />
      <Flex mt={4} gap={8} justify="center">
        <AboutButton
          alt="LinkedIn"
          iconName="Linkedin"
          iconColor="#0b65c2"
          href="https://www.linkedin.com/in/felipemelog/"
        />
        <AboutButton
          alt="Github"
          iconName="Github"
          iconColor="#080808"
          href="https://github.com/FelipeMeloGomes/FM-Blog"
        />
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
