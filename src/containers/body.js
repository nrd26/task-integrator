import React, { useEffect }  from "react";
import {  Box, Spinner, VStack } from "@chakra-ui/react";
import TaskCard from "../components/taskCard";
import getRequestHandler from "../api/getRequestHandler";
import TaskDrawer from "../components/taskDrawer";

function Body() {
    let getTasks = [];

    //Tasks from get request are stored here
    const [tasks, setTasks] = React.useState(null)

    async function fetchData() {
      getTasks = await getRequestHandler();
      setTasks(getTasks);
    }

    //Loads all the data initially and checks for changes
    useEffect (()=>{
      fetchData();
      // eslint-disable-next-line
    },[tasks])

    
    if (tasks === null) {
      return <Spinner size='xl' />
    }
    else{
      const arrayDataItems = tasks.map((task) =>
      <TaskCard task={task}/>
      );
    return (
      <>
          <TaskDrawer/>
          <Box pt={'5'} alignItems={'flex-start'} w= '100%' justifyContent='space-between'>
            <VStack alignItems={'flex-start'}>
              {arrayDataItems}
            </VStack>
          </Box>
      
      </>
    );
    }
    
}

export default Body;
