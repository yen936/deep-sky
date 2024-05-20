import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import './GridContainer.css';
import { Chart as ChartJS, CategoryScale, LinearScale,LogarithmicScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const RadioSignalsChart = ({ apiUrl }) => {
    const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [spectrum, setSpectrum] = useState(false);
  const [antenna, setAntenna] = useState(false);
  const [orbit, setOrbit] = useState(false);

  const handleSpectrum = () => {
    setSpectrum(true);
    setTimeout(() => { setSpectrum(false);},2000);
  };

  const handleAntenna = () => {
    setAntenna(true);
    setTimeout(() => { setAntenna(false);},4000);

  };

  const handleOrbit = () => {
    setOrbit(true);
    setTimeout(() => { setOrbit(false);},18000);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    if (!isLoading) {
      const intervalId = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 1); // 1ms interval

      return () => clearInterval(intervalId);
    }
  }, [isLoading, data]);

  const currentData = data.slice(0, index + 1);

  const pointBackgroundColors = currentData.map(d => d['Bit Error Rate'] > .003 ? 'rgba(255, 99, 132, 0.8)' : 'rgba(54, 162, 235, 0.8)');
  const pointBorderColors = currentData.map(d => d['Bit Error Rate'] > .003 ? 'rgba(255, 99, 132, 0.8)' : 'rgba(54, 162, 235, 0.8)');

  const chart1Data = {
    labels: currentData.map(d => new Date(d.Timestamp * 100)), // 1ms per unit
    datasets: [
      {
        label: 'Bit Error Rate',
        data: currentData.map(d => d['Bit Error Rate']),
        borderColor: 'grey',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointBackgroundColor: pointBackgroundColors,
        pointBorderColor: pointBorderColors,
        yAxisID: 'y',
      }
    ],
  };

  const chart2Data = {
    labels: currentData.map(d => new Date(d.Timestamp * 100)), // 1ms per unit
    datasets: [
      {
        label: 'Amplitude',
        data: currentData.map(d => d.Amplitude),
        borderColor: 'grey',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointBackgroundColor: pointBackgroundColors,
        pointBorderColor: pointBorderColors,
        yAxisID: 'y',
      },
     
    ],
  };

  const chart3Data = {
    labels: currentData.map(d => new Date(d.Timestamp * 100)), // 1ms per unit
    datasets: [
{
        label: 'Signal Strength',
        data: currentData.map(d => d['Signal Strength']),
        borderColor: 'grey',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointBackgroundColor: pointBackgroundColors,
        pointBorderColor: pointBorderColors,
        yAxisID: 'y',
      },
     
    ],
  };

  const chart4Data = {
    labels: currentData.map(d => new Date(d.Timestamp * 100)), // 1ms per unit
    datasets: [

      {
        label: 'Signal to Noise Ratio',
        data: currentData.map(d => d.SNR),
        borderColor: 'grey',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointBackgroundColor: pointBackgroundColors,
        pointBorderColor: pointBorderColors,
        yAxisID: 'y',
      },
    ],
  };

  const options1 = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Timestamp (ms)',
        },
      },
      y: {
        type: 'logarithmic',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Bit Error Rate',
        },
      },
    },
  };

  const options2 = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Timestamp (ms)',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Amplitude',
        },
      },
    },
  };

  const options3 = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Timestamp (ms)',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Signal Strength',
        },
      },
    },
  };

  const options4 = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Timestamp (ms)',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'SNR',
        },
      },
    },
  };

  return <>
  <div className='grid2'>
      <div className="grid-container">
      <div className="chart-container">

  <Line data={chart1Data} options={options1} />
  </div>
  <div className="chart-container">

  <Line data={chart2Data} options={options2} />
  </div>
  <div className="chart-container">

  <Line data={chart3Data} options={options3} />
  </div>
  <div className="chart-container">

  <Line data={chart4Data} options={options4} />
  </div>

  </div>
  <div className="buttons2">
        <img className={spectrum?"imagesize": 'invisible'} src="https://www.clipartbest.com/cliparts/dTr/6xR/dTr6xRKpc.gif" alt="Cartoon Antenna Emitting Waves"/>
        <button  onClick={() => handleSpectrum()} className='button-142'>Spectrum Hop</button>
        <img className={antenna?"imagesize": 'invisible'} src="https://www.animatedimages.org/data/media/324/animated-antenna-image-0026.gif" alt="Cartoon Antenna Emitting Waves"/>
        <button  onClick={() => handleAntenna()} className='button-142'>Redirect Antenna</button>
        <img className={orbit?"imagesize": 'invisible'} src="https://i.gifer.com/origin/8e/8e2968c91f8099be149b7c3c927a4e62_w200.gif" alt="Cartoon Antenna Emitting Waves"/>
        <button  onClick={() => handleOrbit()} className='button-142'>Orbital Maneuver</button>
      </div>
  </div>

  </>;
};

export default RadioSignalsChart;