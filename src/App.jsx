import { useState, useEffect } from 'react';
import { TopSection } from './components/TopSection';
import { BottomSection } from './components/BottomSection';
import { addHours, format, subHours } from 'date-fns';

function App() {
  const [now, setNow] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);
  const [selectedCityId, setSelectedCityId] = useState('trichy');

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Define cities with their offsets relative to UTC
  // We will assume "now" is the user's local time, but for the "Global Clock" feel, 
  // maybe we should just use UTC time as the base and apply offsets.
  // Or we use the selected city's timezone as the "Main Display".

  // Let's get UTC time from "now"
  const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  const getCityTime = (offset) => addHours(utcNow, offset);

  const cities = [
    {
      id: 'ny',
      name: 'New York',
      country: 'USA',
      offset: -5,
      offsetLabel: 'UTC-5',
      isDay: false
    },
    {
      id: 'london',
      name: 'London',
      country: 'United Kingdom',
      offset: 0,
      offsetLabel: 'UTC+0',
      isDay: true
    },
    {
      id: 'trichy',
      name: 'Trichy',
      country: 'India',
      offset: 5.5,
      offsetLabel: 'UTC+5:30',
      isDay: true
    },
    {
      id: 'tokyo',
      name: 'Tokyo',
      country: 'Japan',
      offset: 9,
      offsetLabel: 'UTC+9',
      isDay: false
    }
  ];

  // Calculate times for all cities
  const citiesWithTime = cities.map(city => {
    const time = getCityTime(city.offset);
    const hour = parseInt(format(time, 'H'));
    const isDay = hour >= 6 && hour < 18;
    return {
      ...city,
      timeObj: time, // Keep raw date for TopSection if selected
      timeDisplay: format(time, is24Hour ? 'HH:mm' : 'hh:mm'),
      isDay
    };
  });

  const activeCity = citiesWithTime.find(c => c.id === selectedCityId) || citiesWithTime[0];

  return (
    <div className="app-container">
      <TopSection
        time={activeCity.timeObj}
        is24Hour={is24Hour}
        toggleFormat={() => setIs24Hour(!is24Hour)}
      />

      <BottomSection
        cities={citiesWithTime}
        selectedCityId={selectedCityId}
        onSelectCity={setSelectedCityId}
      />
    </div>
  );
}

export default App;
