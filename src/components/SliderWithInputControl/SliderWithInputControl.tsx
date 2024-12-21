import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import './SliderWithInputControl.css'

interface SliderWithInputControlProps {
    label:string
}

export default function SliderWithInputControl({ label }:SliderWithInputControlProps) {

    function handleSliderChange(val: unknown) {
        console.log(val)
        // if ('vibrate' in navigator) {
        //     navigator.vibrate(5)
        // }
    }

    return <div className='slider-with-input-control'>
        <div className='input'>
            <label htmlFor="investment">{label}</label>
            <div className='increment-decrement-input'>
                <button className='btn' type="button"><span className="material-symbols-outlined">remove</span></button>
                <input id='investment' type="number" />
                <button className='btn' type="button"><span className="material-symbols-outlined">add</span></button>
            </div>
        </div>
        <div className='range-input-wrapper'>
            <Slider className="custom-slider" onChange={handleSliderChange} />
        </div>
    </div>
}