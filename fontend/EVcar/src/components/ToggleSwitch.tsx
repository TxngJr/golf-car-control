import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

type Props = {
  isEnabled: boolean;
  onToggle: (isEnabled: boolean) => void;
}

const ToggleSwitch = ({ isEnabled, onToggle }:Props) => {
  const toggleSwitch = () => {
    onToggle(!isEnabled);
  };

  return (
    <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8} style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <View style={[styles.container, isEnabled ? styles.containerActive:{backgroundColor:'#ff4d4d'}]}>
        <View style={[styles.toggle, isEnabled ? styles.toggleActive:{backgroundColor: '#fff',transform: [{ translateX: -1 }],}]} />
      </View>
    </TouchableOpacity>
  );
};

export default ToggleSwitch

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 31,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    padding: 2,
  },
  containerActive: {
    backgroundColor: '#90EE90',
  },
  toggle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#fff',
  },
  toggleActive: {
    backgroundColor: '#fff',
    transform: [{ translateX: 18 }],
  },
});