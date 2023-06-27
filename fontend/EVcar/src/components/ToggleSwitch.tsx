import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ArrowUp from '../assets/svgs/ArrowUp';
import ArrowDown from '../assets/svgs/ArrowDown';
import ArrowLeft from '../assets/svgs/ArrowLeft';
import ArrowRight from '../assets/svgs/ArrowRight';
import PowerSvg from '../assets/svgs/PowerSvg';

type Props = {
  isEnabled: boolean;
  onToggle: (isEnabled: boolean) => void;
  icon: string;
}

const ToggleSwitch = ({ isEnabled, onToggle, icon }: Props) => {
  const toggleSwitch = () => {
    onToggle(!isEnabled);
  };

  let renderedIcon = null;

  switch (icon) {
    case 'ArrowUp':
      renderedIcon = <ArrowUp />;
      break;
    case 'ArrowDown':
      renderedIcon = <ArrowDown />;
      break;
    case 'ArrowLeft':
      renderedIcon = <ArrowLeft />;
      break;
    case 'ArrowRight':
      renderedIcon = <ArrowRight />;
      break;
    case 'PowerSvg':
      renderedIcon = <PowerSvg />;
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8} >
      <View style={[{ 
        borderColor: '#00000', borderWidth: 4 }, 
        isEnabled ? { backgroundColor: '#FFFF00' } : { backgroundColor: '#FF2E2E' }, 
        icon == "ArrowUp" && isEnabled && { backgroundColor: '#C4E4F4' }, 
        icon == "PowerSvg" ? { borderRadius: 100 } : { borderRadius: 50 },
        icon == "PowerSvg" && isEnabled && { backgroundColor: '#00D100' },
        ]}>
        {renderedIcon}
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
    backgroundColor: '#00A300',
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