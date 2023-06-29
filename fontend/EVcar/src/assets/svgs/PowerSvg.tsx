import React from "react"
import { Image, StyleSheet, View } from "react-native";

type Props = {
  isEnabled: boolean;
}

function SvgComponent({ isEnabled }: Props) {
  return (
    <View style={styles.container}>
      {isEnabled ?
        <Image
          source={require('./../imgs/power/Power-Red.png')}
          style={styles.image}
        /> :
        <Image
          source={require('./../imgs/power/Power-Cyen.png')}
          style={styles.image}
        />
      }
    </View>
  )
}

export default SvgComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
});