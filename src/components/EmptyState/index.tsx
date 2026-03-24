import { Box, Button, Center, Heading, Text, VStack } from "@chakra-ui/react";

export interface EmptyStateProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
  return (
    <Center minH="400px">
      <VStack spacing={4} textAlign="center" maxW="320px">
        <Box p={6} bg="bg.secondary" borderRadius="full">
          <Box boxSize={10} color="text.secondary">
            {icon}
          </Box>
        </Box>
        <Heading size="md" color="text.primary">
          {title}
        </Heading>
        <Text color="text.secondary" fontSize="sm">
          {description}
        </Text>
        {action && (
          <Button variant="solid" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </VStack>
    </Center>
  );
};

export { EmptyState };
