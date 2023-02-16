import React from 'react';
import {
  ChakraProvider,
  Box,
  // Text,
  // Link,
  VStack,
  // Code,
  Grid,
  theme,
  // HStack,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import Body from './body';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Body/>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
