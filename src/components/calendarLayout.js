import React, { useState } from "react"
import moment from "moment"
import "../styles/calendarLayout.scss"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const header = () => {
    const dateFormat = "MMMM YYYY"
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="column col-center">
          <span className="month">
            {moment(currentDate).format(dateFormat)}
          </span>
        </div>
        <div className="column col-end">
          <div className="icon" onClick={nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    )
  }
  const days = () => {
    const days = []
    const weekdays = moment.weekdays()

    weekdays.map(day => {
      return days.push(
        <div className="column col-center" key={day}>
          {day}
        </div>
      )
    })

    return <div className="days row">{days}</div>
  }
  const cells = () => {
    const monthStart = moment(currentDate).startOf('month');
    const monthEnd = moment(monthStart).endOf('month');
    const startDate = moment(monthStart).startOf('week');
    const endDate =   moment(monthEnd).endOf('week');

    const dateFormat = "D"
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ""
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = moment(day).format(dateFormat)  // dateFns.format(day, dateFormat)
        const cloneDay = day
        days.push(
          <div
            className={`column cell ${
              ! moment(day).isSame(monthStart, 'month')  // dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : moment(day).isSame(selectedDate, 'day') // dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => onDateClick(moment.parseZone(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        )
        day = moment(day).add(1, "days") // dateFns.addDays(day, 1)
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = []
    }
    return <div className="body">{rows}</div>
  }
  const nextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, 'month')) //
  }
  const prevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, 'month'))
  }
  const onDateClick = day => {
    setSelectedDate(day)
    alert(day);
  }

  return (
    <div className="calendar">
      <div>{header()}</div>
      <div>{days()}</div>
      <div>{cells()}</div>
    </div>
  )
}
export default Calendar