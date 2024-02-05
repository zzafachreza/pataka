import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts } from '../../utils/fonts';

export default function MyPicker({
  label,
  iconname,
  onValueChange,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  label2,
  styleLabel,
  colorIcon = colors.primary,
  data = [],
}) {
  return (
    <>
      <View style={{
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.primary,

      }}>
        <Text
          style={{
            flex: 1,
            fontFamily: fonts.secondary[600],
            color: colors.black,
            left: 5,
            fontSize: MyDimensi / 5,
            ...styleLabel,
          }}>
          {label}
        </Text>

        <View style={{
          flex: 1,
          borderLeftWidth: 1,
          borderLeftColor: colors.primary,
          fontFamily: fonts.secondary[600],

        }}>
          <Picker style={{ height: 40, transform: [{ scale: 0.7 }] }}
            selectedValue={value} onValueChange={onValueChange}>
            {data.map(item => {
              return <Picker.Item textStyle={{ fontSize: MyDimensi / 4 }} value={item.value} label={item.label} />;
            })}
          </Picker>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
