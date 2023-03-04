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
  HStack,
  Heading,
  Flex,
  Spacer,
  // HStack,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
// import { Logo } from './Logo';
import Body from './body';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box  px={'5'}  textAlign="start" fontSize="md">
        <Grid w= '100%' p={3}>
        <Flex>
        <Heading>
              Cubyts
            </Heading>
          <Spacer />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
          <VStack spacing={8}>
            <Body/>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
