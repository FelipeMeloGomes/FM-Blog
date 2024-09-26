import { ReactElement } from "react";
import { SunIcon } from "@chakra-ui/icons";
import { BiCloud, BiCloudDrizzle } from "react-icons/bi";
import { WiRain, WiSnow } from "react-icons/wi";
import { WeatherIconProps } from "./types";

export const WeatherIcon = ({ iconCode }: WeatherIconProps): ReactElement => {
  const weatherIconMap: Record<string, ReactElement> = {
    "01d": <SunIcon boxSize={30} />,
    "01n": <SunIcon boxSize={30} />,
    "02d": <BiCloud size={30} />,
    "02n": <BiCloud size={30} />,
    "03d": <BiCloudDrizzle size={30} />,
    "03n": <BiCloudDrizzle size={30} />,
    "04d": <BiCloudDrizzle size={30} />,
    "04n": <BiCloudDrizzle size={30} />,
    "09d": <WiRain size={30} />,
    "09n": <WiRain size={30} />,
    "10d": <WiRain size={30} />,
    "10n": <WiRain size={30} />,
    "13d": <WiSnow size={30} />,
    "13n": <WiSnow size={30} />,
  };

  const defaultIcon: ReactElement = <SunIcon boxSize={30} />;

  return weatherIconMap[iconCode] || defaultIcon;
};
