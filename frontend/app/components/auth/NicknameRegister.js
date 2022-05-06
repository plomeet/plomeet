import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import LogoImage from '../../../assets/imgs/6881.png';
import LinearGradient from 'react-native-linear-gradient';

const NicknameRegister = () => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled={true}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#D5FF7C', '#74E9AD', '#12D3DD']}
        style={styles.container}>
        <View>
          <Text style={styles.title}>닉네임</Text>
          <TextInput
            style={styles.input}
            placeholder="닉네임을 입력해주세요."
            keyboardType="default"
            autoFocus
            maxLength={10}
            autoCapitalize="none"></TextInput>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.title2}>회원가입</Text>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 800,
    padding: 20,
  },
  title: {
    marginTop: 140,
    marginBottom: 5,
    color: '#303644',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    color: '#303644',
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
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
    backgroundColor: '#5599FF',
    borderRadius: 5,
  },
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#381E1F',
  },
  logo: {
    alignItems: 'center',
    marginTop: 80,
  },
});

export default NicknameRegister;
