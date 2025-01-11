import { SHOW_WORD_NOTATION_LIMIT } from '../../configs/calculator'
import { formatNumber } from '../Calculator/calculator.fns'
import { CalculatorOperands } from '../Controls/Controls.types'
import { Returns } from '../ReturnsSection/ReturnsSection.types'
import './ReturnsText.css'

interface ReturnsTextProps {
    returns: Returns,
    operands: CalculatorOperands
}

export default function ReturnsText({ returns, operands }: ReturnsTextProps) {

    return <div className='returns-text'>
        <div className='total'>
            <div className='label'>Estimated value in {operands.timePeriodYear} {operands.timePeriodYear > 1 ? 'years' : 'year'}</div>
            <div className='value'>{formatNumber(returns.totalAmount, returns.totalAmount > SHOW_WORD_NOTATION_LIMIT)}</div>
        </div>
        <div className='item'>
            <div className='label-wrapper'>
                <div className='label-indicator returns'></div>
                <div className='label'>Estimated returns at {operands.returnRateAnnual}%</div>
            </div>
            <div className='value'>{formatNumber(returns.totalReturns, returns.totalReturns > SHOW_WORD_NOTATION_LIMIT)}</div>
        </div>
        <div className='item'>
            <div className='label-wrapper'>
                <div className='label-indicator invested'></div>
                <div className='label'>Invested value</div>
            </div>
            <div className='value'>{formatNumber(returns.totalInvested)}</div>
        </div>
    </div>
}