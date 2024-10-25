import {
  Box,
  Spinner as ChakraSpinner,
  SpinnerProps,
  useBreakpointValue,
} from "@chakra-ui/react";

const Spinner = ({
  color = "blue.500",
  thickness = "4px",
  height = "100vh",
  width = "",
}: SpinnerProps) => {
  const size = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={height}
      width={width}
    >
      <ChakraSpinner size={size} color={color} thickness={thickness} />
    </Box>
  );
};

export { Spinner };
