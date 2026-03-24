import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { format } from 'date-fns';

export function TopSection({ time, is24Hour, toggleFormat }) {
  // Format time based on is24Hour
  // time is a Date object adjusted for the target timezone
  
  const formatStr = is24Hour ? 'HH:mm:ss' : 'hh:mm:ss';
  const timeStr = format(time, formatStr);
  
  // Date string e.g. "Monday, Mar 24 2025"
  const dateStr = format(time, 'EEEE, MMM d yyyy');

  return (
    <div className="top-section">
      <div className="clock-display">
         <h1 className="text-huge">{timeStr}</h1>
      </div>
      
      <div className="info-bar">
        <div className="left">
          <span className="label">Current</span>
        </div>
        
        <div className="center">
           <div className="sun-info">
             <Sun size={16} className="icon-sun" />
             <span> : 07:12 - 17:17 (10h 06m)</span>
           </div>
           <div className="date-info">
             {dateStr}
           </div>
        </div>
        
        <div className="right">
          <button className="toggle-btn" onClick={toggleFormat}>
            <span className={!is24Hour ? 'active' : ''}>12h</span>
            <span className={is24Hour ? 'active' : ''}>24h</span>
          </button>
        </div>
      </div>
    </div>
  );
}
