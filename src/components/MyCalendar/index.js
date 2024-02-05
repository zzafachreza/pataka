import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts } from '../../utils/fonts';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';


export default function MyCalendar({
  label,
  valueShow,
  iconname,
  onDateChange,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  label2,
  iconColor = colors.primary,
  textColor = colors.primary,
  styleLabel,
  colorIcon = colors.primary,
  data = [],
}) {
  return (
    <>

      <Text
        style={{
          fontFamily: fonts.secondary[600],
          color: colors.black,
          left: 10,
          fontSize: MyDimensi / 5,
          ...styleLabel,
        }}>
        {label}
      </Text>

      <View style={{
        height: 40,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 5,
        fontFamily: fonts.secondary[600],
        borderColor: colors.primary,
      }}>
        <Text style={{
          position: 'absolute',
          zIndex: 0,
          top: 10,
          left: 20,
          fontFamily: fonts.secondary[600],
          fontSize: MyDimensi / 5
        }}>{moment(value).format('DD MMMM YYYY')}</Text>
        <DatePicker

          style={{ width: '100%', height: 50, }}
          date={value}
          mode="date"
          placeholder={placeholder}
          showIcon={false}
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              fontFamily: fonts.secondary[600],
              fontSize: MyDimensi / 5,
              textAlign: 'left',
              alignItems: 'flex-start',
              opacity: 0,
              paddingLeft: 20,
              borderWidth: 0,
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={onDateChange}
        />

      </View>
    </>
  );
}

const styles = StyleSheet.create({});
