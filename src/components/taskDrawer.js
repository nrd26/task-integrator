import React from "react";
import {AddIcon} from '@chakra-ui/icons'
import { Badge, Button,  Card, CardBody, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Radio, RadioGroup, Spacer, Text, useDisclosure, useToast, VStack, Wrap } from "@chakra-ui/react";
import postRequestHandler from "../api/postRequestHandler";

function TaskDrawer() {
    const toast = useToast();

    // Drawer
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    //This is used to post tasks
    const [task, setTask] = React.useState('Create a new task');
    const [platform, setPlatform] = React.useState('Cubyts');

    const isError = task === ''

    return (
      <>
      <Button mt={'10'} ref={btnRef} alignSelf={'flex-end'} leftIcon={<AddIcon/>} colorScheme='green' onClick={()=>{
            setTask('Create a new task')
            setPlatform('Cubyts')
            onOpen()
            }
            }>New task</Button>
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

              <Input
              value={task}
              onChange={(e) => setTask(e.target.value)} 
              placeholder='Type here...' />
              {
                isError?
                <Badge colorScheme={'red'}>Task name is required</Badge>:
                null
              }

              <Spacer/><Spacer/>
              <Text as={'b'} fontSize={"xl"} alignSelf={'initial'}>Save my task on</Text>
              <Spacer/><Spacer/>
              <RadioGroup 
              onChange={(e)=>{setPlatform(e)}} value={platform}>
                  <Wrap px={'25px'} pb={'20'} pt={'2'}>
  
                  <Card w= '100%' boxShadow={'dark-lg'} variant={'elevated'}>
                          <CardBody>
                  <Radio value='Cubyts'>Cubyts</Radio>
                  </CardBody>
                  </Card>
                  
                  <Card w= '100%' boxShadow={'dark-lg'} variant={'elevated'}>
                  <CardBody>
                  <Radio value='Jira'>Jira</Radio>
                  </CardBody>
                  </Card>
  
                  <Card w= '100%' boxShadow={'dark-lg'} variant={'elevated'}>
                  <CardBody>
                  <Radio value='Asana'>Asana</Radio>
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
              <Button isDisabled={isError} onClick={()=>{
                postRequestHandler(task, platform)
                toast({
                  title: 'New task created',
                  description: `'${task}' created on ${platform}`,
                  position:'top',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
            })
            setTimeout(() => {
              window.location.reload()
            }, 1500);
                }} colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        </>
    );
    
}

export default TaskDrawer;
