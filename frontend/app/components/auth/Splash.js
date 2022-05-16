import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AuthLogo from './authLogo';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const AuthComponent = () => {
  const navigation = useNavigation();

  setTimeout(() => {
    AsyncStorage.getItem('refreshToken').then(res => {
      if(res) {
        navigation.navigate('M');
      }else{
        navigation.navigate('SignUp');
      }
    });
  },2000);
  


  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#D5FF7C', '#74E9AD', '#12D3DD']}
      style={styles.container}>
      <View>
        <AuthLogo />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 100,
  },
});

export default AuthComponent;
