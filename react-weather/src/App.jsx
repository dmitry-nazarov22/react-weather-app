import { useState } from 'react'
import './App.css'



function App() {
  return (
    <div className='wrapper'>
      <div className='header'>
        <h1 className='city'>Helsinki</h1>
        <p className='temperature'>5°C</p>
        <p className='condition'>Partly Cloudy</p>
      </div>
      <div className='weather-details'>
        <div>
          <p>Humidity</p>
          <p className='weather-details-value'>60%</p>
        </div>
        <div>
          <p>Wind Speed</p>
          <p className='weather-details-value'>7 mph</p>
        </div>
      </div>
      <div className='forecast'>
        <h2 className='forecast-header'>5-Day Forecast</h2>
        <div className='forecast-days'>
          <div className='forecast-day'>
            <p>Monday</p>
            <p className='forecast-day-details'>3°C</p>
            <p className='forecast-day-details'>cloudy</p>
          </div>
          <div className='forecast-day'>
            <p>Tuesday</p>
            <p className='forecast-day-details'>2°C</p>
            <p className='forecast-day-details'>cloudy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App