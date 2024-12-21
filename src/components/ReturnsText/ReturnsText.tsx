import './ReturnsText.css'

export default function ReturnsText() {
    return <div className='returns-text'>
        <div className='total'>
            <div className='label'>Estimated value in 25 years</div>
            <div className='value'>10,68,886.53</div>
        </div>
        <div className='item'>
            <div className='label-wrapper'>
                <div className='label-indicator returns'></div>
                <div className='label'>Estimated returns at 12%</div>
            </div>
            <div className='value'>7,73,845.35</div>
        </div>
        <div className='item'>
            <div className='label-wrapper'>
                <div className='label-indicator invested'></div>
                <div className='label'>Invested value</div>
            </div>
            <div className='value'>2,95,041.18</div>
        </div>
    </div>
}