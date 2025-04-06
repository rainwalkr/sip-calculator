import { useEffect, useState } from 'react'
import { INVESTMENT_PERIOD_MAX, INVESTMENT_PERIOD_MIN, LUMPSUM_INVESTMENT_MAX, LUMPSUM_INVESTMENT_MIN, LUMPSUM_KEY, modes, modesMap, RETURNS_MAX, RETURNS_MIN, SIP_INVESTMENT_MAX, SIP_INVESTMENT_MIN, SIP_INVESTMENT_STEP, SIP_KEY, STEPSIP_KEY } from '../../configs/calculator'
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup'
import SliderWithInputControl from '../SliderWithInputControl/SliderWithInputControl'
import './Controls.css'
import { CalculatorOperands } from './Controls.types'
import { MAX_CUSTOM_PRESET, PRESET_TYPE_CUSTOM } from '../../configs/preset'

interface ControlsProps {
    value: CalculatorOperands
    presetService:any,
    change: (value: CalculatorOperands) => void
}

export default function Controls({ value,presetService,change }: ControlsProps) {
    let buttons = modes
    let [calculatorOperands,setCalculatorOperands] = useState(value)
    let [scrollIndicators,setScrollIndicators] = useState({ left: false, right: false })
    let [presets,setPresets] = useState(() => presetService.get())

    useEffect(() => {
        let elm = document.querySelector('.presets');
        if (elm) {
            setScrollIndicators({ left: false, right: elm.scrollWidth > elm.clientWidth })
        }
    },[presets])

    function handleControlChange(field: any, val: number) {
        let newCalculatorOperands = {
            ...calculatorOperands,
            [field]:val
        }
        setCalculatorOperands(newCalculatorOperands)
        change(newCalculatorOperands)
    }

    function handlePresetsScroll(e:any) {
        const rightEnd = e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth;
        setScrollIndicators({
            left: e.target.scrollLeft > 0,
            right:!rightEnd
        })
    }


    function handlePresetClick(preset:any) {
        // skip if current operands match preset
        if (preset.mode == calculatorOperands.mode 
            && preset.investment == calculatorOperands.investment 
            && preset.returnRateAnnual == calculatorOperands.returnRateAnnual
            && preset.timePeriodYear == calculatorOperands.timePeriodYear) {
            return;
        }
        let newCalculatorOperands = {
            mode: preset.mode,
            investment: preset.investment,
            returnRateAnnual: preset.returnRateAnnual,
            timePeriodYear: preset.timePeriodYear
        }
        setCalculatorOperands(newCalculatorOperands)
        change(newCalculatorOperands)
        presetService.recordPresetAppliedTime(preset._id)
    }

    function bookmark(){
        let result = presetService.save(calculatorOperands)
        if (presets.length === MAX_CUSTOM_PRESET + 2) {
            return;
        }
        if (result.status) {
            setPresets([...presetService.get()])
        }
    }

    function deletePreset(event:any,id:string) {
        event?.stopPropagation();
        let result = presetService.remove(id);
        if (result.status) {
            // TODO: modify preset sate value directly instead of fetching from service
            setPresets([...presetService.get()])
        }
    }

    return <div className='controls-wrapper'>
        <div className="presets-wrapper">
            {  scrollIndicators.left && <div className='scroll-indicator left'>
                <span className="material-symbols-rounded">arrow_back</span>
            </div> }
            <div className='presets' onScroll={handlePresetsScroll}>
                {presets.map((preset:any) => {
                    return <div className={preset.type === PRESET_TYPE_CUSTOM ? 'item custom' : 'item'} key={preset._id} onClick={() => handlePresetClick(preset)}>
                        <div>{preset.label}</div>
                        <div className='footer'>
                            <div className='mode-badge'>{modesMap.get(preset.mode)}</div>
                            {preset.type === PRESET_TYPE_CUSTOM && <span title='Delete Bookmark' className="material-symbols-rounded trash" onClick={(e) => deletePreset(e,preset._id)}>delete</span>}
                        </div>
                    </div>
                })}
            </div>
            { scrollIndicators.right && <div className='scroll-indicator right'>
                <span className="material-symbols-rounded">arrow_forward</span>
            </div>}
        </div>
        <div className="actions">
            <button className="action-btn" type="button" onClick={bookmark}><span className="material-symbols-rounded">bookmark</span></button>
            <button className="action-btn" type="button"><span className="material-symbols-rounded">share</span></button>
        </div>

        <RadioButtonGroup buttons={buttons}
            selected={calculatorOperands.mode}
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

        <div className="controls-footer"></div>
    </div>
}