/* eslint-disable no-console */
/**
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import * as actions from '../../actions/userActions';


const AppleLogin = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);

    useEffect(() => {
        if (!appleAuth.isSupported) return;

        fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
            updateCredentialStateForUser(`Error: ${error.code}`),
        );
    }, []);

    useEffect(() => {
        if (!appleAuth.isSupported) return;

        return appleAuth.onCredentialRevoked(async () => {
            console.warn('Credential Revoked');
            fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
                updateCredentialStateForUser(`Error: ${error.code}`),
            );
        });
    }, []);

    if (!appleAuth.isSupported) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <Text>Apple Authentication is not supported on this device.</Text>
            </View>
        );
    }

    /**
 * You'd technically persist this somewhere for later use.
 */
    let user = null;
    var kakaoId = ''; // 애플에서는 카카오id같은게 user임. 혼돈 방지를 위해 kakaoId로 통일
    var name = '';

    /**
     * Fetches the credential state for the current user, if any, and updates state on completion.
     */
    async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
        if (user === null) {
            updateCredentialStateForUser('N/A');
        } else {
            const credentialState = await appleAuth.getCredentialStateForUser(user);
            if (credentialState === appleAuth.State.AUTHORIZED) {
                updateCredentialStateForUser('AUTHORIZED');
            } else {
                updateCredentialStateForUser(credentialState);
            }
        }
    }

    /**
     * Starts the Sign In flow.
     */
    async function onAppleButtonPress(updateCredentialStateForUser) {
        console.warn('Beginning Apple Authentication');

        // start a login request
        try {

            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            console.log('appleAuthRequestResponse', appleAuthRequestResponse);
            console.log("내이름은!!!!", appleAuthRequestResponse.fullName.familyName + appleAuthRequestResponse.fullName.givenName)
            const {
                user: newUser,
                email,
                nonce,
                identityToken,
                realUserStatus /* etc */,
            } = appleAuthRequestResponse;

            user = newUser;

            fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
                updateCredentialStateForUser(`Error: ${error.code}`),
            );

            if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) { // case1: 첫 로그인시 - 회원가입
                console.log("I'm a real person!");

                kakaoId = user;

                name = appleAuthRequestResponse.fullName.familyName + appleAuthRequestResponse.fullName.givenName;

                AsyncStorage.setItem('refreshTokenForApple', identityToken);

                dispatch(actions.setkakaoId(kakaoId))
                dispatch(actions.setName(name))
                dispatch(actions.setImg(null));
                dispatch(actions.setEmail(email))

                navigation.navigate('NicknameRegister');
            }

            if (identityToken) { //로그인시 필요한 토큰이아니라 유효한 회원인지 확인 여부임. identityToken이 있다는것은 유효한 apple 유저라는 의미
                // case3: 재로그인 하는 경우 (로그아웃 or 앱 재설치 후 로그인)

                // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
                console.log("identityToken 있음!!", nonce, identityToken);
                AsyncStorage.setItem('refreshTokenForApple', identityToken);

                console.warn(`!!!!!!Apple Authentication Completed, ${user}, ${email}`);
                kakaoId = user;

                //회원(userId) 조회
                axios.get('http://plomeet-app.com:8000/user/' + kakaoId)
                    .then((response) => {
                        console.log(response.status);
                        if (response.status == 200) { //홈으로, Redux 저장
                            console.log(response.data)
                            dispatch(actions.setNickname(response.data.userNickName));
                            dispatch(actions.setUserId(response.data.userId));
                            dispatch(actions.setkakaoId(response.data.kakaoUserId))
                            dispatch(actions.setImg(response.data.userProfileImg))
                            dispatch(actions.setName(response.data.userName))
                            dispatch(actions.setEmail(response.data.userEmail))
                            navigation.replace('M');
                        }
                    })

            } else {
                //로그인 실패시 처리                
            }

            console.warn(`Apple Authentication Completed, ${user}, ${email}`);
        } catch (error) {
            if (error.code === appleAuth.Error.CANCELED) {
                console.warn('User canceled Apple Sign in.');
            } else {
                console.error(error);
            }
        }
    }

    return (
        <View style={[styles.container, styles.horizontal]}>

            <AppleButton
                style={styles.appleButton}
                cornerRadius={5}
                buttonStyle={AppleButton.Style.WHITE}
                buttonType={AppleButton.Type.SIGN_IN}
                onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    appleButton: {
        width: 200,
        height: 45,

        // alignItems: 'center',
        // margin: 10,
    },
    // header: {
    //     margin: 10,
    //     marginTop: 30,
    //     fontSize: 18,
    //     fontWeight: '600',
    // },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});

export default AppleLogin;