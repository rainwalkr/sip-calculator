import { LUMPSUM_KEY, NUMBER_FORMAT, SIP_KEY } from "../../configs/calculator";
import { CalculatorOperands } from "../Controls/Controls.types"


export function evaluateCalculatorOperands(operands: CalculatorOperands) {
    console.log('eval')
    let totalAmount = 0;
    let totalInvested = 0;
    let totalReturns = 0;

    if (operands.mode == SIP_KEY) {
        const n = operands.timePeriodYear * 12;
        totalAmount = evaluateSIP(operands.investment, (operands.returnRateAnnual / 100) / 12, n);
        totalInvested = operands.investment * n
        totalReturns = totalAmount - totalInvested;
    } else if (operands.mode == LUMPSUM_KEY) {
        totalAmount = evaluateLumpsum(operands.investment, operands.returnRateAnnual / 100, operands.timePeriodYear);
        totalInvested = operands.investment;
        totalReturns = totalAmount - totalInvested;
    }

    return {
        totalAmount,
        totalReturns,
        totalInvested
    }
}

export function evaluateSIP(P: number, r: number, n: number) {
    return P * ((((1 + r) ** n) - 1) / r) * (1 + r)
}

export function evaluateLumpsum(P: number, r: number, n: number) {
    return P * ((1 + r) ** n)
}

export function formatNumber(value: number, showWordNotation = false) {
    return new Intl.NumberFormat(NUMBER_FORMAT.LOCALE, {
        style: 'currency',
        currency: NUMBER_FORMAT.CURRENCY,
        maximumFractionDigits: 0,
        ...(showWordNotation && { notation: 'compact', compactDisplay: 'long' })
    }).format(value)
}