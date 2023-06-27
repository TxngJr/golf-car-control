import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg
      height={110}
      viewBox="0 -960 960 960"
      width={110}
      fill={'#FFFFFF'}
    >
      <Path d="M450-438v-406h60v406h-60zm30 320q-74 0-139.5-28.5T226-224q-49-49-77.5-114.5T120-478q0-80 34-149.5T250-751l42 42q-53 43-82.5 102.5T180-478.022Q180-353 267.5-265.5 355-178 480-178q125.357 0 212.679-87.5Q780-353 780-478.022 780-547 750.5-607.5 721-668 670-709l43-42q60 51 93.5 122T840-478q0 74-28.5 139.5t-77 114.5q-48.5 49-114 77.5T480-118z" />
    </Svg>
  )
}

export default SvgComponent
