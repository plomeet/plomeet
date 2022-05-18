import styled from 'styled-components/native'

export const color = {
    primary: '#1BE58D',
    primaryLight: '#D5FF7C',
    primaryBlue: '#12D3DD',
    primaryDark: '#303644',
    white: '#ffffff',
    black: '#000000',
    blackFont: '#040404',
    blackLightFont: '#292D32',
    greyFont: '#7A7A7A',
    redBadge: '#FF5442',
};

export const Container = styled.View`
    flex: 1;
    background-color: ${color.white};
`;

//no_content
export const NoContentContainer = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${color.white};
`;

export const NoContentText = styled.Text`
    font-size: 13px;
    color: ${color.greyFont};
`;