import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  WeekView,
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { red, lightGreen, blue } from "@mui/material/colors";

function Timetable(props) {
  const lessondata = props.lessonArray.map((lesson) => {
    return {
      title: lesson.title,
      startDate: lesson.start_time,
      endDate: lesson.end_time,
      coach: lesson.coach,
      athletes: lesson.athlete_names,
    };
  });
  const Appointment = ({ children, style, ...restOfProps }) => (
    <Appointments.Appointment
      {...restOfProps}
      style={{
        ...style,
        backgroundColor: "#FFC187",
        borderRadius: "8px",
      }}
    >
      {children}
    </Appointments.Appointment>
  );

  const Content = ({ children, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <ListGroup>
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </AppointmentTooltip.Content>
  );
  return (
    <>
      <Scheduler locale="en-IL" data={lessondata} height={700}>
        <ViewState currentDate="2022-09-03" />
        <EditingState />
        <IntegratedEditing />
        <WeekView
          excludedDays={[5, 6]}
          startDayHour={11}
          endDayHour={24}
          cellDuration={60}
        />
        <Appointments appointmentComponent={Appointment} />

        <AppointmentTooltip contentComponent={Content} />
        <AppointmentForm readonly />
      </Scheduler>
    </>
  );
}
export default Timetable;
