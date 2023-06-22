import * as React from "react"
import Svg, { Path } from "react-native-svg"

type Props = {
  activeTabButtonText?: boolean
}

function SvgComponent({ activeTabButtonText }: Props) {
  return (
    <Svg
      height={69}
      viewBox="0 -960 960 960"
      width={69}
      fill={activeTabButtonText ? '#90D6FA' : '#000000'}
    >
      <Path d="M285-240v-480h60v480h-60zM450-80v-800h60v800h-60zM120-400v-160h60v160h-60zm495 160v-480h60v480h-60zm165-160v-160h60v160h-60z" />
    </Svg>
  )
}

export default SvgComponent
