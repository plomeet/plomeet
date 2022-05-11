import * as KakaoLogins from '@react-native-seoul/kakao-login';

var kakaoHelper = {
  login: login,
  logout: logout,
};

function login() {
  KakaoLogins.login()
    .then(result => {
      console.log(`### Login Result : ${JSON.stringify(result)}`);
      KakaoLogins.getProfile()
        .then(result => {
          console.log(`### Profile Result : ${JSON.stringify(result)}`);
          return result;
        })
        .catch(err => {
          console.log(`### Profile Error : ${JSON.stringify(err)}`);
        });
    })
    .catch(err => {
      console.log(`### Login Error : ${JSON.stringify(err)}`);
    });
}

function logout() {
  KakaoLogins.logout()
    .then(result => {
      console.log(`### Logout Result : ${JSON.stringify(result)}`);
    })
    .catch(err => {
      console.log(`### Logout Error : ${JSON.stringify(err)}`);
    });
}

module.exports = kakaoHelper;
