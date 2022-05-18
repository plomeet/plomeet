import React from 'react';
import { NoContentContainer, NoContentText } from './styles';

const NoContent = () => {
    return (
        <NoContentContainer>
            <NoContentText>채팅방이 존재하지 않습니다.</NoContentText>
        </NoContentContainer>
    )
};

export default NoContent;