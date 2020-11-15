import styled from 'styled-components';

interface MessageContainerProps {
    readonly isYourMessage?: boolean;
};

export const MessageContainer = styled.div<MessageContainerProps>`
    position: relative;
    border-radius: 18px;
    padding: 14px;
    color: white;
    font-size: 16px;
    min-width: 100px;
    background-color: ${props => props.isYourMessage ? 'fuchsia' : 'orange'};
    justify-self: ${props => props.isYourMessage ? 'flex-start' : 'flex-end'};
`