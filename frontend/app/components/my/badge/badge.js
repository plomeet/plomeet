import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from "react-native";
import {
    BadgeComponent,
    BadgeImage,
    BadgeTitle
} from './styles'

const Badge = ( props ) => {
    const badge = props.badge;
    
    return(
        <BadgeComponent>
            {/* <BadgeImage source={{uri: badge.BadgeImage}}></BadgeImage> */}
            { badge.isOwned
            ?
            <BadgeImage source={{uri: "https://plomeet-image.s3.ap-northeast-2.amazonaws.com/ploggingLog/1/55/rn_image_picker_lib_temp_780fa994-a969-4fc4-ab06-73528d252b26.jpg"}}></BadgeImage>
            :
            <View>
                <BadgeImage style={{ tintColor: 'gray' }} source={{uri: "https://plomeet-image.s3.ap-northeast-2.amazonaws.com/ploggingLog/1/55/rn_image_picker_lib_temp_780fa994-a969-4fc4-ab06-73528d252b26.jpg"}}></BadgeImage>
                <BadgeImage style={{ position: 'absolute', opacity: 0.3 }} source={{uri: "https://plomeet-image.s3.ap-northeast-2.amazonaws.com/ploggingLog/1/55/rn_image_picker_lib_temp_780fa994-a969-4fc4-ab06-73528d252b26.jpg"}}></BadgeImage>
            </View>
            }
            <BadgeTitle numberOfLines={1} ellipsizeMode="tail">{badge.badgeTitle}</BadgeTitle>
        </BadgeComponent>
    )
};

export default Badge;