import React, { useState } from "react";
import useEventDataApi from "../utils/useEventDataApi";
import { sortAndGroupByDate } from "../utils/sortAndGroupByDate";
import { returnDailyEvents } from "../utils/returnDailyEvents";
import moment from "moment";
import { Link } from "gatsby";
import HoursIcon from "../images/icons/HoursIcon.js";
import CalendarIcon from "../images/icons/CalendarIcon.js";
import ArrowIcon from "../images/icons/ArrowIcons.js";

const Calendar = props => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  var capitalizeCommunity = props.community.charAt(0).toUpperCase() + props.community.slice(1);

  var tableName = "Calendar-"+capitalizeCommunity;

  const [{ eventData, status }] = useEventDataApi(
    "http://localhost:3000/calendar/" + tableName + "/"
  );

  const eventType = () => {
    return (
      <div>
        <select
          className="custom-select"
          name="eventTypeDropdown"
          id="eventTypeDropdown"
          onChange={changeEventType}
        >
          <option value="allEvents">All Events</option>
          <option value="specialEvents">Special Event</option>
          <option value="dailyEvents">Daily Events</option>
        </select>
      </div>
    );
  };

  const view = () => {
    return (
      <div>
        <select
          className="custom-select"
          name="viewDropdown"
          id="viewDropdown"
          onChange={changeView}
        >
          <option value="calendar">Month</option>
          <option value="list">List</option>
          <option value="card">Card</option>
        </select>
      </div>
    );
  };

  const dateSelect = () => {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="dateSelect row">
        <button className="btn btn-reset" onClick={prevMonth}>
          <ArrowIcon style={{ transform: "rotate(180deg)" }} />
        </button>
        <div className="dateSelect-middle">
          <span className="month">
            {moment(currentDate).format(dateFormat)}
          </span>
        </div>
        <button className="btn btn-reset" onClick={nextMonth}>
          <ArrowIcon />
        </button>
      </div>
    );
  };
  const days = () => {
    const days = [];
    const weekdays = moment.weekdays();

    weekdays.map(day => {
      return days.push(
        <div className="column col-center" key={day}>
          {day}
        </div>
      );
    });

    return <div className="days row">{days}</div>;
  };

  const list = eventData => {
    var eventDataAndDailyEvents = returnDailyEvents(eventData)

    const monthStart = moment(currentDate).startOf("month");

    function isSameMonth(value) {
      return moment(monthStart).isSame(value.info.startDate, "month") === true;
    }

    var filterByMonth = eventDataAndDailyEvents.filter(isSameMonth);

    var formatData = sortAndGroupByDate(filterByMonth);

    console.log(formatData)

    var eventList = formatData.map(function(item, index) {
      return (
        <div key={index} className="list">
          <div className="date">
            <span className="dayOfWeek">{moment(item.date).format("ddd")}</span>
            <br></br>
            <span className="number">{moment(item.date).format("D")}</span>
          </div>
          <div className="events-wrapper">
            {item.events.map(function(value, spot) {
              var eventClass;
              var id;
              var path;
              if (value.info.dailyActivity === "true") {
                eventClass = "dailyActivity";
                id = moment(value.info.startDate).format("MM-DD-YYYY");
                path = "dailyActivity"
              } else {
                eventClass = "specialActivity";
                id = value.id;
                path = "rsvpEvent"
              }

              return (
             
                  <Link key={spot} 
                    to={`${window.location.pathname}/${path}/${id}`}
                    className={`${eventClass} event`}
                  >
                    <div>
                      <span>{value.title}</span>
                      <span>
                        {moment(value.info.startDate).format("LT")} -{" "}
                        {moment(value.info.endDate).format("LT")}
                      </span>
                    </div>
                    <ArrowIcon fill="white" />
                  </Link>
            
              );
            })}
          </div>
        </div>
      );
    });
    return eventList;
  };

  const cards = eventData => {
    var eventDataAndDailyEvents = returnDailyEvents(eventData)

    const monthStart = moment(currentDate).startOf("month");

    var sortByDate = eventDataAndDailyEvents.sort(function(a, b) {
      return new Date(a.info.startDate) - new Date(b.info.startDate);
    });

    function isSameMonth(value) {
      return moment(monthStart).isSame(value.info.startDate, "month");
    }

    var filterByMonth = sortByDate.filter(isSameMonth);

    var cardLayout = filterByMonth.map(function(item, index) {
      var eventClass;
      var id;
      var path;
      if (item.info.dailyActivity === "true") {
        eventClass = "dailyActivity";
        id = moment(item.info.startDate).format("MM-DD-YYYY");
        path = "dailyActivity"
      } else {
        eventClass = "specialActivity";
        id = item.id;
        path = "rsvpEvent"
      }

      return (
        <div key={index} className={`card ${eventClass}`}>
          <div className="card-top"></div>
          <div className="card-middle">
            <ul>
              <li className="title">{item.title}</li>
              <li className="date">
                <CalendarIcon/>
                {moment(item.info.startDate).format("dddd, MMMM Do YYYY")}
              </li>
              <li className="time">
                <HoursIcon/>
                {moment(item.info.startDate).format("LT")}-
                {moment(item.info.endDate).format("LT")}
              </li>
            </ul>
          </div>
          <div className="card-bottom">
            <Link
              className=""
              to={window.location.pathname + `/${path}/${id}`}
            >
              Event Details
              <ArrowIcon className="arrow"/>
            </Link>
          </div>
        </div>
      );
    });

    return cardLayout;
  };

  const cells = eventData => {
    var eventDataAndDailyEvents = returnDailyEvents(eventData)
    const monthStart = moment(currentDate).startOf("month");
    const monthEnd = moment(monthStart).endOf("month");
    const startDate = moment(monthStart).startOf("week");
    const endDate = moment(monthEnd).endOf("week");

    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = moment(day).format(dateFormat);
        // const cloneDay = day;

        var currentDay = moment(day).toDate();

        var eventDetails = undefined;

        if (eventDataAndDailyEvents !== undefined) {
          var eventDataCounter = 0;

          for (let i = 0; i < eventDataAndDailyEvents.length; i++) {
            var startDateDay = eventDataAndDailyEvents[i].info.startDate;
            var compareTest = moment(startDateDay).isSame(currentDay, "day");
            if (compareTest === true) {
              eventDataCounter = eventDataCounter + 1;

              var eventID = eventDataAndDailyEvents[i].id;
              var title = eventDataAndDailyEvents[i].title;
              var startDateDetails = moment(eventDataAndDailyEvents[i].info.startDate).format("MM-DD-YYYY");
              var startTime = moment(eventDataAndDailyEvents[i].info.startDate).format("LT");
              var endTime = moment(eventDataAndDailyEvents[i].info.endDate).format("LT");
              var dailyActivity = eventDataAndDailyEvents[i].info.dailyActivity;
              eventDetails = [
                eventID,
                title,
                startTime,
                endTime,
                dailyActivity
              ];

              if (eventDataCounter === 1) {
                var eventDetailArray = [eventDetails];
              }

              if (eventDataCounter >= 2) {
                eventDetailArray.push(eventDetails);
              }
            }
          }
        }

        var LinkToEvent;
        var LinkToDailyActivities = "";
        var LinkToEventArray = [];

        var eventDetailCounter = 0;

        if (eventDetails !== undefined) {
          for (let i = 0; i < eventDetailArray.length; i++) {
            eventDetailCounter = eventDetailCounter + 1;

            let id = eventDetailArray[i][0];
            let title = eventDetailArray[i][1];
            let startTime = eventDetailArray[i][2];
            let endTime = eventDetailArray[i][3];
            let dailyActivity = eventDetailArray[i][4];

            let eventClass = "";
            let path = "";
            let eventLinkText = "";

            if (dailyActivity === "true") {
              eventClass = "dailyActivity";
              id = startDateDetails;
              path = "dailyActivity";
              startTime = moment(startTime).format("LT");
              eventLinkText = "Daily Activities";

              LinkToDailyActivities = (
                <Link
                  key={eventDetailCounter}
                  className={`linkToEvent ${eventClass}`}
                  to={window.location.pathname + `/${path}/${id}`}
                >
                  {eventLinkText}
                </Link>
              );

              LinkToEvent = "";

            } else if (dailyActivity === "false") {
              eventClass = "specialActivity";
              // startTime = startTime
              path = "rsvpEvent";
              eventLinkText = title + ":" + startTime + "-" + endTime;

              LinkToEvent = (
                <Link
                  key={eventDetailCounter}
                  className={`linkToEvent ${eventClass}`}
                  to={window.location.pathname + `/${path}/${id}/${startDateDetails}`}
                >
                  {eventLinkText}
                </Link>
              );

              if (dailyActivity === "false") {
                LinkToEventArray.push(LinkToEvent);
              }
            }
          }
        } else {
          LinkToEvent = "";
          LinkToDailyActivities = "";
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
            <div className="allEventsContainer">
              <span className="dailyActivityLinkContainer">
                {LinkToDailyActivities}
              </span>
              <span className="eventLinkContainer">
                {eventDetailCounter >= 2 ? LinkToEventArray : LinkToEvent}
              </span>
            </div>
          </div>
        );
        day = moment(day).add(1, "days"); // dateFns.addDays(day, 1)
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const nextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month")); //
  };
  const prevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month"));
  };

  const changeView = () => {
    var dropDown = document.getElementById("viewDropdown");
    var calendarView = document.getElementById("calendar-view");
    var listView = document.getElementById("list-view");
    var cardView = document.getElementById("card-view");
    var dropDownValue = dropDown.value;

    function addClassHidden(element) {
      element.classList.add("is-hidden");
    }
    function removeClassHidden(element) {
      element.classList.remove("is-hidden");
    }

    if (dropDownValue === "calendar") {
      removeClassHidden(calendarView);
      addClassHidden(listView);
      addClassHidden(cardView);
    } else if (dropDownValue === "list") {
      removeClassHidden(listView);
      addClassHidden(calendarView);
      addClassHidden(cardView);
    } else if (dropDownValue === "card") {
      removeClassHidden(cardView);
      addClassHidden(calendarView);
      addClassHidden(listView);
    }
  };

  const changeEventType = () => {
    var dropDown = document.getElementById("eventTypeDropdown");
    var specialEvents = document.querySelectorAll(".specialActivity");
    var dailyEvents = document.querySelectorAll(".dailyActivity");
    var dropDownValue = dropDown.value;

    function loopNodesRemove(nodes) {
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].classList.remove("is-hidden");
      }
    }
    function loopNodesAdd(nodes) {
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].classList.add("is-hidden");
      }
    }

    if (dropDownValue === "allEvents") {
      loopNodesRemove(dailyEvents);
      loopNodesRemove(specialEvents);
    } else if (dropDownValue === "specialEvents") {
      loopNodesRemove(specialEvents);
      loopNodesAdd(dailyEvents);
    } else if (dropDownValue === "dailyEvents") {
      loopNodesRemove(dailyEvents);
      loopNodesAdd(specialEvents);
    }
  };

  // const onDateClick = day => {
  //   setSelectedDate(day)
  //   alert(day);
  // }

  return (
    <section id="calendar-page">
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
        <>
          <section className="community">
            <div className = "communityImgLeft"/>
            <div className="communityText">
              <h2><span className="communityName">{capitalizeCommunity}</span> <span>Calendar</span></h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod.
              </p>
            </div>
            <div className = "communityImgRight"/>
          </section>
          <section className="controller">
            <div className="controller-left">{dateSelect()}</div>
            <div className="controller-right">
              {eventType()}
              {view()}
            </div>
          </section>
          <section id="calendar-view" className="calendar">
            {days()}
            {cells(eventData)}
          </section>
          <section id="list-view" className="is-hidden">
            <div>{list(eventData)}</div>
          </section>
          <section id="card-view" className="is-hidden">
            <div className="card-grid">{cards(eventData)}</div>
          </section>
        </>
      )}
    </section>
  );
};
export default Calendar;
