import { View, Text, TouchableWithoutFeedback, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts } from '../../utils'
import { ScrollView } from 'react-native-gesture-handler'
import { MyButton, MyCalendar, MyGap, MyInput, MyPicker } from '../../components'
import moment from 'moment'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Icon } from 'react-native-elements'
import { MYAPP, storeData } from '../../utils/localStorage'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
    NativeModuleError,
} from '@react-native-google-signin/google-signin';
import { showMessage } from 'react-native-flash-message'
export default function CatatanRujukan({ navigation }) {
    const [open, setOpen] = useState(false);


    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        offlineAccess: false,
        webClientId: '955470692241-d5h31kbij4m9h0b41uhp0jme3s8g681b.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    });
    const [kirim, setKirim] = useState({
        kode_pasien: '',
        tanggal_rujukan: moment().format('YYYY-MM-DD'),
        nama_petugas: '',
        nama_pasien: '',
        faskes_yang_merujuk: '',
        faskes_tujuan_rujukan: '',
        nomor_surat_tugas: '',
        nomor_sppd: '',
        estimasi_pembiayaan: '',
        jumlah_klaim: '',

    });

    const [user, setUser] = useState({});
    const [token, setTOken] = useState({});
    const getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        console.log(currentUser);
        setUser(currentUser);
        setOpen(true);


    };



    useEffect(() => {
        getCurrentUser();

    }, [])

    const cekData = () => {
        console.log(kirim);

        if (kirim.tanggal_rujukan.length == 0) {
            showMessage({
                message: `Maaf tanggal rujukan wajib di isi !`
            })
        }
        else if (kirim.nama_petugas.length == 0) {
            showMessage({
                message: `Maaf nama petugas wajib di isi !`
            })
        }
        else if (kirim.nama_pasien.length == 0) {
            showMessage({
                message: `Maaf nama pasies wajib di isi !`
            })
        }
        else if (kirim.faskes_yang_merujuk.length == 0) {
            showMessage({
                message: `Maaf faskes yang dirujuk wajib di isi !`
            })
        }
        else if (kirim.faskes_tujuan_rujukan.length == 0) {
            showMessage({
                message: `Maaf faskes tujuan rujukan wajib di isi !`
            })
        }
        else if (kirim.nomor_surat_tugas.length == 0) {
            showMessage({
                message: `Maaf nomor surat tugas wajib di isi !`
            })
        }
        else if (kirim.nomor_sppd.length == 0) {
            showMessage({
                message: `Maaf nomor sppd wajib di isi !`
            })
        }
        else if (kirim.estimasi_pembiayaan.length == 0) {
            showMessage({
                message: `Maaf estimasi pembiayan wajib di isi !`
            })
        }
        else if (kirim.jumlah_klaim.length == 0) {
            showMessage({
                message: `Maaf jumlah klaim wajib di isi !`
            })
        } else {
            navigation.navigate('Cek', kirim)
        }






    }
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>

            {open &&
                <>
                    {/* HEADER */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: colors.primary, borderBottomRightRadius: 5, borderBottomLeftRadius: 5 }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Image source={{
                                        uri: user.user.photo
                                    }} style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20
                                    }} />
                                </View>
                                <View style={{
                                    paddingLeft: 10,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.primary[400],
                                        color: "white",
                                        fontSize: MyDimensi / 5,

                                    }}>
                                        Selamat Datang, {user.user.name.split(" ")[0]}
                                    </Text>

                                    <Text style={{
                                        fontFamily: fonts.primary[600],
                                        color: "white",
                                        fontSize: MyDimensi / 5,

                                    }}>PENCATATAN KLAIM RUJUKAN</Text>
                                </View>
                            </View>

                        </View>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Daftar')}>
                            <View style={{
                                padding: 10,
                            }}>
                                <Icon type='ionicon' size={MyDimensi / 4} name='search-outline' color={colors.white} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
                                {
                                    text: 'Batal',
                                    style: "cancel"
                                },
                                {
                                    text: 'Keluar',
                                    onPress: async () => {


                                        try {
                                            await GoogleSignin.signOut();
                                            // storeData('user', null);
                                            navigation.reset({
                                                index: 0,
                                                routes: [{ name: 'Splash' }],
                                            });
                                            // Remember to remove the user from your app's state as well
                                        } catch (error) {
                                            console.error(error);
                                        }


                                    }
                                }
                            ])
                        }}>
                            <View style={{
                                padding: 10,
                            }}>
                                <Icon type='ionicon' size={MyDimensi / 4} name='log-out-outline' color={colors.white} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {/* END HEADER */}

                    <ScrollView>

                        <View style={{
                            padding: 10,
                        }}>

                            {/* INPUT KODE SETIAP PASIEN */}


                            <MyGap jarak={5} />

                            {/* INPUT TANGGAL RUJUKAN*/}
                            <MyCalendar label="Tanggal Rujukan" value={kirim.tanggal_rujukan} onDateChange={x => {
                                setKirim({
                                    ...kirim,
                                    tanggal_rujukan: x,

                                })
                            }} />

                            <MyGap jarak={5} />

                            {/* INPUT NAMA PETUGAS YANG MERUJUK*/}
                            <MyInput onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    nama_petugas: x,

                                })
                            }} label="Nama Petugas Yang Merujuk" placeholder="Nama Petugas Yang Merujuk" />

                            <MyGap jarak={5} />

                            {/* INPUT NAMA PASIEN YANG DIRUJUK*/}
                            <MyInput onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    nama_pasien: x,

                                })
                            }} label="Nama Pasien Yang Dirujuk" placeholder="Nama Pasien Yang Dirujuk" />

                            <MyGap jarak={5} />

                            {/* INPUT NAMA PASIEN YANG DIRUJUK*/}
                            <MyPicker onValueChange={x => {
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
                            <MyPicker onValueChange={x => {
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

                            <MyInput onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    nomor_surat_tugas: x,

                                })
                            }} label="Nomor Surat Tugas" placeholder="Nomor Surat Tugas" />

                            <MyGap jarak={5} />

                            {/* INPUT NAMA PASIEN YANG DIRUJUK*/}

                            <MyInput onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    nomor_sppd: x,

                                })
                            }} label="Nomor SPPD" placeholder="Nomor SPPD" />


                            <MyGap jarak={5} />

                            {/* INPUT NAMA PASIEN YANG DIRUJUK*/}

                            <MyInput onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    estimasi_pembiayaan: x,

                                })
                            }} label="Estimasi Pembiayaan" keyboardType='number-pad' placeholder="Estimasi Pembiayaan" />


                            <MyGap jarak={5} />

                            {/* INPUT NAMA PASIEN YANG DIRUJUK*/}

                            <MyInput onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    jumlah_klaim: x,

                                })
                            }} label="Jumlah Klaim" keyboardType='number-pad' placeholder="Jumlah Klaim" />

                            <MyGap jarak={10} />

                            {/* BUTTON SIMPAN */}
                            <MyButton onPress={cekData} title="Simpan" Icons="open-outline" />


                        </View>
                    </ScrollView>
                </>

            }
        </View>
    )
}