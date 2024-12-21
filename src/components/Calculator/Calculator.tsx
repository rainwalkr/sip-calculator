import Controls from '../Controls/Controls'
import Returns from '../Returns/Returns'
import './Calculator.css'

export default function Calculator() {
    return <div className='calculator'>
        <Controls />
        <div className='divider'></div>
        <Returns />
    </div>
}