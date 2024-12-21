import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup'
import SliderWithInputControl from '../SliderWithInputControl/SliderWithInputControl'
import './Controls.css'

export default function Controls() {
    return <div className='controls-wrapper'>
        <div className='actions'></div>
        <RadioButtonGroup />
        <SliderWithInputControl label='Monthly Investment'/>
        <SliderWithInputControl label='Expected Returns (%)' />
        <SliderWithInputControl label='Investment period (years)' />
    </div>
}