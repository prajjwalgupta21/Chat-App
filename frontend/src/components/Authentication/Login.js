import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Toast, VStack} from '@chakra-ui/react'
import React, { useState } from 'react'
import {useHistory} from 'react-router'
import axios from 'axios'
import { useToast } from "@chakra-ui/toast";
import { ChatState } from '../../Context/ChatProvider';

const Login = () => {
  const [show, setshow] = useState(false)
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [loading, setLoading] = useState(false)
  const toast=useToast()
  const history=useHistory()


  const handleClick= () => setshow(!show);

  const{setUser}=ChatState()

  const submitHandler=async()=>{
    setLoading(true)
    if(!email || !password){
      toast({
        title:"Please Fill all the Fields",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
      setLoading(false)
      return
    }
    try{
      const config={
        headers:{
          "Content-type":"application/json"
        }
      }
      const {data}=await axios.post(
        "/api/user/login",
        {email,password},
        config
        )
        toast({
          title:"Login Successful",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom"
        })
        setUser(data)
        localStorage.setItem("userInfo",JSON.stringify(data))
        setLoading(false)
        history.push("/chats")
    }catch (error){
      toast({
        title:"Error Occured!",
        description:error.response.data.message,
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
      setLoading(false)
    }
  }

  return (
    <VStack spacing='5px'>

      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
        placeholder='Enter Your Name'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
          type={show?'text':'password'}
          placeholder='Password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show?"Hide":"Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
      colorScheme='blue'
      width="100%"
      style={{marginTop:15}}
      onClick={submitHandler}
      isLoading={loading}
      >
        Login
      </Button>
      
      <Button
      variant="solid"
      colorScheme='red'
      width='100%'
      onClick={()=>{
        setEmail("guest@example.com");
        setPassword("123456");
      }}
      >
        Get Guest User Credentials
      </Button>

    </VStack>
  )
}

export default Login