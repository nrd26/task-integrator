import React  from "react";
import { Button, Card, CardBody, Center, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Input, Radio, RadioGroup, Spacer, Text, useDisclosure, VStack, Wrap } from "@chakra-ui/react";
import {AddIcon, DeleteIcon} from '@chakra-ui/icons'

function Body() {
    // Drawer
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    // Radio
    const [value, setValue] = React.useState('1')
  return (
    <Container>
        <HStack float={'right'}>
        <Button leftIcon={<AddIcon/>} colorScheme='green' onClick={onOpen}>New task</Button>
        <Button isDisabled leftIcon={<DeleteIcon/>} colorScheme='red'>Delete</Button>
        </HStack>
        <VStack alignItems={'flex-start'}>
        <Card>
            <CardBody>
            Complete Cubyts Integration
            </CardBody>
            </Card>

            <Card>
            <CardBody>
            Complete Jira Integration
            </CardBody>
            </Card>

            <Card>
            <CardBody>
            Complete Asana Integration
            </CardBody>
            </Card>
            </VStack>
        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>I want to...........</DrawerHeader>

          <DrawerBody>
            <VStack alignItems={'flex-start'}>
            <Input placeholder='Type here...' />
            <Spacer/><Spacer/>
            <Text as={'b'} fontSize={"xl"} alignSelf={'initial'}>Save my task on</Text>
            <Spacer/><Spacer/>
            <RadioGroup onChange={setValue} value={value}>
                <Wrap pl={'30px'} pb={'50px'} alignSelf={'center'}>

                    <Card boxShadow={'dark-lg'} variant={'elevated'}>
                        <CardBody>
                <Radio value='1'>Cubyts</Radio>
                </CardBody>
                </Card>
                
                <Card boxShadow={'dark-lg'} variant={'elevated'}>
                <CardBody>
                <Radio value='2'>Jira</Radio>
                </CardBody>
                </Card>

                <Card boxShadow={'dark-lg'} variant={'elevated'}>
                <CardBody>
                <Radio value='3'>Asana</Radio>
                </CardBody>
                </Card>
                </Wrap>
    </RadioGroup>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

export default Body;
