import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';

import LogoImage from '../../../assets/imgs/6881.png';
import KakaoLogo from '../../../assets/imgs/kakao1.png';
import LinearGradient from 'react-native-linear-gradient';

const SignUp = () => {
  const loading = false;
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#D5FF7C', '#74E9AD', '#12D3DD']}
        // colors={['#3AE468', '#3BDF86', '#3BDBA4']}
        style={styles.container}>
        <View>
          <Text style={styles.title}>반가워요!</Text>
          <Text style={styles.title2}>
            함께 즐거운 플로깅을 {'\n'}시작해 볼까요?
          </Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.button2}>
            <Image
              source={KakaoLogo}
              resizeMode={'contain'}
              style={{width: 35, height: 35}}></Image>
            <Text style={styles.title3}>카카오톡으로 시작하기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logo}>
          <Image
            source={LogoImage}
            resizeMode={'contain'}
            style={{
              width: '42%',
              height: '42%',
            }}
          />
        </View>
      </LinearGradient>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginTop: 130,
    marginBottom: 20,
    color: '#303644',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title2: {
    color: '#303644',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    ...Platform.select({
      ios: {
        marginTop: 180,
      },
      android: {
        marginTop: 180,
        marginBottom: 10,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#FFE617',
    borderRadius: 5,
  },
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  title3: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#381E1F',
  },
  logo: {
    alignItems: 'center',
    marginTop: 40,
  },
});

export default SignUp;
