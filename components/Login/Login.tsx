import React, { useState } from 'react';
import {
    Button,
    Flex,
    FormLabel,
    FormErrorMessage,
    FormHelperText, FormControl, Input
} from "@chakra-ui/core";
import { Formik, FormikErrors, FormikProps, FormikValues } from 'formik';
import styled from '@emotion/styled';

interface LoginValues {
    username: string;
    password: string;
};

interface LoginProps extends FormikProps<LoginValues> {

};

const initialValues = {
    username: '',
    password: ''
}

const validate = (values: any)=> {
    const errors: FormikErrors<LoginValues> = {}
    console.log(values)
    if (!values.username) {
        errors.username = 'You must enter a username';
    };

    if (!values.password) {
        errors.password = 'You must enter your password';
    };

    return errors;
};

const FormControlWrapper = styled.div`
    padding: 10px 0;
`

const Login = () => {
    return (
        <Formik 
            initialValues={initialValues}
            onSubmit={(values) => console.log(values)}
            validate={validate}
        >
            {( formikProps: FormikProps<LoginValues>) => (
                <form onSubmit={formikProps.handleSubmit}>
                    <FormControlWrapper>
                        <FormControl isInvalid={Boolean(formikProps.errors.username)}>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input type="text" id="username" aria-describedby="userame-helper-text" value={formikProps.values.username} onChange={(e) => formikProps.setFieldValue('username', e.target.value)} />
                            {formikProps.errors.username && <FormErrorMessage>{formikProps.errors.username} </FormErrorMessage>}
                        </FormControl>
                    </FormControlWrapper>
                    <FormControlWrapper>
                        <FormControl isInvalid={Boolean(formikProps.errors.password)}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input type="password" id="password" placeholder="Enter your password" value={formikProps.values.password} onChange={(e) => formikProps.setFieldValue('password', e.target.value)} />
                            {formikProps.errors.password && <FormErrorMessage>{formikProps.errors.password}</FormErrorMessage>}
                        </FormControl>
                    </FormControlWrapper>
                    <Button
                      isLoading={formikProps.isSubmitting}
                      variantColor="teal"
                      type="submit"
                    >
                        Log in
                    </Button>
                </form>
            )}
        </Formik>
        
    )
};
export default Login;