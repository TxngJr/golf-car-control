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
      renderedIcon = <ArrowUp isEnabled={isEnabled}/>;
      break;
    case 'ArrowDown':
      renderedIcon = <ArrowDown isEnabled={isEnabled}/>;
      break;
    case 'ArrowLeft':
      renderedIcon = <ArrowLeft isEnabled={isEnabled}/>;
      break;
    case 'ArrowRight':
      renderedIcon = <ArrowRight isEnabled={isEnabled}/>;
      break;
    case 'PowerSvg':
      renderedIcon = <PowerSvg isEnabled={isEnabled}/>;
      break;
    default:
      break;
  }

  return (
    <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8} >
        {renderedIcon}
    </TouchableOpacity>
  );
};

export default ToggleSwitch