import React, { useEffect, useRef, useState, useCallback } from 'react';
import 'react-native-gesture-handler';
import NaverMapView, { Align, Circle, Marker, Path, Polygon, Polyline } from "./map";
import { Image, ImageBackground, PermissionsAndroid, Platform, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { LayerGroup } from './map/index';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';

//테스트용으로 남겨둔 데이터 삭제 X
const P0 = { latitude: 37.564362, longitude: 126.977011 };
const P1 = { latitude: 37.565051, longitude: 126.978567 };
const P2 = { latitude: 37.565383, longitude: 126.976292 };
const P4 = { latitude: 37.564834, longitude: 126.977218 };
const P5 = { latitude: 37.562834, longitude: 126.976218 };

const Plogging = () => {
    const mapView = useRef(null);
    const [location, setLocation] = useState({ latitude: 37.564362, longitude: 126.977011 });
    const [ploggingPath, setPloggingPath] = useState([]);
    const [enableLayerGroup, setEnableLayerGroup] = useState(true);
    const [center, setCenter] = useState();

    //화면에 렌더링되면 권한부터 살피자
    useEffect(() => {
        if (Platform.OS === 'ios')
            console.log("여기 ios 위치 권한 활용");
        if (Platform.OS === 'android')
            if (requestLocationPermission())//권한 활용에 동의한 상태라면 처음 위치를 가져와서 지도 중심으로 잡는다. ios도 동일하게 해줘야한다
                getRealTimeLoc();           // 이거 안하면 사용자 입장에서 시작시 좌표 중심이 바로 바뀐다.
    }, []);

    // 일정 시간 간격으로 위치 감시해서 현재 위치 갱신하자
    useEffect(() => {
        const _watchId = Geolocation.watchPosition(
            position => {
                // console.log(position);
                const { latitude, longitude } = position.coords;

                setLocation({
                    ...location,
                    latitude,
                    longitude,
                });
            },
            error => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: 60000,
                fastestInterval: 20000,
            },
        );

        return () => {
            if (_watchId) {
                Geolocation.clearWatch(_watchId);
            }
        };
    }, []);

    // 위치가 갱신되면 플로깅 이동 기록 쌓자
    useEffect(() => {
        setPloggingPath(ploggingPath => [...ploggingPath, location]);
        console.log(ploggingPath);
    }, [location]);

    //렌더링 시 실행해서 현재 위치 및 주요 state들 셋팅
    const getRealTimeLoc = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                const { latitude, longitude } = position.coords;
                setPloggingPath([]);
                setLocation({
                    ...location,
                    latitude,
                    longitude,
                });
                setCenter({
                    ...center,
                    latitude,
                    longitude,
                });
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    //내위치를 가운데로
    const setMyLocToCenter = () => {
        const { latitude, longitude } = location;
        if (latitude === center.latitude && longitude === center.longitude) {  //같은 경우에 강제 리렌더링 시켜야한다.
            forceRendering();
            return;
        }
        setCenter({
            ...center,
            latitude,
            longitude,
        });
    }

    //강제로 좌표 살짝 바꾸서 리렌더링을 강요
    const forceRendering = () => {
        const { latitude, longitude } = location;
        const upLat = latitude + 0.00001;
        const upLon = longitude + 0.00001;
        setCenter({ ...center, upLat, upLon });
        setTimeout(() => recoverLoc(), 1000);
    }

    //강제로 변경 좌표 복구
    const recoverLoc = () => {
        const { latitude, longitude } = center;
        setCenter({
            ...center,
            latitude,
            longitude,
        });
    }

    //주석이 많은데 나중에 다 정리함,, 차후 수정시 참고하려고 남겨둠
    return <>
        {center &&
            <NaverMapView ref={mapView}
                style={style.container}
                center={{ ...center, zoom: 16 }}
                // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                // onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                useTextureView>
                <Marker
                    coordinate={location}
                    onClick={() => {
                        console.log('onClick! myLoc')
                        mapView.current.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BICYCLE, enableLayerGroup);
                        mapView.current.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_TRANSIT, enableLayerGroup);
                        setEnableLayerGroup(!enableLayerGroup)
                    }}
                />

                {ploggingPath.length >= 2 &&
                    <Path coordinates={ploggingPath} onClick={() => console.log('onClick! path')} width={5} color={'blue'} />
                }
                {/* <Marker coordinate={P1} pinColor="blue" zIndex={1000} onClick={() => console.warn('onClick! p1')} />
                    <Marker coordinate={P2} pinColor="red" zIndex={100} alpha={0.5} onClick={() => console.warn('onClick! p2')} />
                    <Marker coordinate={P4} onClick={() => console.warn('onClick! p4')} image={require("../../../assets/imgs/marker.png")} width={48} height={48} /> 
                    <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')} />
                    <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')} />
                    <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')} />
                    <Marker coordinate={P5} onClick={() => console.warn('onClick! p0')} width={96} height={96}>
                        <View style={{ backgroundColor: 'rgba(255,0,0,0.2)', borderRadius: 80 }}>
                            <View style={{ backgroundColor: 'rgba(0,0,255,0.3)', borderWidth: 2, borderColor: 'black', flexDirection: 'row' }}>
                                <Image source={require("../../../assets/imgs/marker.png")} style={{
                                    width: 32, height: 32,
                                    backgroundColor: 'rgba(0,0,0,0.2)', resizeMode: 'stretch',
                                    borderWidth: 2, borderColor: 'black'
                                }} fadeDuration={0} />
                                <Text>Image</Text>
                            </View>
                            <ImageBackground source={require("../../../assets/imgs/marker.png")} style={{ width: 64, height: 64 }}>
                                <Text>image background</Text>
                            </ImageBackground>
                        </View>
                    </Marker>
                */}
            </NaverMapView>
        }
        <TouchableOpacity style={{ position: 'absolute', bottom: '10%', right: 8 }} onPress={() => setMyLocToCenter()}>
            <Icon name="md-compass" size={50} color="#1BE58D" />
        </TouchableOpacity>

        {/*<TouchableOpacity style={{ position: 'absolute', bottom: '10%', right: 8 }} onPress={() => navigation.navigate('stack')}>
            <View style={{ backgroundColor: 'gray', padding: 4 }}>
                <Text style={{ color: 'white' }}>open stack</Text>
            </View>
        </TouchableOpacity>
        <Text style={{ position: 'absolute', top: '95%', width: '100%', textAlign: 'center' }}>Icon made by Pixel perfect from www.flaticon.com</Text>
        */}
    </>
};
async function requestLocationPermission() { // 승인 안했을때나 에러 났을때의 처리는 나중에..
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: '위치 권한',
                message: '플로깅 중 위치정보 활용에 동의합니다.',
                buttonNeutral: '나중에',
                buttonNegative: '거부',
                buttonPositive: '승인',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
            return true;
        } else {
            console.log('Location permission denied');
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}

const style = StyleSheet.create({
    container: { width: '100%', height: '100%' },
    realLocBtn: { position: 'absolute', bottom: 100, right: 10, alignSelf: 'flex-end' }
});
export default Plogging;
