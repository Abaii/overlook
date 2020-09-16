import React from 'react';
import {
    Button, 
    Flex, 
    FormLabel,
    FormErrorMessage,
    FormHelperText, 
} from "@chakra-ui/core";

const Registration = (props) => {
    return (
       <>
            <Button>{props.buttonText}</Button>
            <Button>{props.secondaryButtonText}</Button>
            <Button>{props.example}</Button>
       </>
    )
};
export default Registration;