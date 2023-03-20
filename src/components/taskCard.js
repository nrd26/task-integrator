import React from "react";
import { Badge, Button, ButtonGroup, Card, CardBody, HStack, Spacer, VStack, Editable, EditableInput, EditablePreview, useEditableControls, Input, useToast} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from '@chakra-ui/icons'
import deleteRequestHandler from "../api/deleteRequestHandler";
import putRequestHandler from "../api/putRequestHandler";


function TaskCard(props) {
  const toast = useToast();
  const [editTask, setEditTask] = React.useState(props.task.task);
  function EditableControls() {
    const {
      isEditing,
      getEditButtonProps,
    } = useEditableControls()

    return  (
        <ButtonGroup variant={'solid'} spacing='3' float={'right'}>
        <Button isDisabled={isEditing} leftIcon={<EditIcon />} {...getEditButtonProps()}>Edit</Button>
        <Button isDisabled={isEditing} colorScheme='red' id={props.task.id} leftIcon={<DeleteIcon/>}
              onClick={()=>{
                deleteRequestHandler(props.task.id, props.task.platform)
                toast({
                  title: 'Success',
                  description: `Task '${props.task.task}' was successfully deleted`,
                  position:'top',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
            })
            setTimeout(() => {
              window.location.reload()
            }, 1500);
            
              }}
              >Delete</Button>
        </ButtonGroup>
    )
  }

    return (
        <Card w= '100%' boxShadow={'dark-lg'} variant={'elevated'} key={props.task.id}>
                      <CardBody>
                      <Editable
                          defaultValue={props.task.task}
                          isPreviewFocusable={false}
                          onChange={(e)=>{setEditTask(e)}}
                          onSubmit={async()=>{
                            const res = await putRequestHandler(props.task.id, editTask, props.task.platform);
                            console.log(res)
                            toast({
                              title: 'Success',
                              description: `Task was successfully edited`,
                              position:'top',
                              status: 'success',
                              duration: 9000,
                              isClosable: true,
                        })
                          }}
                        >
                        <HStack>
                        <VStack alignItems={'start'}>
                        
                            <EditablePreview />
                          <Input as={EditableInput} />
          <Badge>{props.task.platform}</Badge>
          </VStack>
          <Spacer/>
          <EditableControls />
        </HStack>
        </Editable>
        </CardBody>
        </Card>
    );
    
}

export default TaskCard;
