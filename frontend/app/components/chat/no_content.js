import React from 'react';
import { NoContentContainer, NoContentText } from './styles';

const NoContent = ({content}) => {
    return (
        <NoContentContainer>
            <NoContentText>{content}이(가) 존재하지 않습니다.</NoContentText>
        </NoContentContainer>
    )
};

export default NoContent;