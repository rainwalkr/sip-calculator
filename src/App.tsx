import Slider from 'rc-slider'
import './App.css'
import 'rc-slider/assets/index.css';
import ReturnsGraphView from './ReturnsGraphView';

function App() {

  function handleSliderChange(val: unknown) {
    console.log(val)
    if ('vibrate' in navigator) {
      navigator.vibrate(5)
    }
  }

  return (
    <>
      <div className='main-wrapper'>
        <div className="calculator-wrapper">
          <div className="heading-wrapper">
            <h1 className='heading'><span className='highlight'>SIP</span> Calculator</h1>
          </div>
          <div className='calculator'>
            <div className='controls'>
              <div className='actions'></div>
              <div className='btn-group'>
                <button className='btn active' type="button">SIP</button>
                <button className='btn' type="button">Lumpsum</button>
                <button className='btn' type="button">Step Up SIP</button>
              </div>
              <div className='slider-with-input-control'>
                <div className='input'>
                  <label htmlFor="investment">Monthly Investment</label>
                  <div className='increment-decrement-input'>
                    <button className='btn' type="button"><span className="material-symbols-outlined">remove</span></button>
                    <input id='investment' type="number" />
                    <button className='btn' type="button"><span className="material-symbols-outlined">add</span></button>
                  </div>
                </div>
                <div className='range-input-wrapper'>
                  {/* <input className='range-input' type="range"
                    min={250}
                    max={1000000}
                    step={100} /> */}
                  <Slider className="custom-slider" onChange={handleSliderChange} />
                </div>
              </div>
              <div className='slider-with-input-control'>
                <div className='input'>
                  <label htmlFor="return_rate_annual">Expected Returns (%)</label>
                  <div className='increment-decrement-input'>
                    <button className='btn' type="button"><span className="material-symbols-outlined">remove</span></button>
                    <input id='return_rate_annual' type="number" />
                    <button className='btn' type="button"><span className="material-symbols-outlined">add</span></button>
                  </div>
                </div>
                <div className='range-input-wrapper'>
                  {/* <input className='range-input' type="range"
                    min={1}
                    max={40}
                    step={0.1} /> */}
                  <Slider className="custom-slider" />
                </div>
              </div>
              <div className='slider-with-input-control'>
                <div className='input'>
                  <label htmlFor="time_period_year">Investment period (years)</label>
                  <div className='increment-decrement-input'>
                    <button className='btn' type="button"><span className="material-symbols-outlined">remove</span></button>
                    <input id='time_period_year' type="number" />
                    <button className='btn' type="button"><span className="material-symbols-outlined">add</span></button>
                  </div>
                </div>
                <div className='range-input-wrapper'>
                  {/* <input className='range-input' type="range"
                    min={1}
                    max={40}
                    step={1} /> */}
                  <Slider className="custom-slider" />
                </div>
              </div>
            </div>
            <div className='divider'></div>
            <div className='returns-view'>
              <div className='returns-text-view'>
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
              <ReturnsGraphView />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
