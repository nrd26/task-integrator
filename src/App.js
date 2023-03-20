import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Heading,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './utils/ColorModeSwitcher';
import Body from './containers/body';


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
