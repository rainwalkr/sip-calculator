import ReturnsGraph from '../ReturnsGraph/ReturnsGraph';
import ReturnsText from '../ReturnsText/ReturnsText';
import './Returns.css'

export default function Returns() {
    return <div className='returns-wrapper'>
        <ReturnsText />
        <ReturnsGraph />
    </div>;
}