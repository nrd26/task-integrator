import React, { useEffect }  from "react";
import { Box, Button, Card, CardBody, Center, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, HStack, Input, Radio, RadioGroup, Spacer, Text, useDisclosure, VStack, Wrap } from "@chakra-ui/react";
import {AddIcon, DeleteIcon} from '@chakra-ui/icons'
import axios from "axios";

function Body() {
    // Drawer
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    // var arrayDataItems = []

    // Radio
    const [value, setValue] = React.useState('1')
    //Tasks
    const [tasks, setTasks] = React.useState(null)

    useEffect (()=>{
      axios.get("http://localhost:5000/tasks",  { crossdomain: true }).then(response => {
        setTasks(response.data)
        // console.log(response.data)
      });
    })

    
    if (tasks === null) {
      return <Text>Loading</Text>
    }
    else{
      const arrayDataItems = tasks.map((task) =>
      
        <Card w= '100%' boxShadow={'dark-lg'} variant={'elevated'} onClick={onOpen}>
                      <CardBody>
        {/* <li> */}
          {task.name.toString()}
          {/* </li> */}
        </CardBody>
        </Card>
      
      );
    return (
      <>
          <Button mt={'10'} alignSelf={'flex-end'} leftIcon={<AddIcon/>} colorScheme='green' onClick={
            onOpen
            }>New task</Button>
  
          
          <Box pt={'5'} alignItems={'flex-start'} w= '100%' justifyContent='space-between'>
            <VStack alignItems={'flex-start'}>
              {arrayDataItems}
  
                  </VStack>
      </Box>
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
                  <Wrap px={'25px'} pb={'20'} pt={'2'}>
  
                      <Card w= '100%' boxShadow={'dark-lg'} variant={'elevated'}>
                          <CardBody>
                  <Radio value='1'>Cubyts</Radio>
                  </CardBody>
                  </Card>
                  
                  <Card w= '100%' boxShadow={'dark-lg'} variant={'elevated'}>
                  <CardBody>
                  <Radio value='2'>Jira</Radio>
                  </CardBody>
                  </Card>
  
                  <Card w= '100%' boxShadow={'dark-lg'} variant={'elevated'}>
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
      </>
    );
    }
    
}

export default Body;
