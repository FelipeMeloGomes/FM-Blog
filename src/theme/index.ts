import { type ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

export const theme = extendTheme(config, {
  fonts: {
    heading: "'Georgia', 'Times New Roman', serif",
    body: "'Inter', system-ui, sans-serif",
  },
  colors: {
    brand: {
      50: "#f7f7f7",
      100: "#e1e1e1",
      500: "#4a4a4a",
      900: "#111111",
    },
  },
  semanticTokens: {
    colors: {
      "bg.primary": { default: "white", _dark: "gray.900" },
      "bg.secondary": { default: "gray.50", _dark: "gray.800" },
      "bg.tertiary": { default: "gray.100", _dark: "gray.700" },
      "text.primary": { default: "gray.900", _dark: "white" },
      "text.secondary": { default: "gray.600", _dark: "gray.400" },
      "text.muted": { default: "gray.500", _dark: "gray.500" },
      "text.tertiary": { default: "gray.400", _dark: "gray.600" },
      "border.subtle": { default: "gray.100", _dark: "gray.700" },
      "border.default": { default: "gray.200", _dark: "gray.600" },
      "border.hover": { default: "gray.300", _dark: "gray.500" },
    },
  },
  styles: {
    global: {
      body: {
        bg: "bg.primary",
        color: "text.primary",
      },
    },
  },
  components: {
    Button: {
      defaultProps: { colorScheme: "gray" },
      baseStyle: {
        _focus: { boxShadow: "none" },
      },
      variants: {
        solid: {
          bg: "text.primary",
          color: "bg.primary",
          _hover: { bg: "gray.700", _dark: { bg: "gray.300" } },
          borderRadius: "sm",
        },
        outline: {
          borderColor: "border.default",
          color: "text.secondary",
          _hover: { bg: "bg.secondary", borderColor: "border.hover" },
          borderRadius: "sm",
        },
        ghost: {
          color: "text.secondary",
          _hover: { bg: "bg.secondary" },
        },
      },
    },
    Input: {
      defaultProps: { focusBorderColor: "text.primary" },
      variants: {
        outline: {
          field: {
            borderColor: "border.default",
            borderRadius: "sm",
            bg: "bg.primary",
            _hover: { borderColor: "border.hover" },
            _focus: { borderColor: "text.primary", boxShadow: "none" },
          },
        },
      },
    },
    Textarea: {
      defaultProps: { focusBorderColor: "text.primary" },
      variants: {
        outline: {
          borderColor: "border.default",
          borderRadius: "sm",
          bg: "bg.primary",
          _hover: { borderColor: "border.hover" },
          _focus: { borderColor: "text.primary", boxShadow: "none" },
        },
      },
    },
    Link: {
      baseStyle: {
        color: "text.secondary",
        _hover: { textDecoration: "none", color: "text.primary" },
      },
    },
    Badge: {
      baseStyle: {
        fontSize: "xs",
        textTransform: "uppercase",
        letterSpacing: "wider",
        fontWeight: "medium",
        borderRadius: "sm",
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: "md",
          border: "1px solid",
          borderColor: "border.subtle",
          overflow: "hidden",
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          borderColor: "border.subtle",
          boxShadow: "sm",
        },
        item: {
          _hover: { bg: "bg.secondary" },
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: "border.subtle",
      },
    },
    Skeleton: {
      baseStyle: {
        startColor: "bg.secondary",
        endColor: "border.subtle",
      },
    },
  },
});
