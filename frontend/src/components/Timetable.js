import React from 'react'
import { ViewState, EditingState, IntegratedEditing } from "@devexpress/dx-react-scheduler"
import { WeekView, Scheduler, Appointments, AppointmentForm, AppointmentTooltip, Resources } from '@devexpress/dx-react-scheduler-material-ui';
import { red, lightGreen, blue } from '@mui/material/colors';



function Timetable(props) {
    const lessondata = props.lessonArray.map((lesson) => {
        return ({
            title: lesson.title,
            startDate: lesson.start_time,
            endDate: lesson.end_time,
            coach: lesson.coach,
            athletes: lesson.athletes,
        })
    })
    return (
        <>
            <Scheduler locale='en-IL' data={lessondata} height={700}>
                <ViewState currentDate="2022-09-03" />
                <EditingState />
                <IntegratedEditing />
                <WeekView
                    excludedDays={[5, 6]}
                    startDayHour={11}
                    endDayHour={24}
                    cellDuration={60}
                />
                <Appointments />
                <Resources
                    data={
                        [
                            {
                                id: 'coach',
                                fieldName: 'coach',
                                title: 'Coach',
                                instances: [
                                    { id: 'Yotam', text: 'Yotam', color: red[500] },
                                    { id: 'Yonni', text: 'Yonni', color: lightGreen[500] },
                                    { id: 'Johnny', text: 'Johnny', color: blue[500] }

                                ],
                                allowMultiple: false,
                                isMain: true
                            }
                        ]
                    }
                    mainResourceName='coach'
                />
                <AppointmentTooltip />
                <AppointmentForm
                    readonly />
            </Scheduler>
        </>
    )
}
export default Timetable
