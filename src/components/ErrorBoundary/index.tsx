import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, _errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container maxW="container.md" py={20}>
          <Box textAlign="center">
            <Heading as="h1" size="2xl" color="red.500" mb={4}>
              Oops!
            </Heading>
            <Text fontSize="xl" color="gray.600" mb={8}>
              Algo deu errado. Por favor, tente novamente.
            </Text>
            {this.state.error && (
              <Box
                bg="red.50"
                p={4}
                borderRadius="md"
                mb={8}
                textAlign="left"
                fontFamily="mono"
                fontSize="sm"
                whiteSpace="pre-wrap"
              >
                <Text color="red.600" fontWeight="bold" mb={2}>
                  Erro:
                </Text>
                <Text color="red.700">{this.state.error.message}</Text>
              </Box>
            )}
            <Box display="flex" gap={4} justifyContent="center">
              <Button onClick={this.handleReset} colorScheme="blue">
                Voltar para Home
              </Button>
              <Button as={Link} to="/" variant="outline">
                Página Inicial
              </Button>
            </Box>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}
