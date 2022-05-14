import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import Badge from './badge';
import BadgeBottomSheet from './badge_bottom';
import {
    BadgesContainer,
    BadgeComponentTouchchable
} from "./styles"
import axios from "axios";



const axiosLocal = axios.create({
    baseURL: 'http://10.0.2.2:8000',
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});


const BadgeList = () => {
    const userId = 1;
    const [badges, setBadges] = useState([]);
    const [badgeSelete, setBadgeSelete] = useState();
    const [ modalVisible, setModalVisible ] = useState(false);

    const renderBadges = ({ item }) => {
        return(
            <BadgeComponentTouchchable onPress={() => _handleBadgePress({badge: item})}>
                <Badge badge={item}></Badge>
            </BadgeComponentTouchchable>
        )
    }

    const _handleBadgePress = ({badge}) => {
        setModalVisible(true);
        setBadgeSelete(badge);
    }

    useEffect(() => {
        const getBadges = async() => {
            try {
                await axiosLocal.get(`/badges/${userId}`)
                    .then((response) => {
                        if (response.status === 200) {
                            setBadges(response.data);
                        } else {
                            console.log("error");
                        }
                    })
                    .catch((response) => { console.log(response); });
            } catch (err) { console.log(err); }
        }
        getBadges();
    }, []);


    return (
        <BadgesContainer style={{ flex: 1, alignItems: 'center'}}>
            <FlatList 
                data={badges}
                renderItem={renderBadges}
                keyExtractor={item => item.badgeId}
                numColumns={3} 
                >
            </FlatList>
            <BadgeBottomSheet
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                badge={badgeSelete}
            />
        </BadgesContainer>
    )
};

export default BadgeList;