import { Flex, Input, Icon, Button } from '@chakra-ui/react';
import { BiVideoPlus,  } from 'react-icons/bi';
import { putVideos, db } from '../../firebase/initFirebase';
import { SearchBox } from './SearchBox';

import { useState } from 'react';

export function UploadButton(){
  const [link, setLink] = useState('');
  return (
    <>
    <Flex>
      
      <Input bg="gray.600"value={link} onChange={(e) => setLink(e.target.value)}/>

      <Flex align="center" ml="auto">

          <Button onClick={() => putVideos(db, link)} bg="none" variant="link" color="gray.100">
            <Icon as={BiVideoPlus} fontSize="20"/>
          </Button>

      </Flex>
    </Flex>
    </>
  )
}