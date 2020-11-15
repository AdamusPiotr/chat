import React, { FC } from 'react'
import { Message } from '../../interfaces/Message'
import * as Styles from './message.styled'

interface Props { 
    message: Message
    isYours: boolean
}

export const ChatMessage : FC<Props> = ({message, isYours})  =>  {
    return (
        <Styles.MessageContainer isYourMessage={isYours}>
            {message.text}
        </Styles.MessageContainer>
    )
}

