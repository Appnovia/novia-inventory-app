import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


export default function CustomDropdown({
  data,
  value,
  onChange,
  placeholder,
  disabled = false,
}: CustomDropdownProps) {
  return (
    <Dropdown
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={(item) => onChange(item.value)}
      style={styles.dropdown}
      activeColor="#F2E8E8"
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      containerStyle={styles.containerStyle}
      itemTextStyle={styles.itemTextStyle}
      disable={disabled}
    />
  )
}

const styles = StyleSheet.create({
  dropdown: {
    height: 55,
    borderRadius: 12,
    backgroundColor: '#F2E8E8',
    paddingHorizontal: 12,
  },
  placeholderStyle: {
    color: '#994D52',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium'
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#994D52',
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: '#994D52',
  },
  containerStyle: {
    backgroundColor: '#F2E8E8'
  },
  itemTextStyle: {
    color: "#994D52",
    backgroundColor: '#F2E8E8',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium'
  },
});

