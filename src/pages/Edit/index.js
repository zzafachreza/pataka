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

export default function Edit({ navigation, route }) {
    const data = route.params.data;
    const KODE = route.params.kode
    console.log(data);

    const [token, setTOken] = useState({});
    const getTOKEN = async () => {
        const token = await GoogleSignin.getTokens();
        console.log(token.accessToken)
        setTOken(token);



    }

    const [kirim, setKirim] = useState({
        kode_pasien: data[0],
        tanggal_rujukan: data[1],
        nama_petugas: data[2],
        nama_pasien: data[3],
        faskes_yang_merujuk: data[4],
        faskes_tujuan_rujukan: data[5],
        nomor_surat_tugas: data[6],
        nomor_sppd: data[7],
        estimasi_pembiayaan: data[8],
        jumlah_klaim: data[9],
    });

    useEffect(() => {
        getTOKEN();
    }, []);

    const clearRow = () => {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://sheets.googleapis.com/v4/spreadsheets/1CAm6oBzJRaBfkFPEGn1P71dlRKlH6MgeVoXFo7Mv54Y/values/Sheet1!A${KODE}:J${KODE}:clear`,
            headers: {
                'Authorization': `Bearer ${token.accessToken}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                Alert.alert(MYAPP, 'Berhasil di hapus !');
                navigation.goBack();
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const cekData = () => {
        const DATA_KIRIM = [];
        console.log(Object.keys(kirim).map((key) => {

            DATA_KIRIM.push(kirim[key])
        }));
        console.log(DATA_KIRIM);





        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `https://sheets.googleapis.com/v4/spreadsheets/1CAm6oBzJRaBfkFPEGn1P71dlRKlH6MgeVoXFo7Mv54Y/values/Sheet1!A${KODE}:J${KODE}?valueInputOption=USER_ENTERED`,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token.accessToken}`
            },
            data: `{\r\n"values":[${JSON.stringify(DATA_KIRIM)}]\r\n}`
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                Alert.alert(MYAPP, 'Berhasil di udpate !');
                navigation.goBack();
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="Edit Data" onPress={() => navigation.goBack()} />
            <ScrollView>

                <View style={{
                    padding: 5,
                }}>

                    {/* INPUT KODE SETIAP PASIEN */}
                    <MyInput value={kirim.kode_pasien} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            kode_pasien: x,

                        })
                    }} label="Kode Pasien" placeholder="Masukan Kode Pasien" />

                    <MyGap jarak={5} />

                    {/* INPUT TANGGAL RUJUKAN*/}
                    <MyInput label="Tanggal Rujukan" value={kirim.tanggal_rujukan} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            tanggal_rujukan: x,

                        })
                    }} />

                    <MyGap jarak={5} />

                    {/* INPUT NAMA PETUGAS YANG MERUJUK*/}
                    <MyInput value={kirim.nama_petugas} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            nama_petugas: x,

                        })
                    }} label="Nama Petugas Yang Merujuk" placeholder="Nama Petugas Yang Merujuk" />

                    <MyGap jarak={5} />

                    {/* INPUT NAMA PASIEN YANG DIRUJUK*/}
                    <MyInput value={kirim.nama_pasien} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            nama_pasien: x,

                        })
                    }} label="Nama Pasien Yang Dirujuk" placeholder="Nama Pasien Yang Dirujuk" />

                    <MyGap jarak={5} />

                    {/* INPUT NAMA PASIEN YANG DIRUJUK*/}
                    <MyPicker value={kirim.faskes_yang_merujuk} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            faskes_yang_merujuk: x,

                        })
                    }} label="Faskes Yang Merujuk" data={[
                        {
                            label: '',
                            value: ''
                        },
                        {
                            label: 'PKM Nunukan',
                            value: 'PKM Nunukan',
                        },
                        {
                            label: 'PKM Nunukan Timur',
                            value: 'PKM Nunukan Timur'
                        },
                        {
                            label: 'PKM Binusan',
                            value: 'PKM Binusan'
                        },
                        {
                            label: 'PKM Sedadap',
                            value: 'PKM Sedadap'
                        },
                        {
                            label: 'PKM Simenggaris',
                            value: 'PKM Simenggaris'
                        },
                        {
                            label: 'PKM Setabu',
                            value: 'PKM Setabu'
                        },
                        {
                            label: 'PKM Sungai Taiwan',
                            value: 'PKM Sungai Taiwan'
                        },
                        {
                            label: 'PKM Sungai Nyamuk',
                            value: 'PKM Sungai Nyamuk'
                        },
                        {
                            label: 'PKM Sebatik Utara',
                            value: 'PKM Sebatik Utara'
                        },
                        {
                            label: 'PKM Aji Kuning',
                            value: 'PKM Aji Kuning'
                        },
                        {
                            label: 'PKM Pembeliangan',
                            value: 'PKM Pembeliangan'
                        },
                        {
                            label: 'PKM Sanur',
                            value: 'PKM Sanur'
                        },
                        {
                            label: 'PKM Atap',
                            value: 'PKM Atap'
                        },
                        {
                            label: 'PKM Tanjung Harapan',
                            value: 'PKM Tanjung Harapan'
                        },
                        {
                            label: 'PKM Mansalong',
                            value: 'PKM Mansalong'
                        },
                        {
                            label: 'PKM Binter',
                            value: 'PKM Binter'
                        },
                        {
                            label: 'PKM Long Bawan',
                            value: 'PKM Long Bawan'
                        },
                        {
                            label: 'PKM Long Layu',
                            value: 'PKM Long Layu'
                        },
                        {
                            label: 'RSP Sebatik',
                            value: 'RSP Sebatik'
                        },
                        {
                            label: 'RSP Sebuku',
                            value: 'RSP Sebuku'
                        },
                        {
                            label: 'RSP Krayan',
                            value: 'RSP Krayan'
                        },
                    ]} />


                    <MyGap jarak={5} />

                    {/* PICKER FASKER TUJUAN RUJUKAN */}
                    <MyPicker value={kirim.faskes_tujuan_rujukan} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            faskes_tujuan_rujukan: x,

                        })
                    }} label="Faskes Tujuan Rujukan" data={[
                        {
                            label: '',
                            value: ''
                        },
                        {
                            label: 'RSUD Nunukan',
                            value: 'RSUD Nunukan',
                        },

                        {
                            label: 'RSUD Malinau',
                            value: 'RSUD Malinau',
                        },

                        {
                            label: 'RSUD Tarakan',
                            value: 'RSUD Tarakan',
                        },

                    ]} />


                    <MyGap jarak={5} />

                    {/* INPUT NAMA PASIEN YANG DIRUJUK*/}

                    <MyInput value={kirim.nomor_surat_tugas} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            nomor_surat_tugas: x,

                        })
                    }} label="Nomor Surat Tugas" placeholder="Nomor Surat Tugas" />

                    <MyGap jarak={5} />

                    {/* INPUT NAMA PASIEN YANG DIRUJUK*/}

                    <MyInput value={kirim.nomor_sppd} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            nomor_sppd: x,

                        })
                    }} label="Nomor SPPD" placeholder="Nomor SPPD" />


                    <MyGap jarak={5} />

                    {/* INPUT NAMA PASIEN YANG DIRUJUK*/}

                    <MyInput value={kirim.estimasi_pembiayaan} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            estimasi_pembiayaan: x,

                        })
                    }} label="Estimasi Pembiayaan" keyboardType='number-pad' placeholder="Estimasi Pembiayaan" />


                    <MyGap jarak={5} />

                    {/* INPUT NAMA PASIEN YANG DIRUJUK*/}

                    <MyInput value={kirim.jumlah_klaim} onChangeText={x => {
                        setKirim({
                            ...kirim,
                            jumlah_klaim: x,

                        })
                    }} label="Jumlah Klaim" keyboardType='number-pad' placeholder="Jumlah Klaim" />

                    <MyGap jarak={20} />

                    {/* BUTTON SIMPAN */}
                    <MyButton onPress={cekData} title="Update" Icons="open-outline" />
                    <MyGap jarak={5} />
                    <MyButton onPress={clearRow} title="Delete" warna={colors.danger} Icons="trash-outline" />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})