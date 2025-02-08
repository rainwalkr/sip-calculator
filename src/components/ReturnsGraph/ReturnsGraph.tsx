import { ResponsiveBar } from "@nivo/bar";

import './ReturnsGraph.css'
import "../../utilities.css";
import { CalculatorOperands } from "../Controls/Controls.types";
import { formatNumber, getReturnsByYear } from "../Calculator/calculator.fns";
import { GRAPH_TOOLTIP_NUM_FORMAT_LIMIT } from "../../configs/calculator";
import { memo } from "react";

interface ReturnsGraphProps {
    operands: CalculatorOperands
}
/**
 * memo was used for skipping re-rendering when operands remain unchanged
 * if user is dragging the slider continuously, then operands will remain unchanged. because of the throttling.
 */
export default memo(function ReturnsGraph({ operands }: ReturnsGraphProps) {

    let data = getReturnsByYear(operands);

    return <div className='returns-graph'>
        <ResponsiveBar
            data={data}
            keys={[
                'invested',
                'returns'
            ]}
            indexBy="year"
            margin={{ top: 50, right: 0, bottom: 40, left: 40 }}
            padding={0.6}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            // colors={{ scheme: 'spectral' }}
            colors={['#BDEADD', '#277C64']}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            // fill={[
            //     {
            //         match: {
            //             id: 'fries'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'sandwich'
            //         },
            //         id: 'lines'
            //     }
            // ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0,
                format:(value) => value + 'Y'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0,
                tickValues:4,
                format:(value) => formatNumber(value,true)
            }}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            // legends={[
            //     {
            //         dataFrom: 'keys',
            //         anchor: 'bottom-right',
            //         direction: 'column',
            //         justify: false,
            //         translateX: 120,
            //         translateY: 0,
            //         itemsSpacing: 2,
            //         itemWidth: 100,
            //         itemHeight: 20,
            //         itemDirection: 'left-to-right',
            //         itemOpacity: 0.85,
            //         symbolSize: 20,
            //         effects: [
            //             {
            //                 on: 'hover',
            //                 style: {
            //                     itemOpacity: 1
            //                 }
            //             }
            //         ]
            //     }
            // ]}
            role="application"
            ariaLabel="Returns Graph"
            barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            // gridYValues={[0,60000]}
            tooltip={(input) => {
                const isLastBar = data.length > 1 && (data.length - 1) === input.index;
                const showWordNotationForReturns = input.data.returns > GRAPH_TOOLTIP_NUM_FORMAT_LIMIT;
                const showWordNotationForInvested = input.data.invested > GRAPH_TOOLTIP_NUM_FORMAT_LIMIT;
                const showWordNotationForTotal = input.data.total > GRAPH_TOOLTIP_NUM_FORMAT_LIMIT;
                return (
                    <div style={isLastBar ? { position: 'relative', right: 40 } : {}}>
                        <div className='custom-tooltip'>
                            <div className='header'>
                                <div className="font-semibold">{input.indexValue}Yr</div>
                                {/* <div>15,000/m</div> */}
                            </div>
                            <div className='item'>
                                <div className='label-wrapper'>
                                    <div className='label-indicator returns'></div>
                                    <div className='label'>Returns</div>
                                </div>
                                <div className='value'>{formatNumber(input.data.returns, showWordNotationForReturns, showWordNotationForReturns ? 2 : 0)}</div>
                            </div>
                            <div className='item'>
                                <div className='label-wrapper'>
                                    <div className='label-indicator invested'></div>
                                    <div className='label'>Invested</div>
                                </div>
                                <div className='value'>{formatNumber(input.data.invested, showWordNotationForInvested, showWordNotationForInvested ? 2 : 0)}</div>
                            </div>
                            <div className="line"></div>
                            <div className='item total'>
                                <div className='label-wrapper'>
                                    <div className='label'>Total</div>
                                </div>
                                <div className='value font-semibold'>{formatNumber(input.data.total, showWordNotationForTotal, showWordNotationForTotal ? 2 : 0)}</div>
                            </div>
                        </div>
                    </div>
                )
            }}
        />
    </div>
})