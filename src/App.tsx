import { Toaster } from 'sonner';
import './App.css'
import CalculatorCard from './components/CalculatorCard/CalculatorCard';

function App() {
  return <>
    <Toaster toastOptions={{className:"cal-toast"}} />
    <div className='main-wrapper'>
      <CalculatorCard />
    </div>
  </>
}

export default App
