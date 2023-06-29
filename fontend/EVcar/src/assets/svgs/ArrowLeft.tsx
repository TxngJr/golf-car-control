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
          source={require('./../imgs/left/Left-Yellow.png')}
          style={styles.image}
        /> :
        <Image
          source={require('./../imgs/left/Left-Cyen.png')}
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
    backgroundColor:'#000000',
    borderRadius:50,
    borderWidth:2,
    borderColor:'#000000'
  },
  image: {
    width: 95,
    height: 95,
  },
});