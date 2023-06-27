import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg
      height={90}
      viewBox="0 -960 960 960"
      width={90}
      fill={'#FFFFFF'}
    >
      <Path d="M480-334l146-146-146-146-42 42 74 74H330v60h182l-74 74 42 42zm0 254q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140zm0-340z" />
    </Svg>
  )
}

export default SvgComponent
