import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

let ModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255, 0.5);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;

       > div {
            max-width: 300px;
            height: 200px;
            padding: 20px;
            border: 1px solid #fff;
            background-color: rgb(255,255,255);
            border: 1px solid #666;
            display: flex;
            flex-direction:column;
            justify-content:space-between;
        }
`;

let Button = styled.button`
        border-radius: 4px;
        padding: 8px;
        color: #fff;
        background: ${props => props.negative ? '#666' : 'green'}
`;

export const ConfirmModal = (props) => {
    return (
        <ModalWrapper>
            <div>
                <p>Are you sure that you want to delete this task???</p>
                <p>
                    <Button negative onClick={props.onCancel}>Cancel</Button> <Button onClick={props.onContinue}>Procced with detetion</Button>
                </p>
            </div>
        </ModalWrapper>
    )
};

ConfirmModal.propTypes = {
    onCancel: PropTypes.func,
    onContinue: PropTypes.func
}


