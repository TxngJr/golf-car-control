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
          source={require('./../imgs/front/Front-Green.png')}
          style={styles.image}
        /> :
        <Image
          source={require('./../imgs/front/Front-Cyen.png')}
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
    backgroundColor:'#010349',
    borderRadius:50,
    borderWidth:2,
    borderColor:'#010349'
  },
  image: {
    width: 95,
    height: 95,
  },
});