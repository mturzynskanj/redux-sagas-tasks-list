import React from 'react'
import styled from 'styled-components'

let Error = styled.div`
    border: 1px solid red;
    border-radius: 3px;
    background-color: rgba(255,0,0, .3);
    text-align: center;
    color: red;
`;

export default function FlashMessage(props) {
    return (
        <Error>
            {props.message}
        </Error>
    )
}

Error.defaultProps = {
    message: 'An error occured...'
};