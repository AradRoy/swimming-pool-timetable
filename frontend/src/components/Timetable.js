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

  const Content = ({ children, appointmentData, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <ListGroup>
        {appointmentData.athletes.map((name) => {
          return <ListGroup.Item>{name}</ListGroup.Item>;
        })}
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
          startDayHour={7}
          endDayHour={21}
          cellDuration={60}
        />
        <Appointments />
        <Resources
          data={[
            {
              id: "coach",
              fieldName: "coach",
              title: "Coach",
              instances: [
                { id: "Yotam", text: "Coach Yotam", color: red[500] },
                { id: "Yonni", text: "Coach Yonni", color: lightGreen[500] },
                { id: "Johnny", text: "Coach Johnny", color: blue[500] },
              ],
              allowMultiple: false,
              isMain: true,
            },
          ]}
          mainResourceName="coach"
        />
        <AppointmentTooltip contentComponent={Content} />
        <AppointmentForm readonly />
      </Scheduler>
    </>
  );
}
export default Timetable;
