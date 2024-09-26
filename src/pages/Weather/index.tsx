import { useEffect } from "react";
import { useWeatherData } from "../../hooks/useWeatherData";
import { useCitySearch } from "../../hooks/useCitySearch";
import { TextField } from "../../components/TextField";
import { Spinner } from "../../components/Spinner";
import { LayoutPage } from "../../components/LayoutPage";
import { Box, Flex, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { WeatherDetails } from "../../components/WeatherDetails";

const Weather = () => {
  const { isLoading, climaData, fetchData, iconCode } = useWeatherData();
  const { city, setCity, showDetails, handleKeyDown, search } =
    useCitySearch(fetchData);

  useEffect(() => {
    search();
  }, []);

  return (
    <LayoutPage height="auto">
      <>
        <TextField title="Confira o clima de sua cidade!" />
      </>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        maxW="600px"
        p={6}
        mx={{ base: 4, md: "auto" }}
        mt="auto"
        mb="auto"
        borderRadius="xl"
        bg="black"
      >
        <Flex justify="center" align="center" gap={3} pt={16} mb={5}>
          <Input
            type="text"
            placeholder="Digite uma cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            bg="#ebfffc"
            border="none"
            borderRadius="full"
            color="#626262"
            fontSize="2xl"
            fontWeight="normal"
            paddingLeft="10"
            height="78px"
            width="80%"
            maxWidth="full"
            _placeholder={{ color: "inherit" }}
            _focus={{ borderColor: "none", boxShadow: "none" }}
            sx={{
              "@media (max-width: 48em)": {
                width: "75%",
              },
            }}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="78px"
            height="78px"
            backgroundColor="white"
            borderRadius="full"
            color="black"
            cursor="pointer"
            _hover={{
              backgroundColor: "black",
              color: "white",
            }}
            transition="background-color 0.3s ease"
            onClick={search}
          >
            <SearchIcon boxSize={30} />
          </Box>
        </Flex>

        {isLoading && <Spinner />}

        {showDetails && !isLoading && (
          <WeatherDetails climaData={climaData} iconCode={iconCode} />
        )}
      </Box>
    </LayoutPage>
  );
};

export { Weather };
