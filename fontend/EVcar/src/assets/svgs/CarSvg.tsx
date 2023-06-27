import React from "react"
import Svg, { Path } from "react-native-svg"

type Props = {
  activeTabButtonText?: string
}

function SvgComponent({ activeTabButtonText }: Props) {
  return (
    <Svg
      height={44}
      viewBox="0 -960 960 960"
      width={44}
      fill={activeTabButtonText==='active'?'#90D6FA':'#000000'}
    >
      <Path d="M200-204v54q0 12.75-8.625 21.375T170-120h-20q-12.75 0-21.375-8.625T120-150v-324l85-256q5-14 16.5-22t26.5-8h464q15 0 26.5 8t16.5 22l85 256v324q0 12.75-8.625 21.375T810-120h-21q-13 0-21-8.625T760-150v-54H200zm3-330h554l-55-166H258l-55 166zm-23 60v210-210zm105.765 160Q309-314 324.5-329.75T340-368q0-23.333-15.75-39.667Q308.5-424 286-424q-23.333 0-39.667 16.265Q230-391.471 230-368.235 230-345 246.265-329.5q16.264 15.5 39.5 15.5zM675-314q23.333 0 39.667-15.75Q731-345.5 731-368q0-23.333-16.265-39.667Q698.471-424 675.235-424 652-424 636.5-407.735q-15.5 16.264-15.5 39.5Q621-345 636.75-329.5T675-314zm-495 50h600v-210H180v210z" />
    </Svg>
  )
}

export default SvgComponent
