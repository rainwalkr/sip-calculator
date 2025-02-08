import { useEffect, useState } from 'react';
import { CalculatorOperands } from '../Controls/Controls.types';
import ReturnsGraph from '../ReturnsGraph/ReturnsGraph';
import ReturnsText from '../ReturnsText/ReturnsText';
import './ReturnsSection.css'
import { Returns } from './ReturnsSection.types';
import { RETURNS_GRAPH_THROTTLE_DELAY } from '../../configs/calculator';

interface ReturnsSectionProps {
    returns: Returns,
    operands: CalculatorOperands
}

export default function ReturnsSection({ returns, operands }: ReturnsSectionProps) {

    const [trottledOperands, setTrottledOperands] = useState(operands);
    /**
     * for throttling the operands used by graph
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            setTrottledOperands(operands)
        }, RETURNS_GRAPH_THROTTLE_DELAY);
        return () => {
            clearTimeout(timer);
        };
    }, [operands]);

    return <div className='returns-wrapper'>
        <ReturnsText returns={returns} operands={operands} />
        <ReturnsGraph operands={trottledOperands} />
    </div>;
}