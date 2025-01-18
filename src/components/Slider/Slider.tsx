import { useEffect, useState } from 'react';
import './Slider.css';

interface SliderProps {
    value?: number,
    min?: number,
    max?: number,
    step?: number,
    isDecimalValue?: boolean,
    onChange: (value: number) => void
}

export function Slider({
    value = 1,
    min = 1,
    max = 100,
    step = 1,
    isDecimalValue = false,
    onChange
}: SliderProps) {

    const [rangeValue, setRangeValue] = useState(value);
    let progress = ((rangeValue - min) / (max - min)) * 100;

    useEffect(() => {
        /**
         * senario : range value is changed by sliding, then onChange is invoked
         * after-effect : the same value will comeback via value prop. The useEffect hook is executed and will set range value again, this will cause 1 extra render
         * solution : only set range value if value is different, this condition aligns with priamry reason of using hook (update range value when input is updated)
         */
        if (value && rangeValue !== value) {
            setRangeValue(value)
        }
    }, [value])

    function handleInput(event: any) {
        let val = isDecimalValue ? parseFloat(event.target.value) : parseInt(event.target.value);
        setRangeValue(val)
        onChange(val)
    }

    return <input style={{ background: `linear-gradient(to right, var(--color-primary) ${progress}%, var(--slider-track-bg-color) ${progress}%)` }} type="range" min={min} max={max} value={rangeValue} step={step} className="range-input" onInput={handleInput} />
}