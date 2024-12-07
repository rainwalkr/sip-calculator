import { ResponsiveBar } from "@nivo/bar";

import "./ReturnsGraphView.css";
import "./utilities.css";

export default function ReturnsGraphView() {
    let data = [
        {
            "year": "1Yr",
            "invested": 3000,
            "returns": 202.33,
        },
        {
            "year": "2Yr",
            "invested": 6300,
            "returns": 831.03,
        },
        {
            "year": "3Yr",
            "invested": 9930,
            "returns": 1980.25,
        },
        {
            "year": "4Yr",
            "invested": 13923,
            "returns": 3760.07,
        },
        {
            "year": "5Yr",
            "invested": 18315.3,
            "returns": 6298.96,
        },
        {
            "year": "6Yr",
            "invested": 23146.83,
            "returns": 9746.52,
        },
        {
            "year": "7Yr",
            "invested": 6300,
            "returns": 831.03,
        },
        // {
        //   "year": "8Yr",
        //   "invested": 6300,
        //   "returns": 831.03,
        // },
        // {
        //   "year": "9Yr",
        //   "invested": 6300,
        //   "returns": 831.03,
        // },
        // {
        //   "year": "10Yr",
        //   "invested": 6300,
        //   "returns": 831.03,
        // },
        // {
        //   "year": "11Yr",
        //   "invested": 6300,
        //   "returns": 831.03,
        // },
        // {
        //   "year": "12Yr",
        //   "invested": 6300,
        //   "returns": 831.03,
        // },
        // {
        //   "year": "13Yr",
        //   "invested": 6300,
        //   "returns": 831.03,
        // },
        // {
        //   "year": "14Yr",
        //   "invested": 6300,
        //   "returns": 831.03,
        // },
        // {
        //   "year": "15Yr",
        //   "invested": 6300,
        //   "returns": 831.03,
        // },
    ]
    return <div className='returns-graph-view'>
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
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
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
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0,
                // tickValues:4
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
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            // gridYValues={[0,10000, 20000,30000]}
            tooltip={(input) => {
                return (
                    <div style={{position:'relative',right:25}}>
                        <div className='custom-tooltip'>
                            <div className='header'>
                                <div className="font-semibold">{input.indexValue}</div>
                                <div>15,000/m</div>
                            </div>
                            <div className='item'>
                                <div className='label-wrapper'>
                                    <div className='label-indicator returns'></div>
                                    <div className='label'>Returns</div>
                                </div>
                                <div className='value'>7,73,845</div>
                            </div>
                            <div className='item'>
                                <div className='label-wrapper'>
                                    <div className='label-indicator invested'></div>
                                    <div className='label'>Invested</div>
                                </div>
                                <div className='value'>2,95,041</div>
                            </div>
                            <div className='item'>
                                <div className='label-wrapper'>
                                    <div className='label'>Total</div>
                                </div>
                                <div className='value font-semibold'>10,68,886</div>
                            </div>
                        </div>
                    </div>
                )
            }}
        />
    </div>
}