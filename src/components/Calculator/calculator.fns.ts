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

/**
 * get offset for the sequence (list of returns) by year
 * @param year 
 * @returns 
 */
function getOffset(year:number) : number{
    let offset = 1;
    if (year > 10 && year <= 15) {
        offset = 2;
    } else if (year > 15 && year <= 40) {
        offset = 3;
    } else if (year > 40) {
        offset = 4; 
    }
    return offset;
}

/**
 * get list of returns by year
 * @param operands 
 * @returns 
 */
export function getReturnsByYear(operands: CalculatorOperands) {
    let returnsList = [];
    if (operands.mode == SIP_KEY) {
        let offset = getOffset(operands.timePeriodYear)
        for (let year = 1; year <= operands.timePeriodYear; year += offset) {
            const n = year * 12;
            let invested = (operands.investment * n);
            let total = evaluateSIP(operands.investment, (operands.returnRateAnnual / 100) / 12, n);
            let returns = total - invested;
            returnsList.push({
                year,
                invested,
                returns,
                total
            })
        }
        // const lastReturnEntry = returnsList[returnsList.length - 1];
        // if (lastReturnEntry && lastReturnEntry.year != operands.timePeriodYear) {
        //     const n = operands.timePeriodYear * 12;
        //     let invested = (operands.investment * n);
        //     let total = evaluateSIP(operands.investment, (operands.returnRateAnnual / 100) / 12, n);
        //     let returns = total - invested;
        //     returnsList.push({
        //         year:operands.timePeriodYear,
        //         invested,
        //         returns,
        //         total
        //     })
        // }

    } else if (operands.mode == LUMPSUM_KEY) {
        let offset = getOffset(operands.timePeriodYear)
        for (let year = 1; year <= operands.timePeriodYear; year += offset) {
            let invested = operands.investment;
            let total = evaluateLumpsum(invested,operands.returnRateAnnual / 100, year);
            let returns = total - invested;
            returnsList.push({
                year,
                invested,
                returns,
                total
            })
        }
    }

    return returnsList;
}



export function evaluateSIP(P: number, r: number, n: number) {
    return P * ((((1 + r) ** n) - 1) / r) * (1 + r)
}

export function evaluateLumpsum(P: number, r: number, n: number) {
    return P * ((1 + r) ** n)
}

export function formatNumber(value: number, showWordNotation = false, maximumFractionDigits = 0) {
    return new Intl.NumberFormat(NUMBER_FORMAT.LOCALE, {
        style: 'currency',
        currency: NUMBER_FORMAT.CURRENCY,
        maximumFractionDigits,
        ...(showWordNotation && { notation: 'compact', compactDisplay: 'long' })
    }).format(value)
}