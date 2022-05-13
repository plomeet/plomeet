import React, { useEffect, useRef, useState, Component, Node, Button, useLayoutEffect } from 'react';
import 'react-native-gesture-handler';
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import Config from 'react-native-config'
import AWS from 'aws-sdk';
import styled from "styled-components/native";    
import { FlatList } from 'react-native-gesture-handler';

var albumBucketName = "plomeet-image";
const DeviceWidth = Dimensions.get('window').width

const DetailPhotos = ({ userId, plogId }) => {

    const [imageSource, setImageSource] = useState([]);
    const nextId = useRef(1);

    var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: albumBucketName }
    });

    AWS.config.update({
        region: 'ap-northeast-2', // 리전이 서울이면 이거랑 같게
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: Config.IDENTITYPOOLID,
        })
    })

    useEffect(() => { 
        var albumPhotosKey = "ploggingLog/" + userId + '/' + plogId + '/'
        setImageSource([]);
        s3.listObjects({ Prefix: albumPhotosKey }, function(err, data) {
            if (err) {
                return alert('There was an error viewing your album: ' + err.message);
            }

            var href = this.request.httpRequest.endpoint.href;
            var bucketUrl = href + albumBucketName + "/";
        
            const photos = data.Contents.map((photo) => {
                var photoKey = photo.Key;
                var photoUrl = bucketUrl + encodeURIComponent(photoKey);
                const photoInfo = { index: nextId.current, url: photoUrl };
                setImageSource(imageSource => [...imageSource, photoInfo]);
                nextId.current++;
            })            
        })
    }, [])

    useEffect(() => { 
        console.log(imageSource);
    }, [imageSource])

    const renderItem = ({ item }) => { 
        return (
            <View>
                <Photo style={{ width: DeviceWidth * 0.3, height: DeviceWidth * 0.3, marginBottom: 1 }} source={{ uri: item.url }} />
            </View>
        )
    }
    return (
        <FlatList data={imageSource} renderItem={renderItem} keyExtractor={(item)=> String(item.index)} style={style.pictureContainer} numColumns={3} horizontal={false}>
        </FlatList>
    );
}

const style = StyleSheet.create({
    pictureContainer: {
        backgroundColor: "white",
    },

})
const Photo = styled.Image`
    margin-top: 10px;
    margin-left: 10px; 
    background-color: #C4C4C4;
    border-radius: 4px;
`;

export default DetailPhotos;