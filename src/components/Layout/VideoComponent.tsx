import { Box, Image, Avatar, Flex, Text, Center, AspectRatio} from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function VideoCard({item}: any){
  console.log(item)
  return (
    <Box>
      
    <AspectRatio maxW='480px' ratio={16/9}>
      <iframe title='naruto' src={`https://www.youtube.com/embed/${item.videoId}`} allowFullScreen>
      </iframe>
    </AspectRatio>

    </Box>
    // <Box >
    //   <Image src={item.thumb} alt="temp"/>
    //   <Flex>
    //   <Box p="2">
    //   <Avatar src={item.authorAvatar} name="Victor Hugo" size="md" />
    //    </Box>
    //    <Box w="100%" p="3">
    //      <Center>
           
    //      <Text color="white" textAlign="center" fontSize="md">{item.title}</Text>
    //      </Center>
    //      <Text color="text" fontSize="sm">{item.authorName}</Text>
    //      <Text color="text" fontSize="sm">Descriçao detlhada</Text>
    //      <Text color="text" fontSize="small">{`${item.views} views - ${dayjs(item.updateAt).fromNow()}`}</Text>
    //    </Box>
    //   </Flex>
  
    // </Box>
  )
}



// display={{'-webkit-box', '-webkit-line-clamp': 2, '-web-kit-box-orient': 'vertical', overflow: 'hidden'}}