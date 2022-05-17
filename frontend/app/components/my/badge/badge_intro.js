import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Badge from './badge';
import Icon from 'react-native-vector-icons/Entypo';
import { ScrollView, Text, View } from "react-native";
import { color } from "../styles"
import {
    BadgesContainer,
    BadgeContainerTitleLine,
    BadgeContainerTitle,
    BadgeMoreComponent,
    BadgeMoreText
} from "./styles";
import axiosInstance from '../../../../utils/API';
import { useSelector } from 'react-redux';


const BadgeIntro = () => {
    const navigation = useNavigation();
    const userId = useSelector(state => state.userId);
    const [badges, setBadges] = useState([]);

    const _handleBadgeMorePress = () => {
        navigation.navigate('BadgeList');
    }

    useEffect(() => {
        const getBadges = async() => {
            try {
                await axiosInstance.get(`/badges/${userId}`)
                    .then((response) => {
                        if (response.status === 200) {
                            setBadges(response.data.slice(0, 5));
                        } else {
                            console.log("error");
                        }
                    })
                    .catch((response) => { console.log(response); });
            } catch (err) { console.log(err); }
        }
        getBadges();
    }, []);

    return(
        <BadgesContainer>
            <BadgeContainerTitleLine>
                <BadgeContainerTitle>배지</BadgeContainerTitle>
                <BadgeMoreComponent onPress={_handleBadgeMorePress}>
                    <BadgeMoreText>더보기</BadgeMoreText>
                    <Icon name="chevron-thin-right" size={13} color={color.black} style={{marginLeft: 5, marginTop: 2}}/>
                </BadgeMoreComponent>
            </BadgeContainerTitleLine>
            <ScrollView horizontal={true}>
                {   
                    badges.map((badge, idx) => (
                        <Badge key={badge.badgeId} badge={badge}></Badge>
                    ))
                }
                <Icon name="dots-three-horizontal" size={20} color={color.primaryDark} style={{alignSelf: 'center', marginLeft: 20, marginRight: 20}}/>
            </ScrollView>
        </BadgesContainer>
    )
};

export default BadgeIntro;