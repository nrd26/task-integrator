import { useToast } from "@chakra-ui/react";

function Toast(props) {
    const toast = useToast();
    console.log('toast triggered in frontend')
    return(
        toast({
            title: props.title,
            description: props.description,
            position:'top',
            status: 'success',
            duration: 9000,
            isClosable: true,
      })
    );
    
};

export default Toast;