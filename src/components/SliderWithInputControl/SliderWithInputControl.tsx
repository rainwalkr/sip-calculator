import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import './SliderWithInputControl.css'
import { useState } from 'react';

interface SliderWithInputControlProps {
    label: string
    value?: number,
    inputNotation?: null | string,
    inputNotationPosition?: 'prefix' | 'postfix'
    min?: number,
    max?: number,
    step?: number
    inputStep?: number | null
    rangeStep?: number | null
    isDecimalValue?: boolean
    change: (value: number) => void
}

export default function SliderWithInputControl({
    label,
    value = 1,
    inputNotation = null,
    inputNotationPosition = 'prefix',
    min = 1,
    max = 100,
    step = 1,
    inputStep = null,
    rangeStep = null,
    isDecimalValue = false,
    change
}: SliderWithInputControlProps) {

    let [inputValue, setInputValue] = useState(value)

    function handleSliderChange(val: any) {
        setInputValue(val)
        change(val)
    }

    function handleInputChange(e: any) {
        if (!e.target.value) {
            //@ts-ignore
            setInputValue('');
            return;
        }
        let val = isDecimalValue ? parseFloat(e.target.value) : parseInt(e.target.value);
        setInputValue(val)
        e.target.checkValidity() && change(val)
    }

    return <div className='slider-with-input-control'>
        <div className='input'>
            <label>{label}</label>
            <div className="line-input-container">
                <input className="line-input" type="number" required min={min} step={inputStep ?? step} max={max} value={inputValue} onChange={handleInputChange} />
                <div className="line-input-underline"></div>
                {inputNotation && <div className={'line-input-notation ' + (inputNotationPosition == 'prefix' ? 'left' : 'right')}>{inputNotation}</div>}
            </div>
        </div>
        <div className='range-input-wrapper'>
            <Slider className="custom-slider" min={min} step={rangeStep ?? step} max={max} value={inputValue} onChange={handleSliderChange} />
        </div>
    </div>
}