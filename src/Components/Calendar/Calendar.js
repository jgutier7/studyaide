import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Link } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import StudyPreferences from '../StudyPreferences/StudyPreferences';
import '../../styles/Calendar.css'; 

const localizer = momentLocalizer(moment);

const Calendar = ({ modules }) => {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    const preferences = StudyPreferences;
    if (preferences) {
      suggestStudySessions(preferences);
    }
  }, [modules]);

  const suggestStudySessions = (preferences) => {
    const suggestedSessions = [];
  
    modules.forEach((module) => {
      const { title } = module;
      const intensity = preferences.modulePreferences.find(pref => pref.title === title)?.intensity || 1;
      const daysUntilExam = preferences.modulePreferences.find(pref => pref.title === title).daysUntilExam;
      const examDate = moment().add(daysUntilExam, 'days').startOf('day').toDate();

      suggestedSessions.push({
        title: `${title} (Exam)`,
        start: examDate,
        end: examDate,
        allDay: true,
        sessionDuration: 0, 
      });

      // Generate study sessions 
      const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      let studySessionsPerWeek = {}; 

      for (let j = 1; j <= parseInt(daysUntilExam); j++) {
        const studyDate = moment().add(j, 'days').startOf('day');
        const dayOfWeek = studyDate.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
        if (!studySessionsPerWeek[title] || dayOfWeek === 0) {
          studySessionsPerWeek[title] = 0;
        }

        // Check if the studyDate falls on a preferred day 
        if (preferences.preferredDays.includes(daysInWeek[dayOfWeek])) {

          const selectedTime = preferences.preferredTimes[studySessionsPerWeek[title] % preferences.preferredTimes.length];
  
          let startTime;
          switch (selectedTime) {
            case 'Morning':
              startTime = studyDate.clone().hour(6); // Start at 6:00 AM
              break;
            case 'Afternoon':
              startTime = studyDate.clone().hour(15); // Start at 3:00 PM
              break;
            case 'Evening':
              startTime = studyDate.clone().hour(17); // Start at 5:00 PM
              break;
            default:
              startTime = null;
          }
  
          if (startTime) {
            let endTime = startTime.clone().add(parseInt(preferences.sessionLength), 'minutes');
  
            // Check for conflicts with existing study sessions
            while (hasConflict(suggestedSessions, startTime, endTime)) {
              startTime.add(1, 'second');
              endTime = startTime.clone().add(parseInt(preferences.sessionLength), 'minutes');
            }
  
            // Check for conflicts with exam timings
            if (!moment(startTime).isSame(examDate, 'day') && studySessionsPerWeek[title] < intensity) {
              suggestedSessions.push({
                title: `${title} - Study Session`,
                start: startTime.toDate(),
                end: endTime.toDate(),
                sessionDuration: parseInt(preferences.sessionLength),
                accepted: true,
                moduleClass: title, 
              });

              studySessionsPerWeek[title]++;
            }
          }
        }
      }
    });
  
    setCalendarEvents(suggestedSessions);
  };

  const hasConflict = (sessions, proposedStartTime, proposedEndTime) => {
    for (const session of sessions) {
      const sessionStartTime = moment(session.start);
      const sessionEndTime = moment(session.end);
      if (proposedStartTime.isSameOrBefore(sessionEndTime) && proposedEndTime.isSameOrAfter(sessionStartTime)) {
        return true; // Conflict found
      }
    }
    return false; // No conflict
  };

  const eventPropGetter = (event) => {
    const colors = {
      'AP Biology': '#CE51C9', 
      'AP US History': '#B5CE51',
    };
    return {
      style: {
        backgroundColor: colors[event.title.split(' - ')[0]],
      },
    };
  };

  return (
    <div className="calendar-container">
      <div className="button-container"> {}
        <Link to="/home" className="app-button">Overview</Link>
        <Link to="/calendar" className="app-button">Calendar</Link>
        <Link to="/study-preferences" className="app-button">Preferences</Link> {}
      </div>
      <h1>Study Plan Calendar</h1>
      <BigCalendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventPropGetter}
        defaultView="week"
        onSelectEvent={(event) => window.location.href = `/whiteboard/${event.moduleClass}`} 
      />
    </div>
  );
};

export default Calendar;
