import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from "react-native";
import {
    BadgeComponent,
    BadgeImage,
    BadgeTitle
} from './styles'

const Badge = ( props ) => {
    const badge = props.badge;
    const margin = props.margin;
    const width = props.width;
    
    return(
        <BadgeComponent margin={margin} width={width}>
            {/* <BadgeImage source={{uri: badge.BadgeImage}}></BadgeImage> */}
            { badge.isOwned
            ?
            <BadgeImage source={{uri: badge.badgeImg}}></BadgeImage>
            :
            <View>
                <BadgeImage style={{ tintColor: 'lightgray' }} source={{uri: badge.badgeImg}}></BadgeImage>
                <BadgeImage style={{ position: 'absolute', opacity: 0.3 }} source={{uri: badge.badgeImg}}></BadgeImage>
            </View>
            }
            <BadgeTitle numberOfLines={1} ellipsizeMode="tail">{badge.badgeTitle}</BadgeTitle>
        </BadgeComponent>
    )
};

export default Badge;