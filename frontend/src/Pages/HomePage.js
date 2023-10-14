import { 
  Box,
  Center,
  Container,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const HomePage = () => {

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return <Container maxW='xl' centerContent>
    <Box
    d="flex"
    justifyContent="center"
    p={3}
    bg="white"
    w="100%"
    m="40px 0 15px 0"
    borderRadius="lg"
    borderWidth="1px"
    >
      <Text align="center" fontSize="4xl" fontFamily="Work Sans">CelestialChat</Text>
    </Box>
    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs variant='soft-rounded'>
        <TabList mb="1em">
          <Tab w="50%">Login</Tab>
          <Tab w="50%">Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel><Login/></TabPanel>
          <TabPanel><Signup/></TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </Container>
}

export default HomePage