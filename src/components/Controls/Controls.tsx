import { defaultMode, modes } from '../../configs/calculator'
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup'
import SliderWithInputControl from '../SliderWithInputControl/SliderWithInputControl'
import './Controls.css'

export default function Controls() {
    let buttons = modes
    return <div className='controls-wrapper'>
        <div className='actions'></div>
        <RadioButtonGroup buttons={buttons} selected={defaultMode} />
        <SliderWithInputControl label='Monthly Investment'/>
        <SliderWithInputControl label='Expected Returns (%)' />
        <SliderWithInputControl label='Investment period (years)' />
    </div>
}