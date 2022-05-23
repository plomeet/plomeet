import React from 'react';
import { View, Image } from 'react-native';
import LogoImage from '../../../assets/imgs/6885.png';

const LogoComponent = () => (
  <View style={{ alignItems: 'center' }}>
    <Image
      source={LogoImage}
      resizeMode={'contain'}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  </View>
);

export default LogoComponent;
