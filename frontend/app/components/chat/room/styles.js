import React from 'react';
import styled from 'styled-components/native';

export const BubbleComp = styled.View`
    flex-direction: row;
    flex: 1;
    //background-color: black;
    //justify-content: ${(props) => props.position=="left"? 'flex-end':'flex-start'};
`;

export const TimeComp = styled.View`
    flex-direction: column;
    justify-content: flex-end;
    //background-color: blue;
`;