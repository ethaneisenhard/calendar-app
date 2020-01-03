import React, { useState } from "react"
import useEventDataApi from "../utils/useEventDataApi"
import moment from "moment"
import { Link } from "gatsby"
import "../styles/calendarLayout.scss"

const Calendar = props => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [{ eventData, status }] = useEventDataApi(
    "http://localhost:3000/calendar/" + props.community + "/"
  )

  const controller = () => {
    return (
      <div>
        <select name="dropdown" id="dropdown" onChange={changeView}>
          <option value="calendar">Month</option>
          <option value="list">List</option>
          <option value="card">Card</option>
        </select>
      </div>
    )
  }

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

  const list = eventData => {
    const monthStart = moment(currentDate).startOf("month")

    var eventList = eventData.map(function(item) {
      
      return moment(monthStart).isSame(item.info.startDate, "month") ===
        true ? (
        <li>
          <Link
            key={item.id}
            className=""
            to={window.location.pathname + `/rsvpEvent/${item.id}`}
          >
            {item.title}: {item.info.startDate} - {item.info.endDate}
          </Link>
        </li>
      ) : (
        ""
      )
    })

    return <ul>{eventList}</ul>
  }

  const cards = eventData => {
    const monthStart = moment(currentDate).startOf("month")

    var cardLayout = eventData.map(function(item) {
      return moment(monthStart).isSame(item.info.startDate, "month") ===
        true ? (
        <div>
          <ul>
            <li>{item.title}</li>
            <li>{item.info.description}</li>
            <li>{item.info.startDate}</li>
            <li>{item.info.endDate}</li>
          </ul>
          <Link
            key={item.id}
            className=""
            to={window.location.pathname + `/rsvpEvent/${item.id}`}
          >
            Event Details
          </Link>
        </div>
      ) : (
        ""
      )
    })

    return <div className = "card-flex">{cardLayout}</div>
  }

  const cells = eventData => {
    const monthStart = moment(currentDate).startOf("month")
    const monthEnd = moment(monthStart).endOf("month")
    const startDate = moment(monthStart).startOf("week")
    const endDate = moment(monthEnd).endOf("week")

    const dateFormat = "D"
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ""

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = moment(day).format(dateFormat)
        const cloneDay = day

        var currentDay = moment(day).toDate()

        var eventDetails = undefined

        if (eventData !== undefined) {
          var eventDataCounter = 0

          for (let i = 0; i < eventData.length; i++) {
            var startDateDay = eventData[i].info.startDate
            var compareTest = moment(startDateDay).isSame(currentDay, "day")
            if (compareTest == true) {
              eventDataCounter = eventDataCounter + 1

              var eventID = eventData[i].id
              var title = eventData[i].title
              var startTime = moment(startDate).format("LT")
              var endTime = moment(eventData[i].info.endDate).format("LT")
              eventDetails = [eventID, title, startTime, endTime]

              if (eventDataCounter === 1) {
                var eventDetailArray = [eventDetails]
              }

              if (eventDataCounter >= 2) {
                eventDetailArray.push(eventDetails)
              }
            }
          }
        }

        var LinkToEvent
        var LinkToEventArray = []

        var eventDetailCounter = 0

        if (eventDetails !== undefined) {
          for (let i = 0; i < eventDetailArray.length; i++) {
            eventDetailCounter = eventDetailCounter + 1

            const id = eventDetailArray[i][0]
            const title = eventDetailArray[i][1]
            const startTime = eventDetailArray[i][2]
            const endTime = eventDetailArray[i][3]

            LinkToEvent = (
              <Link
                key={eventDetailCounter}
                className="linkToEvent"
                to={window.location.pathname + `/rsvpEvent/${id}`}
              >
                {title}: {startTime} - {endTime}
              </Link>
            )

            LinkToEventArray.push(LinkToEvent)
          }
        } else {
          LinkToEvent = ""
        }

        days.push(
          <div
            className={`column cell ${
              !moment(day).isSame(monthStart, "month")
                ? "disabled"
                : moment(day).isSame(selectedDate, "day")
                ? "selected"
                : ""
            }`}
            key={day}
            // onClick={() => onDateClick(moment.parseZone(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            <span className="eventLinkContainer">
              {eventDetailCounter >= 2 ? LinkToEventArray : LinkToEvent}
            </span>
            <span></span>
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
    setCurrentDate(moment(currentDate).add(1, "month")) //
  }
  const prevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month"))
  }

  const changeView = () => {
    var dropDown = document.getElementById("dropdown")
    var calendarView = document.getElementById("calendar-view")
    var listView = document.getElementById("list-view")
    var cardView = document.getElementById("card-view")
    var dropDownValue = dropDown.value
    if (dropDownValue === "calendar") {
      calendarView.classList.remove("is-hidden")
      listView.classList.add("is-hidden")
      cardView.classList.add("is-hidden")
    } else if (dropDownValue === "list") {
      listView.classList.remove("is-hidden")
      calendarView.classList.add("is-hidden")
      cardView.classList.add("is-hidden")
    } else if (dropDownValue === "card") {
      cardView.classList.remove("is-hidden")
      listView.classList.add("is-hidden")
      calendarView.classList.add("is-hidden")
    }
  }

  // const onDateClick = day => {
  //   setSelectedDate(day)
  //   alert(day);
  // }

  return (
    <section>
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
        <div>
          <section className="controller">
            {header()}
            {controller()}
          </section>
          <section id="calendar-view" className="calendar">
            <div>
              <div>{days()}</div>
              <div>{cells(eventData)}</div>
            </div>
          </section>
          <section id="list-view" className="is-hidden">
            <div>{list(eventData)}</div>
          </section>
          <section id="card-view" className="is-hidden">
            <div>{cards(eventData)}</div>
          </section>
        </div>
      )}
    </section>
  )
}
export default Calendar
