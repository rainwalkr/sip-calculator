import './RadioButtonGroup.css'

export default function RadioButtonGroup() {
    return <div className='btn-group'>
        <button className='btn active' type="button">SIP</button>
        <button className='btn' type="button">Lumpsum</button>
        <button className='btn' type="button">Step Up SIP</button>
    </div>
}