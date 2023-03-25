import React from 'react'
import { Slider } from '@material-ui/core'

export default function Slide(props) {
    const {minValue, maxValue} = props;
  return (
    <div>
        <Slider
            size="small"
            defaultValue={0}
            aria-label="Custom marks"
            valueLabelDisplay="auto"
            min = {minValue}
            max = {maxValue}
            
              />
    </div>
  )
}
