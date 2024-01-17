import { View, Text, TouchableWithoutFeedback, Alert, SafeAreaView, StyleSheet, FlatList, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts } from '../../utils'
import { ScrollView } from 'react-native-gesture-handler'
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import moment from 'moment'
import GoogleSheet, { batchGet } from 'react-native-google-sheet';
import { Icon } from 'react-native-elements'
import { MYAPP, storeData } from '../../utils/localStorage'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
    NativeModuleError,
} from '@react-native-google-signin/google-signin';
import { useIsFocused } from '@react-navigation/native'

export default function Daftar({ navigation }) {

    const [data, setData] = useState([]);
    const [tmp, setTMP] = useState([]);

    const [user, setUser] = useState({});
    const [token, setTOken] = useState({});
    const getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        setUser(currentUser);

    };
    const getTOKEN = async () => {
        const token = await GoogleSignin.getTokens();

        setTOken(token);

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://sheets.googleapis.com/v4/spreadsheets/1CAm6oBzJRaBfkFPEGn1P71dlRKlH6MgeVoXFo7Mv54Y/values:batchGet?valueRenderOption=FORMATTED_VALUE&ranges=A:Z',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`
            }
        };


        axios.request(config)
            .then((response) => {
                // console.log(response.data.valueRanges[0].values)
                if (response.data.valueRanges[0].values !== undefined) {

                    let dataTMp = [];
                    response.data.valueRanges[0].values.map(item => {

                        dataTMp.push(Object.assign({}, item))

                    });



                    setData(dataTMp);
                    setTMP(dataTMp)
                } else {
                    showMessage({ message: 'Data masih kosong !' })
                }
            })
            .catch((error) => {
                console.log(error);
            });



    }

    const isFocus = useIsFocused();

    function formatResponse(response) {
        const keys = response.values[0];
        const data = response.values.slice(1);
        const obj = data.map(arr => Object.assign({}, ...keys.map((k, i) => ({ [k]: arr[i] }))));
        return obj;
    }

    function onError(error) {
        console.error(error);
    }
    const ListItem = ({ label, value }) => {
        return (
            <View style={{
                padding: 5,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: MyDimensi / 4
                }}>{label}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4
                }}>{value}</Text>
            </View>
        )
    }



    useEffect(() => {

        if (isFocus) {
            getTOKEN();
        }

        getCurrentUser();
    }, [isFocus]);

    const [cari, setCari] = useState({
        kolom: 0,
        value: '',
    })

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="Data Hasil Inputan" onPress={() => navigation.goBack()} />
            <View style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                marginBottom: 10,
            }}>
                <View style={{
                    flex: 1,
                    paddingRight: 5,
                    paddingTop: 5,
                }}>
                    <MyPicker label="pilih kolom" data={[
                        { label: 'Kode Pasien', value: 0 },
                        { label: 'Nama Petugas Yang Merujuk', value: 2 },
                        { label: 'Nama Pasien Yang Dirujuk', value: 3 },
                        { label: 'Faskes Yang Merujuk', value: 4 },
                        { label: 'Faskes Tujuan Rujukan', value: 5 },
                        { label: 'Nomor Surat Tugas', value: 6 },
                        { label: 'Nomor SPPD', value: 7 },
                        { label: 'Estimasi Pembiayaan', value: 8 },
                        { label: 'Jumlah Klaim', value: 9 },
                    ]} onValueChange={x => {
                        setCari({
                            ...cari,
                            kolom: x
                        })
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 5
                }}>

                    <MyInput label="Masukan Kata Kunci" onEndEditing={x => {
                        let key = x.nativeEvent.text;
                        console.log({
                            kolom: cari.kolom,
                            value: key
                        });

                        if (key.length == 0) {

                            setData(tmp);
                        } else if (key.length > 0) {
                            const filtedData = data.filter(i => i[cari.kolom].toLowerCase().indexOf(key.toLowerCase()) > -1);
                            if (filtedData.length > 0) {
                                setData(filtedData)
                            } else {
                                setData(tmp);
                            }
                        }
                    }} />
                </View>

            </View>
            <FlatList data={data} renderItem={({ item, index }) => {
                return (
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Edit', {
                        data: item,
                        kode: index + 1
                    })}>
                        <View style={{
                            padding: 10,
                            borderWidth: 1,
                            marginHorizontal: 20,
                            marginVertical: 5,
                            borderRadius: 10,
                            borderColor: colors.border
                        }}>
                            <ListItem label="Kode Pasien" value={item[0]} />
                            <ListItem label="Tanggal Rujukan" value={item[1]} />
                            <ListItem label="Nama Petugas Yang Merujuk" value={item[2]} />
                            <ListItem label="Nama Pasien Yang Dirujuk" value={item[3]} />
                            <ListItem label="Faskes Yang Merujuk" value={item[4]} />
                            <ListItem label="Faskes Tujuan Rujukan" value={item[5]} />
                            <ListItem label="Nomor Surat Tugas" value={item[6]} />
                            <ListItem label="Nomor SPPD" value={item[7]} />
                            <ListItem label="Estimasi Pembiayaan" value={item[8]} />
                            <ListItem label="Jumlah Klaim" value={item[9]} />
                        </View>
                    </TouchableWithoutFeedback>
                )
            }} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})