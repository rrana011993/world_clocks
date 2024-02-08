import { useState } from 'react';
import './App.css';
import ClockContainer from './components/clockContainer/ClockContainer';
import { ALERT_DURATIONS, INITIAL_TIMEZONES } from './constants';

function App() {
  const [usedTimezones, setUsedTimezones] = useState<Record<number, string>>(INITIAL_TIMEZONES)

  const [selectedDuration, setSelectedDuration] = useState(1)

  return (
    <div className="App">
      <header className="App-header">
        <div>World <span>Clocks</span></div>
        <p>A Platform for Exploring/Comparing Worldwide Time Zones</p>
      </header>
      <div className='App-body'>
        <div className='menu'>
          <label>Alert Duration</label>
          <select
            className="durations-drop-down"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(Number(e.target.value))}
          >
            {Object.keys(ALERT_DURATIONS).map((key) => <option value={ALERT_DURATIONS[key]}>{key}</option>)}
          </select>
        </div>
        <div className='body-container'>
          {Array.from({ length: 3 }).map((_, index) =>
            <ClockContainer
              id={index}
              usedTimezones={usedTimezones}
              onTimezoneChange={setUsedTimezones}
              selectedDuration={selectedDuration}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
