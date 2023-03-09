import React, { useEffect }  from "react";
import { Badge, Box, Button, ButtonGroup, Card, CardBody, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Input, Radio, RadioGroup, Spacer, Spinner, Text, useDisclosure, useToast, VStack, Wrap } from "@chakra-ui/react";
import {AddIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons'
import axios from "axios";

function Body() {
    const toast = useToast()

    // Drawer
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    //Tasks from get request are stored here
    const [tasks, setTasks] = React.useState(null)

    //Used to store task id for put requests
    const [taskId, setTaskId] = React.useState(null)

    //This is to differentiate between PUT and POST requests for the drawer
    const [exists, setExists] = React.useState(false)

    //This is used to post tasks
    const [task, setTask] = React.useState(null);
    const [platform, setPlatform] = React.useState(null);

    const getRequestHandler = async () => {
      await axios.get("http://localhost:5000/tasks",  { crossdomain: true }).then(response => {
        setTasks(response.data)
      });
    };

    const deleteRequestHandler = async (id) => {
      await axios.delete(`http://localhost:5000/tasks/${id}`).then(response => {
        if(response.status === 200) {
          toast({
            title: 'Task deleted.',
            description: `Your task was successfully deleted`,
            position:'top',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      });
    };

    const postRequestHandler = async () => {
      const data = { "task": task, "platform":platform };
     
      await axios.post("http://localhost:5000/tasks", data).then(response=>{
        if (response.status === 201) {
          toast({
            title: 'Task created.',
            description: `Your task was created in ${platform}`,
            status: 'success',
            position:'top',
            duration: 9000,
            isClosable: true,
          })
        }
      })
      
    };

    const putRequestHandler = async (id) => {
      const data = { "task": task, "platform":platform };
     
      await axios.put(`http://localhost:5000/tasks/${id}`, data).then(response => {
        console.log(response)
        if(response.status === 200) {
          toast({
            title: 'Task updated.',
            description: `Your task was successfully updated`,
            position:'top',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      });
    };

    //Loads all the data initially and checks for changes
    useEffect (()=>{
      getRequestHandler();
    },[tasks])

    
    if (tasks === null) {
      return <Spinner size='xl' />
    }
    else{
      const arrayDataItems = tasks.map((task) =>
      
        <Card w= '100%' boxShadow={'dark-lg'} variant={'elevated'}>
                      <CardBody>
                        <HStack>
                        <VStack alignItems={'start'}>
                          <Text>{task.task}</Text>
          
          <Badge>{task.platform}</Badge>
          </VStack>
          <Spacer/>
          <ButtonGroup variant={'solid'} spacing='6' float={'right'}>
  <Button colorScheme='blue' leftIcon={<EditIcon />} onClick={()=>{
    setExists(true)
    onOpen()
    setTaskId(task.id)
    setTask(task.task)
    setPlatform(task.platform)
    }}>Edit</Button>
  <Button colorScheme='red' id={task.id} leftIcon={<DeleteIcon/>}
  onClick={()=>{deleteRequestHandler(task.id)}}
  >Delete</Button>
</ButtonGroup>
</HStack>
        </CardBody>
        </Card>
      
      );
    return (
      <>
          <Button mt={'10'} alignSelf={'flex-end'} leftIcon={<AddIcon/>} colorScheme='green' onClick={()=>{
            setExists(false)
            setTask(null)
            setPlatform(null)
            onOpen()
            }}>New task</Button>
  
          
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
              <Input type="text"
              isRequired
              value={task}
              onChange={(e) => setTask(e.target.value)} 
              placeholder='Type here...' />
              <Spacer/><Spacer/>
              <Text as={'b'} fontSize={"xl"} alignSelf={'initial'}>Save my task on</Text>
              <Spacer/><Spacer/>
              <RadioGroup isDisabled={
                exists?
                true
                :false
              } isRequired onChange={(e)=>{setPlatform(e)}} value={platform}>
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
              <Button onClick={()=>{
                exists?
                putRequestHandler(taskId):
                postRequestHandler()
                }} colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
    }
    
}

export default Body;
