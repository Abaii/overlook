import { AddIcon } from "@chakra-ui/icons";
import {
	IconButton,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Box,
	Flex,
	FormControl,
	FormLabel,
	Image,
} from "@chakra-ui/react";
import { Formik, FormikProps, Form, FormikErrors } from "formik";
import React, { useEffect, useState, useRef } from "react";

interface Props {}

interface AddImageValues {
	files: any;
}

const AddImage = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [files, setFiles] = useState([]);

	const imageDetails = () => {
		console.log(files);

		// Finally clear the state of previously uploaded files
		setFiles(undefined);
	};

	const validate = ({ files }: AddImageValues) => {
		const errors: FormikErrors<AddImageValues> = {};

		// if (!files) {
		// 	errors.files = "You must upload an image to add it to this timeline!";
		// }

		return errors;
	};

	const handleImageChange = (event) => {
		const arrFiles = [...event.target.files];

		console.log(arrFiles);

		setFiles(arrFiles);
	};

	const initialValues = {
		files: [],
	};

	return (
		<Flex justify='center'>
			<IconButton
				icon={<AddIcon />}
				colorScheme='purple'
				rounded='full'
				aria-label='Add a new image button'
				onClick={onOpen}
			/>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<Formik initialValues={initialValues} onSubmit={imageDetails}>
						{({ handleSubmit }) => (
							<Form onSubmit={handleSubmit}>
								<ModalHeader>Add an Image</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<FormControl>
										<FormLabel>Image Upload</FormLabel>
										<Box rounded='lg' bg='gray.100' p={2}>
											<input onChange={handleImageChange} accept='image/*' type='file' multiple={true} />

											{/*    
								<Flex justify='center' align='center' mt={2} flexDirection='row' flexWrap='wrap'>
									{selectedImages &&
										selectedImages.map((image) => (
											<Image p={2} boxSize='50%' src={URL.createObjectURL(image)} />
										))}
								</Flex>

								{uploadedImage && (
									<Flex justify='center' align='center' mt={2}>
										<Image p={2} boxSize='50%' src={uploadedImage} />
									</Flex>
								)} */}
										</Box>
									</FormControl>
								</ModalBody>

								<ModalFooter>
									<Button colorScheme='blue' mr={3} onClick={onClose}>
										Close
									</Button>
									<Button variant='solid' colorScheme='green' type='submit'>
										Upload
									</Button>
								</ModalFooter>
							</Form>
						)}
					</Formik>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default AddImage;
