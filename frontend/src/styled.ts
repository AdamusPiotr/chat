import styled from "styled-components";

interface ButtonProps { 
    readonly isAlignedToButton?: boolean;
}

export const Button = styled.button<ButtonProps>`
    position: relative;
    overflow: hidden;
    transition: background 400ms;
    color: #fff;
    background-color: #6200ee;
    padding: 1rem 2rem;
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    outline: 0;
    border: 0;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    cursor: pointer;

    ${props => {
        if(props.isAlignedToButton) {
            return `
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            `;
        }
    }}
`;

export const Input = styled.input`
    padding: 1rem 2rem;
    font-size: 1.5rem;
    background-color: white;
    border: 1px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;  
    margin-bottom: 10px; 
`;