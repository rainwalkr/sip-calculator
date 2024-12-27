import { defaultMode, INVESTMENT_PERIOD_MAX, INVESTMENT_PERIOD_MIN, modes, RETURNS_MAX, RETURNS_MIN, SIP_INVESTMENT_MAX, SIP_INVESTMENT_MIN, SIP_INVESTMENT_STEP } from '../../configs/calculator'
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup'
import SliderWithInputControl from '../SliderWithInputControl/SliderWithInputControl'
import './Controls.css'

export default function Controls() {
    let buttons = modes

    function handleControlChange(field:any,val:number) {
        console.log(field,val)
    }

    return <div className='controls-wrapper'>
        <div className='actions'></div>
        <RadioButtonGroup buttons={buttons} selected={defaultMode} />

        <SliderWithInputControl label='Monthly Investment' 
            inputNotation='₹'
            value={100}
            min={SIP_INVESTMENT_MIN}
            max={SIP_INVESTMENT_MAX}
            rangeStep={SIP_INVESTMENT_STEP}
            change={(value) => handleControlChange('investment',value)} />

        <SliderWithInputControl label='Expected Returns'
            inputNotation='%'
            value={12}
            min={RETURNS_MIN}
            max={RETURNS_MAX}
            inputNotationPosition='postfix'
            step={0.1}
            isDecimalValue={true}
            change={(value) => handleControlChange('returns',value)} />
            
        <SliderWithInputControl label='Investment period' 
            inputNotation='Yr'
            value={5}
            min={INVESTMENT_PERIOD_MIN}
            max={INVESTMENT_PERIOD_MAX}
            inputNotationPosition='postfix'
            change={(value) => handleControlChange('period',value)} />
    </div>
}