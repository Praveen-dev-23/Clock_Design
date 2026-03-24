import React from 'react';
import { Sun, Moon, Plus } from 'lucide-react';
import { format } from 'date-fns';

export function BottomSection({ cities, selectedCityId, onSelectCity, time }) {

    const selectedCity = cities.find(c => c.id === selectedCityId) || cities[0];

    return (
        <div className="bottom-section">
            <div className="city-header">
                <div className="city-title">
                    <h2>{selectedCity.name},</h2>
                    <h2>{selectedCity.country}</h2>
                </div>
                <div className="quote">
                    <p>Life moves fast. Stay on time</p>
                    <p>and enjoy every moment!</p>
                </div>
                <div className="add-city">
                    <span>Add Another City</span>
                    <Plus size={20} />
                </div>
            </div>

            <div className="city-grid">
                {cities.map(city => {
                    const isActive = city.id === selectedCityId;
                    // In a real app, calculate time for each city. 
                    // For now, we'll assume the parent passes a base time and we offset it, 
                    // or we just format it here if we had full timezone support.
                    // For simplicity, let's mock the display time or calculate relative to UTC.

                    return (
                        <div
                            key={city.id}
                            className={`city-card ${isActive ? 'active' : ''}`}
                            onClick={() => onSelectCity(city.id)}
                        >
                            <div className="card-top">
                                <span className="city-name">{city.name}</span>
                                <span className="utc-offset">{city.offsetLabel}</span>
                            </div>

                            <div className="card-bottom">
                                <span className="small-time">{city.timeDisplay}</span>
                                <div className="day-night">
                                    {city.isDay ? <Sun size={16} className="text-yellow" /> : <Moon size={16} className="text-blue" />}
                                    <span>{city.isDay ? 'Day' : 'Night'}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
