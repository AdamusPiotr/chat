import React, { FC } from 'react'
import { Message } from '../../interfaces/Message'
import * as Styles from './message.styled'

interface Props { 
    message: Message
    isYours?: boolean
}

export const ChatMessage : FC<Props> = ({message, isYours})  =>  {
    return (
        <Styles.MessageContainer isYourMessage={isYours}>
            <Styles.UserName>Piotr Adamus</Styles.UserName>
           <Styles.TimesStamp>{message.timestamp}</Styles.TimesStamp> - {message.text}
        </Styles.MessageContainer>
    )
}

