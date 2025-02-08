import { useState } from 'react'
import { defaultMode, INVESTMENT_PERIOD_MAX, INVESTMENT_PERIOD_MIN, LUMPSUM_INVESTMENT_MAX, LUMPSUM_INVESTMENT_MIN, LUMPSUM_KEY, modes, RETURNS_MAX, RETURNS_MIN, SIP_INVESTMENT_MAX, SIP_INVESTMENT_MIN, SIP_INVESTMENT_STEP, SIP_KEY } from '../../configs/calculator'
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup'
import SliderWithInputControl from '../SliderWithInputControl/SliderWithInputControl'
import './Controls.css'
import { CalculatorOperands } from './Controls.types'

interface ControlsProps {
    value: CalculatorOperands
    change: (value: CalculatorOperands) => void
}

export default function Controls({ value, change }: ControlsProps) {
    let buttons = modes
    let [calculatorOperands,setCalculatorOperands] = useState(value)

    function handleControlChange(field: any, val: number) {
        let newCalculatorOperands = {
            ...calculatorOperands,
            [field]:val
        }
        setCalculatorOperands(newCalculatorOperands)
        change(newCalculatorOperands)
    }

    return <div className='controls-wrapper'>
        <div className='actions'></div>

        <RadioButtonGroup buttons={buttons}
            selected={defaultMode}
            change={(value) => handleControlChange('mode', value)} />

        <SliderWithInputControl label={calculatorOperands.mode === LUMPSUM_KEY ? 'Investment' : 'Monthly Investment'}
            inputNotation='₹'
            value={calculatorOperands.investment}
            min={calculatorOperands.mode === SIP_KEY ? SIP_INVESTMENT_MIN : LUMPSUM_INVESTMENT_MIN}
            max={calculatorOperands.mode === SIP_KEY ? SIP_INVESTMENT_MAX : LUMPSUM_INVESTMENT_MAX}
            rangeStep={SIP_INVESTMENT_STEP}
            change={(value) => handleControlChange('investment', value)} />

        <SliderWithInputControl label='Expected Returns'
            inputNotation='%'
            value={calculatorOperands.returnRateAnnual}
            min={RETURNS_MIN}
            max={RETURNS_MAX}
            inputNotationPosition='postfix'
            step={0.1}
            isDecimalValue={true}
            change={(value) => handleControlChange('returnRateAnnual', value)} />

        <SliderWithInputControl label='Investment period'
            inputNotation='Yr'
            value={calculatorOperands.timePeriodYear}
            min={INVESTMENT_PERIOD_MIN}
            max={INVESTMENT_PERIOD_MAX}
            inputNotationPosition='postfix'
            change={(value) => handleControlChange('timePeriodYear', value)} />
    </div>
}