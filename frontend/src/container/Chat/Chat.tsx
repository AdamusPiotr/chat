import { Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import ioClient from 'socket.io-client';
import { ChatMessage } from '../../components/Message/Message';
import { Message } from '../../interfaces/Message';
import { Button, Input } from '../../styled';
import * as Styles from './chat.styled';

const io = ioClient("http://localhost:3200");


const Chat: FC =  () => {
  const [messages, setMessages] = useState<Message[]>([{text: 'xD', timestamp: 'xDD'}])
  
  useEffect(() => {
      io.on('message', (message: string) => {
        setMessages((old) => [...old, {text: message}]);
      })
  }, [])

  const sendMessage = (message: string) => {
    io.emit('sendMessage', message, (error: string) => {
      console.log(error)
    });
  }
  
    return (
        <Styles.Container>
          <Styles.Title>Chat with Your collegues</Styles.Title>
          {messages.map((msg) => <ChatMessage message={msg} isYours/>)}
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

