import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
  const calendarRef = useRef(null);

  const addTaskToCalendar = (date, title) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({ title, start: date, allDay: true });
  };

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"90vh"}
      />
      <TaskForm addTaskToCalendar={addTaskToCalendar} />
    </div>
  );
}

function TaskForm({ addTaskToCalendar }) {
  const handleAddTask = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const title = e.target.title.value;
    if (date && title) {
      addTaskToCalendar(date, title);
      // You can reset the form or perform other actions here
    }
  };

  return (
    <form onSubmit={handleAddTask}>
      <label>Date:</label>
      <input type="date" name="date" required />
      <br />
      <label>Title:</label>
      <input type="text" name="title" required />
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default Calendar;
