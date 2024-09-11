import { useEffect } from "react";
import { useWeatherData } from "../../hooks/useWeatherData";
import { useCitySearch } from "../../hooks/useCitySearch";
import { TextField } from "../../components/TextField";
import { Spinner } from "../../components/Spinner";
import { LayoutPage } from "../../components/LayoutPage";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { WiHumidity, WiWindy } from "react-icons/wi";

const Weather = () => {
  const { isLoading, climaData, fetchData, wicon } = useWeatherData();
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
        mx="auto"
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
          <>
            <Box>
              <Text
                color="white"
                fontSize="4xl"
                fontWeight="normal"
                textAlign="center"
                mt={5}
              >
                {climaData.location}
              </Text>

              <Flex
                p={4}
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                gap={8}
              >
                <Text
                  color="white"
                  fontSize="4xl"
                  display="flex"
                  justifyContent="center"
                >
                  {wicon}
                </Text>
                <Text color="white" fontSize="4xl" fontWeight="normal">
                  {climaData.temperature !== ""
                    ? climaData.temperature.toString().substring(0, 2)
                    : ""}
                  °C
                </Text>
              </Flex>

              <Flex mt={5} color="white" justifyContent="center" gap={10}>
                <Flex alignItems="center" justifyContent="center" gap={3}>
                  <WiHumidity name="Humidity" size={30} />
                  <Box textAlign="center">
                    <Text fontSize="3xl" fontWeight="normal">
                      {climaData.humidity}%
                    </Text>
                    <Text fontSize="xs" fontWeight="normal">
                      Humidade
                    </Text>
                  </Box>
                </Flex>

                <Flex alignItems="center" justifyContent="center" gap={3}>
                  <WiWindy name="Windy" size={30} />
                  <Box textAlign="center">
                    <Text fontSize="3xl" fontWeight="normal">
                      {climaData.wind} km/h
                    </Text>
                    <Text fontSize="xs" fontWeight="normal">
                      Velocidade do vento
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </>
        )}
      </Box>
    </LayoutPage>
  );
};

export { Weather };
