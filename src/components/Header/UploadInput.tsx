import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  Input,
  Icon,
  Flex,
  Box,
  Spacer
} from '@chakra-ui/react'
import { useState } from 'react'
import { putVideos, db } from '../../firebase/initFirebase';
import { BiVideoPlus,  } from 'react-icons/bi';
export function UploadInput() {
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )


  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)
  const [link, setLink] = useState('');
  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
      >
        Adicione seu vídeo a plataforma
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent bg="dark.black">
          <ModalHeader>Cadastrar novo vídeo</ModalHeader>
          <ModalCloseButton />
          <ModalBody  >
          <Input bg="gray.600"value={link} variant='filled' placeholder='Cole o link do video aqui..' onChange={(e) => setLink(e.target.value)}/>
          </ModalBody>
          <ModalFooter justifyContent='space-between'  >
        
                
              <Button color="gray.100" _hover={{filter: 'brightness(.8)'}}bg="red.500"onClick={onClose}>Close</Button>
              

              <Button onClick={() => {
                putVideos(db, link)
                onClose()}} bg="none" variant="ghost" color="gray.100">
              <Text mr="2">Enviar video</Text><Icon as={BiVideoPlus} fontSize="20"/>
              </Button>
  
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}