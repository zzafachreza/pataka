import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Animated, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking } from 'react-native';
import { fonts, windowWidth, colors, windowHeight, MyDimensi } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  NativeModuleError,
} from '@react-native-google-signin/google-signin';

export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});

  const card = new Animated.Value(-30);
  const img = new Animated.Value(-20);

  const PENGGUNA = [
    {
      username: 'admin1',
      password: '123'
    },
    {
      username: 'admin2',
      password: '123'
    },
    {
      username: 'admin3',
      password: '123'
    },
  ]



  const signIn = async () => {
    try {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        offlineAccess: false,
        webClientId: '955470692241-d5h31kbij4m9h0b41uhp0jme3s8g681b.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      });


      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      storeData('user', userInfo)
      navigation.replace('CatatanRujukan')
    } catch (error) {
      console.log(error)

    }
  }

  const masuk = () => {


    if (kirim.username == null && kirim.password == null) {
      Alert.alert(MYAPP, 'username dan password tidak boleh kosong !');
    } else if (kirim.username == null) {
      Alert.alert(MYAPP, 'username tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {


      // setLoading(true);
      console.log(kirim);

      const cek = PENGGUNA.filter(i => i.username == kirim.username && i.password == kirim.password);
      console.log(cek)




      if (cek.length > 0) {

        storeData('user', cek);
        navigation.replace('CatatanRujukan')
      } else {
        showMessage({
          type: 'danger',
          message: 'Maaf username atau password salah !'
        })
      }



    }




  }

  useEffect(() => {


    Animated.timing(card, {
      toValue: 1,
      duration: 850,
      useNativeDriver: false,
    }).start();
    Animated.timing(img, {
      toValue: 0,
      duration: 850,
      useNativeDriver: false,
    }).start();
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })

  }, []);

  return (

    <ScrollView style={{ flex: 1, backgroundColor: colors.background, position: 'relative' }}>




      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Animated.Image source={require('../../assets/icon.png')} style={{
          marginTop: 10,
          width: windowWidth / 1.9,
          height: windowWidth / 1.9,
          resizeMode: 'contain'
        }} />

      </View>


      <Animated.View style={{
        padding: 20,
        flex: 1, margin: 10,
        bottom: card,
        borderRadius: 10,
      }}>
        <Text style={{
          fontSize: MyDimensi / 2,
          fontFamily: fonts.primary[800],
          color: colors.black,
        }}>Selamat Datang</Text>
        <Text style={{
          fontSize: MyDimensi / 4,
          fontFamily: fonts.primary[400],
          color: colors.black,
          marginBottom: 10,
        }}>Silahkan login terlebih dahulu</Text>


        {/* USERNAME INPUT */}
        {/* 
        <MyInput label="Username" onChangeText={x => {
          setKirim({
            ...kirim,
            username: x
          })
        }} iconname="person" placeholder="Masukan username" /> */}


        <MyGap jarak={10} />
        {/* PASSWORD INPUT */}

        {/* 
        <MyInput label="Password" onChangeText={x => {
          setKirim({
            ...kirim,
            password: x
          })
        }} iconname="key" placeholder="Masukan password" /> */}



        <MyGap jarak={40} />
        {!loading &&




          <MyButton
            onPress={signIn}
            title="Login Dengan Google"


            Icons="log-in-outline"
          />


        }



      </Animated.View>


      {loading && <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator color={colors.secondary} size="large" />
      </View>}
    </ScrollView>




  );
}

const styles = StyleSheet.create({});
