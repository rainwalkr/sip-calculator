import { CalculatorOperands } from '../Controls/Controls.types';
import ReturnsGraph from '../ReturnsGraph/ReturnsGraph';
import ReturnsText from '../ReturnsText/ReturnsText';
import './ReturnsSection.css'
import { Returns } from './ReturnsSection.types';

interface ReturnsSectionProps {
    returns: Returns,
    operands: CalculatorOperands
}

export default function ReturnsSection({ returns, operands }: ReturnsSectionProps) {
    return <div className='returns-wrapper'>
        <ReturnsText returns={returns} operands={operands} />
        <ReturnsGraph />
    </div>;
}