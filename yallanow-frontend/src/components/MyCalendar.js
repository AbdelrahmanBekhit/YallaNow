import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import CalendarHeader from './CalendarHeader';
import '../index.css';

const MyCalendar = ({ events, onEventClick }) => {
    const calendarRef = useRef(null);
    const [title, setTitle] = useState('');

    useEffect(() => {
        // Move title update logic into a separate function
        const updateTitle = () => {
            if (calendarRef.current) {
                const calendarApi = calendarRef.current.getApi();
                setTitle(calendarApi.view.title);
            }
        };

        // Add an event listener for when the calendar API is ready
        // and use it to set the initial title
        if (calendarRef.current) {
            updateTitle();
        }
    }, []);

    const handleEventClick = ({ event }) => {
        if (onEventClick) onEventClick(event);
    };

    const handleViewChange = (view) => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.changeView(view);
            setTitle(calendarApi.view.title);
        }
    };

    const navigate = (action) => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi[action]();
            setTitle(calendarApi.view.title);
        }
    };



    return (
        <div className="calendar-container">
            <CalendarHeader
                onPrev={() => navigate('prev')}
                onNext={() => navigate('next')}
                onToday={() => navigate('today')}
                title={title}
                onViewChange={handleViewChange}
            />
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={false}
                events={events}
                eventClick={handleEventClick}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                datesSet={() => {
                    if (calendarRef.current) {
                        setTitle(calendarRef.current.getApi().view.title);
                    }
                }}
            />
        </div>
    );
};

export default MyCalendar;
