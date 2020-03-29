import React from "react";
import { navigate } from "gatsby";
import {useForm} from "react-hook-form";
import useGlobal from "../store/eventData";
import moment from "moment"

const DeleteEvent = props => {
  const { register, handleSubmit, errors } = useForm();
  const [globalState, globalActions] = useGlobal();
  const { status, eventData } = globalState;

  const deleteEvent = data => {
    const stringData = JSON.stringify(data);

    globalActions.deleteEvent(stringData);

    alert("Deleted Event");

    navigate("app/dashboard/calendar/" + props.community + "/deleteEvent");

    console.log("deleteEvent");
  };

  var capitalizeCommunity = props.community.charAt(0).toUpperCase() + props.community.slice(1);

  var tableName = "Calendar-"+capitalizeCommunity;

  if (eventData.length === 0 && status === "INITIAL") {
    globalActions.getEventByTitle(tableName, props.eventID);
  }

  return (
    <section>
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "SUCCESS" && (
        <div>
          <div className="formHero"></div>
          <div className="formTicket">
            <ul>
              <li>Id: {eventData[0].id}</li>
              <li>Title: {eventData[0].title}</li>
              <li>Location: {eventData[0].info.eventLocation}</li>
              <li>Start Date: {moment(eventData[0].info.startDate).format("dddd MMMM Do YYYY h:mm a")}</li>
              <li>End Date: {moment(eventData[0].info.endDate).format("dddd MMMM Do YYYY h:mm a")}</li>
              <li>Description: {eventData[0].info.description}</li>
              <li>Daily Activity: {eventData[0].info.dailyActivity}</li>
              <pre>RSVP: {eventData[0].info.rsvp === "" ? "None" : JSON.stringify(eventData[0].info.rsvp, null, 4)}</pre>
            </ul>
            <form id="createEventForm" onSubmit={handleSubmit(deleteEvent)}>
              <input
                name="id"
                defaultValue={props.eventID}
                ref={register}
                hidden
              />
              <input
                name="community"
                defaultValue={tableName}
                ref={register}
                hidden
              />
              {errors.exampleRequired && <p>This field is required</p>}
              <input type="submit" value="Delete" className="btn btn-red" />
            </form>
          </div>
        </div>
      )}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {/* <pre>{JSON.stringify(eventData[0], null, 4)}</pre> */}
    </section>
  );
};

export default DeleteEvent;
