import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { MyButton, MyGap } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  NativeModuleError,
} from '@react-native-google-signin/google-signin';
export default function Splash({ navigation }) {

  const img = new Animated.Value(windowWidth / 3);
  const text = new Animated.Value(0);
  Animated.timing(img, {
    toValue: windowWidth / 1.2,
    duration: 750,
    useNativeDriver: false,
  }).start();

  Animated.timing(text, {
    toValue: windowHeight / 4.5,
    duration: 1000,
    useNativeDriver: false,
  }).start();


  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();

  };


  useEffect(() => {


    setTimeout(async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        getData('user').then(res => {

          if (!res) {
            navigation.replace('Login')
          } else {
            // navigation.replace('GetStarted')
            navigation.replace('CatatanRujukan')
          }
        })
      } else {
        navigation.replace('Login')
      }
    }, 1200)
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
      padding: 0,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      position: 'relative'

    }}>


      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Animated.Image
          source={require('../../assets/logo.png')}
          resizeMode="contain"
          style={{
            width: img,
            height: img
          }}
        />
        {/* <Animated.Text style={{
          fontFamily: fonts.secondary[800],
          fontSize: MyDimensi/4,
          color: colors.white,
          marginTop: 10,
          marginBottom: text,
          textAlign: 'center',
        }}>Monitoring Asupan MPASI</Animated.Text> */}

        <ActivityIndicator color={colors.secondary} size="large" />
      </View>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
