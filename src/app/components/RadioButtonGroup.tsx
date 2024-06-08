import React from 'react'
import { radioButtonGroup } from '../types/types'

const RadioButtonGroup = ({options, selectedOptions, onChange} : radioButtonGroup) => {
  return (
    <div className='text-center m-4'>
        {options.map((opt : string) => {
            return(
                <label htmlFor="" key={opt}>
                <input 
                type="radio"
                name="player"
                value={opt}
                defaultChecked={selectedOptions == opt}
                onChange={onChange}
                />
                {opt}
            </label>
            )
        })}
    </div>
  )
}

export default RadioButtonGroup