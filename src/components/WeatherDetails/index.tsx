import { Box, Flex, Text } from "@chakra-ui/react";
import { WiHumidity, WiWindy } from "react-icons/wi";
import { WeatherIcon } from "../WeatherIcon";
import { WeatherDetailsProps } from "./types";

export const WeatherDetails = ({
  climaData,
  iconCode,
}: WeatherDetailsProps) => {
  return (
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
          <WeatherIcon iconCode={iconCode} />
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
  );
};
