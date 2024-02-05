import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';

export default function MyInput({
  onFocus,
  label,

  nolabel = false,
  borderColor = colors.primary,
  backgroundColor = colors.white,
  editable,
  icon = true,
  maxLength,
  iconname,
  onChangeText,
  value,
  borderWidth = 1,
  textColor = colors.black,
  keyboardType,
  onEndEditing,
  secureTextEntry,
  styleInput,
  placeholder,
  autoFocus,
  multiline,
  label2,
  styleLabel,
  colorIcon = colors.black,
}) {

  const [tutup, setTutup] = useState(true);
  return (

    <View
      style={{}}>

      <Text
        style={{
          flex: 1,
          marginLeft: 5,
          marginBottom: 5,
          fontFamily: fonts.secondary[600],
          color: colorIcon,
          fontSize: MyDimensi / 5,
          ...styleLabel,
        }}>
        {label}
      </Text>
      <TextInput
        onEndEditing={onEndEditing}
        editable={editable}
        placeholderTextColor={colors.placeholder}
        maxLength={maxLength}
        multiline={multiline}
        autoFocus={autoFocus}
        onFocus={onFocus}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry ? tutup : false}
        keyboardType={keyboardType}

        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        style={{
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderRadius: 10,
          borderWidth: 1,
          paddingLeft: 10,
          height: 40,
          color: textColor,
          fontSize: MyDimensi / 5,
          fontFamily: fonts.primary[400],
          ...styleInput,
        }}
      />



    </View>
  );
}

const styles = StyleSheet.create({});
