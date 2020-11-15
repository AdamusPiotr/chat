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
    margin: ${props => props.isYourMessage ? '.4rem auto .4rem .4rem' : '.4rem .4rem .4rem auto'};
`

export const UserName = styled.div`
    color: lightgray;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 8px;
`

export const TimesStamp = styled.span`
    color: #efefef;
    font-size: 12px;
`