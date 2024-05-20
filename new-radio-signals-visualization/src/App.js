import React, { useState } from 'react';
import RadioSignalsChart from './RadioSignalsChart';
import './App.css';

function App() {
  const [selectedSatellite, setSelectedSatellite] = useState(null);

  const handleButtonClick = (satellite) => {
    setSelectedSatellite(satellite);
  };

  const getApiUrl = (satellite) => {
    switch (satellite) {
      case 'satellite1':
        return 'http://localhost:3001/api/radio-signals-satellite1';
      case 'satellite2':
        return 'http://localhost:3001/api/radio-signals-satellite2';
      case 'satellite3':
        return 'http://localhost:3001/api/radio-signals-satellite3';
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="buttons">
        <button onClick={() => handleButtonClick('satellite1')} className='button-14'>Satellite 1</button>
        <button onClick={() => handleButtonClick('satellite2')}  className='button-14'>Satellite 2</button>
        <button onClick={() => handleButtonClick('satellite3')}  className='button-14'>Satellite 3</button>
      </div>
      {selectedSatellite && (
        <div>
          <h2 className='databar'>{`Showing data for ${selectedSatellite}`}</h2>
          <RadioSignalsChart key={selectedSatellite} apiUrl={getApiUrl(selectedSatellite)} />
        </div>
      )}
    </div>
  );
}

export default App;
