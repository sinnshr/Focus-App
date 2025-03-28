import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import '../styles/Calendar.css';

const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState({});
    const [selectedDate, setSelectedDate] = useState('');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const renderCalendar = () => {
        const currYear = date.getFullYear();
        const currMonth = date.getMonth();
        const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
        const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
        const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
        const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

        const days = [];
        for (let i = firstDayOfMonth; i > 0; i--) {
            days.push(<li key={`prev-${i}`} className="inactive">{lastDateOfLastMonth - i + 1}</li>);
        }
        for (let i = 1; i <= lastDateOfMonth; i++) {
            const isToday = i === new Date().getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear();
            days.push(
                <li
                    key={`curr-${i}`}
                    className={`days ${isToday ? 'active' : ''}`}
                    onClick={() => handleDateClick(i)}
                >
                    {i}
                </li>
            );
        }
        for (let i = lastDayOfMonth; i < 6; i++) {
            days.push(<li key={`next-${i}`} className="inactive">{i - lastDayOfMonth + 1}</li>);
        }
        return days;
    };

    const handleDateClick = (day) => {
        const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;
        setSelectedDate(`${months[date.getMonth()]} ${day}, ${date.getFullYear()}`);
    };

    const renderEvents = (dateKey) => {
        const eventList = events[dateKey] || [];
        return eventList.map((event, index) => <li key={index}>{event}</li>);
    };

    const addEvent = () => {
        const [eventText, setEventText] = useState('');
        <input
            type="text"
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
            placeholder="Add an event"
        />
        if (eventText && selectedDate) {
            setEvents((prevEvents) => ({
                ...prevEvents,
                [selectedDate]: [...(prevEvents[selectedDate] || []), eventText],
            }));
            eventInput.value = '';
        }
    };

    useEffect(() => {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const dateKey = `${year}-${month}-${day}`;
        setSelectedDate(dateKey);
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="event-section">
                    <h2>Events on <span id="selected-date">{selectedDate || 'Select a date'}</span></h2>
                    <ul id="event-list" className="task-list">{renderEvents(selectedDate)}</ul>
                    <input type="text" id="event-input" className="task-input" placeholder="Add an event" />
                    <button onClick={addEvent}>Add Event</button>
                </div>
                <div className="calendar-wrapper">
                    <div className="wrapper">
                        <header>
                            <p className="current-date">{`${months[date.getMonth()]} ${date.getFullYear()}`}</p>
                            <div className="icons">
                                <span id="prev" className="material-symbols-rounded" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}>chevron_left</span>
                                <span id="next" className="material-symbols-rounded" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}>chevron_right</span>
                            </div>
                        </header>
                        <div className="calendar">
                            <ul className="weeks">
                                <li>Sun</li>
                                <li>Mon</li>
                                <li>Tue</li>
                                <li>Wed</li>
                                <li>Thu</li>
                                <li>Fri</li>
                                <li>Sat</li>
                            </ul>
                            <ul className="days">{renderCalendar()}</ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar;
