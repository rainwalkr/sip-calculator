import { useState } from 'react'
import { defaultCalculatorOperands } from '../../configs/calculator'
import Controls from '../Controls/Controls'
import './Calculator.css'
import { evaluateCalculatorOperands } from './calculator.fns'
import ReturnsSection from '../ReturnsSection/ReturnsSection'
import { PresetService } from '../../services/PresetService'
import { StorageService } from '../../services/StorageService'

let presetService = new PresetService(new StorageService())

export default function Calculator() {
    let calculatorOperands = defaultCalculatorOperands
    let [operands,setOperands] = useState(calculatorOperands);
    let [returns,setReturns] = useState(() => evaluateCalculatorOperands(calculatorOperands))

    function handleControlsChange(val:any) {
        setOperands(val)
        setReturns(evaluateCalculatorOperands(val));
    }

    return <div className='calculator'>
        <Controls value={calculatorOperands} presetService={presetService} change={handleControlsChange} />
        <div className='divider'></div>
        <ReturnsSection returns={returns} operands={operands} />
    </div>
}