import { View, Text, TouchableWithoutFeedback, Alert, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts } from '../../utils'
import { ScrollView } from 'react-native-gesture-handler'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import moment from 'moment'
import GoogleSheet, { batchGet } from 'react-native-google-sheet';
import { Icon } from 'react-native-elements'
import { MYAPP, storeData } from '../../utils/localStorage'

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
    NativeModuleError,
} from '@react-native-google-signin/google-signin';
import axios from 'axios'
import { google } from 'googleapis'

export default function Cek({ navigation, route }) {
    const kirim = route.params;
    const SHEET_ID = '1CAm6oBzJRaBfkFPEGn1P71dlRKlH6MgeVoXFo7Mv54Y'

    const [user, setUser] = useState({});
    const [token, setTOken] = useState({});
    const getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        setUser(currentUser);

    };
    const getTOKEN = async () => {
        const token = await GoogleSignin.getTokens();
        console.log(token.accessToken)
        setTOken(token);



    }
    const range = 'A1';
    const sendServer = async () => {

        const DATA_KIRIM = [];
        console.log(Object.keys(kirim).map((key) => {

            console.log(kirim[key])
            if (kirim[key].length > 0) {
                DATA_KIRIM.push(kirim[key])
            } else {
                DATA_KIRIM.push('-')
            }

        }));
        console.log(DATA_KIRIM);





        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://sheets.googleapis.com/v4/spreadsheets/1CAm6oBzJRaBfkFPEGn1P71dlRKlH6MgeVoXFo7Mv54Y/values/Sheet1!A1:J1/:append?valueInputOption=USER_ENTERED',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token.accessToken}`
            },
            data: `{\r\n"values":[${JSON.stringify(DATA_KIRIM)}]\r\n}`
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                Alert.alert(MYAPP, 'Data berhasil di simpan !');
                navigation.replace("CatatanRujukan")
            })
            .catch((error) => {
                console.log(error);
            });






    }
    useEffect(() => {
        getCurrentUser();
        getTOKEN();
    }, [])



    const ListItem = ({ label, value }) => {
        return (
            <View style={{
                padding: 5,
                borderBottomWidth: 1,
                marginVertical: 2,
                marginHorizontal: 20,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: MyDimensi / 5
                }}>{label}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 5
                }}>{value}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
        }}>
            <MyHeader judul="Review Hasil Input" onPress={() => navigation.replace("CatatanRujukan")} />
            <ScrollView style={{
                flex: 1,
            }}>


                <ListItem label="Kode Pasien" value={kirim.kode_pasien} />
                <ListItem label="Tanggal Rujukan" value={moment(kirim.tanggal_rujukan).format('dddd, DD MMMM YYYY')} />
                <ListItem label="Nama Petugas Yang Merujuk" value={kirim.nama_petugas} />
                <ListItem label="Nama Pasien Yang Dirujuk" value={kirim.nama_pasien} />
                <ListItem label="Faskes Yang Merujuk" value={kirim.faskes_yang_merujuk} />
                <ListItem label="Faskes Tujuan Rujukan" value={kirim.faskes_tujuan_rujukan} />
                <ListItem label="Nomor Surat Tugas" value={kirim.nomor_surat_tugas} />
                <ListItem label="Nomor SPPD" value={kirim.nomor_sppd} />
                <ListItem label="Estimasi Pembiayaan" value={new Intl.NumberFormat().format(kirim.estimasi_pembiayaan)} />
                <ListItem label="Jumlah Klaim" value={new Intl.NumberFormat().format(kirim.jumlah_klaim)} />

                <View style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    marginTop: 10,
                }}>
                    <View style={{
                        flex: 1,
                        paddingRight: 5
                    }}>
                        <MyButton title="Edit" warna={colors.secondary} Icons="create-outline" onPress={async () => {


                            navigation.goBack()
                        }} />
                    </View>

                    <View style={{
                        flex: 1,
                        paddingRight: 5
                    }}>
                        <MyButton title="Konfirmasi" Icons="checkmark-circle-outline" onPress={sendServer} />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})