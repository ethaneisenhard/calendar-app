import React from "react";
import { Link } from "gatsby";
import useEventDataApi from "../utils/useEventDataApi";
import { returnDailyEvents } from "../utils/returnDailyEvents";
import moment from "moment";
import calendar from "../images/icons/calendar.svg";

const DailyActivity = props => {

  var capitalizeCommunity = props.community.charAt(0).toUpperCase() + props.community.slice(1);

  var tableName = "Calendar-"+capitalizeCommunity;

  const [{ eventData, status }] = useEventDataApi(
    "http://localhost:3000/calendar/" + tableName + "/"
  );

  const dailyActivityList = eventData => {
    var eventDataAndDailyEvents = returnDailyEvents(eventData)

    console.log(eventDataAndDailyEvents)

    var sortByDate = eventDataAndDailyEvents.sort(function(a, b) {
      return new Date(b.info.dailyEquation.ogStartDate) - new Date(a.info.dailyEquation.ogStartDate);
    });

    function isDailyActivity(value) {
      return (
        value.info.dailyActivity === "true" &&
        moment(props.dayDate).isSame(value.info.startDate, "day") === true
      );
    }

    var dailyActivityList = sortByDate.filter(isDailyActivity);

    // dailyActivityList.forEach(function(item, index){
    //   if(item.info.dailyEquation.daysOfWeek !== "_"){

    //     var checkDay = moment(props.dayDate).format('dddd');


    //     console.log(checkDay)
  
    //     // item.info.dailyEquation.daysOfWeek.forEach(function(item, index){
  
    //     //   if(checkDay === item){
    //     //     dailyActivityList.shift();
    //     //   }
  
    //     // })
  
    //   }
    // });

    console.log(dailyActivityList)

    var dailyActivityLinks = dailyActivityList.map(function(item, index) {
      return (
        <div key={index} className="dailyActivityLink">
          <Link to={`/app/calendar/${props.community}/rsvpEvent/${item.id}/${moment(item.info.startDate).format("MM-DD-YYYY")}`}>
            <div className="time">
              <span className="startTime">
                {moment(item.info.dailyEquation.ogStartDate).format("LT")}
              </span>
              <span className="endTime">
                {moment(item.info.dailyEquation.ogEndDate).format("LT")}
              </span>
            </div>
            <div className="location">
              <span>Location: {item.info.eventLocation}</span>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <>
        <div className="dailyActivity-header">
          <h2>Daily Activities</h2>
          <p>
            <img src={calendar} alt="" />
            {moment(props.dayDate).format(
              "dddd, MMMM Do, YYYY"
            )}
          </p>
        </div>
        <div>{dailyActivityLinks}</div>
      </>
    );
  };

  return (
    <section id="dailyActivity">
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
        <div>
          <div className="formHero"></div>
          {/* <pre>{JSON.stringify(eventData, null, 4)}</pre> */}
          <div className="formTicket">{dailyActivityList(eventData)}</div>
        </div>
      )}
    </section>
  );
};

export default DailyActivity;
