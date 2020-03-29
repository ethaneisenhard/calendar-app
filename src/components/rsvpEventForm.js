import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useGlobal from "../store/eventData";
import useEventDataApi from "../utils/useEventDataApi";
import { returnDailyEvents } from "../utils/returnDailyEvents";
import moment from "moment";
import CalendarIcon from "../images/icons/CalendarIcon.js";
import HoursIcon from "../images/icons/HoursIcon.js";
import LocationIcon from "../images/icons/LocationIcon.js";
import * as utils from "../utils/formEvents";
import { Link } from "gatsby";

const RSVPEvent = props => {
  const { register, handleSubmit, errors } = useForm();
  const [globalState, globalActions] = useGlobal();

  var capitalizeCommunity =
    props.community.charAt(0).toUpperCase() + props.community.slice(1);

  var tableName = "Calendar-" + capitalizeCommunity;

  const rsvpEvent = data => {
    const stringData = JSON.stringify(data);
    globalActions.rsvpEvent(stringData);

    alert("RSVP Sent!");
    console.log("rsvpEvent");

    window.location.reload(true);
    
  };

  const [{ eventData, status }] = useEventDataApi(
    "http://localhost:3000/calendar/" +
      tableName +
      "/" +
      "event/" +
      props.eventID +
      ""
  );

  useEffect(() => {
    utils.formEvents();

    if(status === "SUCCESS"){

      if(seatsLeft === "Unlimited"){
        document.querySelector(".seatsLeft").classList.add("is-hidden")
      }
     
    }

  });

  if(eventData !== undefined){

    var dateOfRSVP = moment(props.dayDate).format("MM/DD/YYYY");

    var getList;
    var getRSVP;
    var totalRSVPs = 0;
    var seatsLeft;

    if(eventData[0].info.rsvp !== undefined){

      getRSVP = eventData[0].info.rsvp;
    
      Object.keys(eventData[0].info.rsvp).forEach(function(key, index) {
        if(eventData[0].info.rsvp[key].dateOfEvent == dateOfRSVP){
          getList = eventData[0].info.rsvp[key].list
        }
      });

      if(status === "SUCCESS"){

        if(getList !== undefined){

            getList.forEach(function (element){
              var guests = element["guests"]
              guests = parseInt(guests, "10")
              var guestPlusOne = guests + 1;
              totalRSVPs = totalRSVPs + guestPlusOne
            })

            if(eventData[0].info.availableSpots !== "_"){
              seatsLeft = eventData[0].info.availableSpots - totalRSVPs;
            } else{
              seatsLeft = "Unlimited"
            }

        } else if(eventData[0].info.availableSpots !== "_"){
          seatsLeft = eventData[0].info.availableSpots - totalRSVPs;
        } else{
          seatsLeft = "Unlimited"
        }

      }
    } else{
      seatsLeft = "Unlimited"
    }

  }



  return (
    <section id="rsvpEvent">
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
        <div>
          <div className="formHero"></div>
          {/* <pre>{JSON.stringify(eventData, null, 4)}</pre> */}
          <div className="formTicket split">
            <div className="formTicket-left">
              <h3>{eventData[0].title}</h3>
              <p>{eventData[0].info.description}</p>
              <hr></hr>
              <ul>
                <li>
                  <CalendarIcon />
                  <span>
                    {moment(props.dayDate).format(
                      "dddd, MMMM Do, YYYY"
                    )}
                  </span>
                </li>
                <li>
                  <HoursIcon />
                  <span>
                    {`${moment(eventData[0].info.dailyEquation.ogStartDate).format("LT")}-${moment(eventData[0].info.dailyEquation.ogEndDate).format("LT")}`}
                  </span>
                </li>
                <li>
                  <LocationIcon />
                  <span>{eventData[0].info.eventLocation}</span>
                </li>
              </ul>
              <h6>Event Details</h6>
              <p>{eventData[0].info.description}</p>
            </div>
            {/* all forms must be required */}
            <div id = "classIsFullMessage" className = "formTicket-right is-hidden">
                    <h4>Class is full!</h4>
                    <p>
                      Please look at the <Link to={`app/calendar/${capitalizeCommunity}`}>Calendar</Link> for upcoming events.
                    </p>
            </div>
            <form
              id="rsvpEventForm"
              className="formEvents formTicket-right"
              onSubmit={handleSubmit(rsvpEvent)}
            >
              <div className = "rsvpHeader">
                <h4>RSVP</h4>
                <p className="seatsLeft">{seatsLeft <= 0 ? "Class Is Full" : seatsLeft + " Open Seats Left"}</p>
              </div>
              <input
                name="id"
                defaultValue={props.eventID}
                ref={register}
                hidden
              />
              <input
                name="title"
                defaultValue={eventData[0].title}
                ref={register}
                hidden
              />
              <input
                name="community"
                defaultValue={tableName}
                ref={register}
                hidden
              />
              <input
                name="rsvpList"
                defaultValue={JSON.stringify(getList)}
                ref={register}
                hidden
              />
              <input
                name="rsvpOBJ"
                defaultValue={JSON.stringify(getRSVP)}
                ref={register}
                hidden
              />
              <input
                name="dateOfEvent"
                defaultValue={moment(props.dayDate).format("MM/DD/YYYY")}
                ref={register}
                hidden
              />
              <div className="input-wrap">
                <label htmlFor="fullName">Name</label>
                <input name="fullName" defaultValue="" ref={register({ required: true })} />
              </div>
              {errors.fullName && <p className="error">Please enter your Full Name</p>}
              <div className="input-wrap">
                <label htmlFor="email">Email</label>
                <input name="email" defaultValue="" ref={register({ required: true })} />
              </div>
              {errors.email && <p className="error">Please enter your Email</p>}
              <div className="input-wrap">
                <label htmlFor="guests">Amount of Guests</label>
                <input name="guests" defaultValue="" ref={register({ required: true })} />
              </div>
              {errors.guests && <p className="error">Please enter the amount of Guests</p>}
              <input type="submit" value="RSVP" className="btn btn-custom" />
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default RSVPEvent;
