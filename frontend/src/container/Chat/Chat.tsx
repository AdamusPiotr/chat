import { Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import ioClient from 'socket.io-client';
import { ChatMessage } from '../../components/Message/Message';
import { Message } from '../../interfaces/Message';
import { Button, Input } from '../../styled';
import * as Styles from './chat.styled';

const io = ioClient("http://localhost:3200");

interface FormikValues {
  message: string
};

const Chat: FC =  () => {
  const [messages, setMessages] = useState<Message[]>([{text: 'xD', timestamp: 'xDD'}])
  
  useEffect(() => {
      io.on('message', (message: Message) => {
        setMessages((old) => [...old, message]);
      })
  }, [])

  const sendMessage = ({message}: FormikValues) => {
    console.log(message)
    io.emit('sendMessage', message, (error: string) => {
      console.log(error)
    });
  }
  
    return (
        <Styles.Container>
          {messages.map((msg) => <ChatMessage message={msg} isYours/>)}
          <Formik initialValues={{message: ''}} onSubmit={(values) => {
            sendMessage(values)
          }}>
            {({values, handleBlur, handleChange}) => 
              <Form>
                <Input name="message" onChange={handleChange} onBlur={handleBlur} type="text"/>
                <Button type="submit">Send</Button>
              </Form>
            }
          </Formik>
        </Styles.Container>
    )
}

export {
  Chat
};

