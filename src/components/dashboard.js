import React from "react";
import { Link } from "gatsby";
import useEventDataApi from "../utils/useEventDataApi";
import { sortAndGroupByDate} from "../utils/sortAndGroupByDate";
import { returnDailyEvents } from "../utils/returnDailyEvents";
import moment from "moment";
import UpdateIcon from "../images/icons/UpdateIcon.js"

const Dashboard = props => {

  var currentPath = window.location.pathname;

  var capitalizeCommunity = props.community.charAt(0).toUpperCase() + props.community.slice(1);

  var tableName = "Calendar-"+capitalizeCommunity;

  const [{ eventData, status }] = useEventDataApi(
    "http://localhost:3000/calendar/" + tableName + "/"
  );

  const publishedEvents = eventData => {

   var eventDataAndDailyEvents = returnDailyEvents(eventData)

   const formatData = sortAndGroupByDate(eventDataAndDailyEvents)
     
    const dailyActivityLink = formatData => {
      let compareDate = "";
      let formatCompareDate = ""; 
      
      var publishedLinks = formatData.map(function(item, index) {
        
        compareDate = item.date
        formatCompareDate = compareDate.replace(/-/g, '/');

        return (
          <div className = "eventContainer" key={index}>
            <p className = "date" key = {item.date}>{moment(item.date).format("dddd, MMMM Do, YYYY")}</p>
            {item.events.map(function(value, spot) {
              var rsvpCount = 0;
            
              if(value.info.rsvp !== undefined){
                var dateIndex = "d" + formatCompareDate;

                if(value.info.rsvp[dateIndex] !== undefined){
                  if(formatCompareDate === value.info.rsvp[dateIndex].dateOfEvent){
                    rsvpCount = value.info.rsvp[dateIndex].list.length;
                  }
                }
                
              }

              return (
                <div key={spot} className = "linkContainer">
                    <Link to = {`${currentPath}/updateEvent/${value.id}`}>
                        {value.title}
                        {value.info.dailyActivity === "true"? <span className="rsvpCount">{rsvpCount}</span> : <UpdateIcon/>}
                      </Link>
                </div>
              );
            })}
          </div>
        );
      });

      return publishedLinks;
    };

    return (
      <>
        <h4>Published Events</h4>
        <div>{dailyActivityLink(formatData)}</div>
      </>
    );
  };

  return (
    <section id="dashboard">
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
        <>
          <header className="dashboard-header">
            <div className="dashboard-header-left">
              <div className="panel">
                <h3>Admin Panel</h3>
                <p>{capitalizeCommunity}</p>
              </div>
              <Link to="/">Sign Out</Link>
            </div>
            <div className="dashboard-header-right">
              <Link to={`${currentPath}/createEvent`}>Create Event</Link>
              <Link to={`${currentPath}/updateEvent`}>Update Event</Link>
              <Link to={`${currentPath}/deleteEvent`}>Delete Event</Link>
            </div>
          </header>
          <section className="publishedEvents">
            {publishedEvents(eventData)}
          </section>
        </>
      )}
    </section>
  );
};

export default Dashboard;
