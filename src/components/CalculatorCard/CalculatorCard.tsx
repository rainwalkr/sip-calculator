import Calculator from "../Calculator/Calculator";

import "./CalculatorCard.css";

export default function CalculatorCard() {
    return <div className="calculator-wrapper">
        <div className="heading-wrapper">
            <h1 className='heading'><span className='highlight'>SIP</span> Calculator</h1>
        </div>
        <Calculator />
    </div>
}