import { useEffect, useState } from 'react'
import './RadioButtonGroup.css'

interface Button {
    key: number
    label: string,
}
interface RadioButtonGroupProps {
    buttons: Button[]
    selected: number
    change: (key: number) => void
}

export default function RadioButtonGroup({ buttons, selected, change }: RadioButtonGroupProps) {
    let [selectedKey, setSelectedKey] = useState(selected);

    useEffect(() => {
        setSelectedKey(selected)
    },[selected]);

    function handleBtnClick(key: number) {
        setSelectedKey(key)
        change(key)
        if ('vibrate' in navigator) {
            navigator.vibrate(5)
        }
    }

    return <div className='btn-group'>
        {buttons.map(button => {
            return <button type="button"
                key={button.key}
                className={selectedKey === button.key ? 'btn active' : 'btn'}
                onClick={() => handleBtnClick(button.key)}>{button.label}</button>
        })}
        <div className='selection' ></div>
        {/* <div className='selection' style={{ transform:`translateX(calc(100% * ${selectedKey - 1})` }} ></div> */}
    </div>
}