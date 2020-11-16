import { Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ioClient from 'socket.io-client';
import { ChatMessage } from '../../components/Message/Message';
import { Message } from '../../interfaces/Message';
import { Button, Input } from '../../styled';
import * as Styles from './chat.styled';


const io = ioClient("http://localhost:3200");

interface QueryParams {
  username: string;
  room: string;
}

const Chat: FC =  () => {
  const [messages, setMessages] = useState<Message[]>([])


  const chatDetails = useParams<QueryParams>();
  
  useEffect(() => {
      io.on('message', (message: Message) => {
        console.log(message)
        setMessages((old) => [...old, message]);
      })

      io.emit('join', chatDetails, (error: string) => {
        toast.error(error)
      })

  }, [])

  const sendMessage = (message: string) => {
    io.emit('sendMessage', message, (error: string) => {
      if(error) {
       return toast.error(error)
      }

      console.log('succcess')
    });
  }
  
    return (
        <Styles.Container>
          <ToastContainer 
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Styles.Title>Chat with Your collegues</Styles.Title>
          {messages.map((msg) => <ChatMessage message={msg} isYours key={msg.text + msg.timestamp}/>)}
          <Styles.Form >
            <Formik initialValues={{message: ''}} onSubmit={(values) => {
              sendMessage(values.message)
            }}>
              {({values, handleBlur, handleChange}) => 
                <Form>
                  <Input name="message" onChange={handleChange} onBlur={handleBlur} type="text"/>
                  <Button type="submit">Send</Button>
                </Form>
              }
            </Formik>
          </Styles.Form>          
          
        </Styles.Container>
    )
}

export {
  Chat
};

