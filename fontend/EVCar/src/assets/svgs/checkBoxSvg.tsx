import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg
      height={48}
      viewBox="0 -960 960 960"
      width={48}
    >
      <Path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180zm0-60h600v-600H180v600z" />
    </Svg>
  )
}

export default SvgComponent
