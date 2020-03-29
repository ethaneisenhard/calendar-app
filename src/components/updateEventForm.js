import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { useForm } from "react-hook-form";
import useGlobal from "../store/eventData";
import DatePicker from "react-datepicker";
import MailIcon from "../images/icons/MailIcon.js";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

const UpdateEvent = props => {
  const { register, handleSubmit, setValue, errors } = useForm();
  const [globalState, globalActions] = useGlobal();
  const { status, eventData } = globalState;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  var capitalizeCommunity =
    props.community.charAt(0).toUpperCase() + props.community.slice(1);

  var tableName = "Calendar-" + capitalizeCommunity;

  const updateEvent = data => {

    const stringData = JSON.stringify(data);
    globalActions.updateEvent(stringData);

    console.log(data);

    alert("Success! Event has been updated");
    navigate("app/dashboard/calendar/" + props.community + "/updateEvent/");
    // console.log("updateEvent");
  };

  if (eventData.length === 0 && status === "INITIAL") {
    globalActions.getEventByTitle(tableName, props.eventID);
  } else if (status === "SUCCESS") {
    // globalActions.getEventByTitle(tableName, props.eventID);
  }

  const manageRSVP = eventData => {
    var fullName;
    var guests;
    var email;
    var date;

    if (eventData[0] !== undefined) {
      if (eventData[0].info.rsvp !== undefined) {
        let rsvpObject = Object.entries(eventData[0].info.rsvp).map(
          ([key, value]) => {
            date = key;
            date = date.substring(1);

            let rsvpKeys = Object.entries(value).map(([key, value]) => {
              if (Array.isArray(value) === true) {
                let rsvpList = value.map(function(item, index) {
                  fullName = item.fullName;
                  guests = item.guests;
                  email = item.email;
                  return (
                    <div key = {index} className="rsvpList" key={index}>
                      <p className="rsvpName">
                        {fullName} | {email}
                      </p>
                      <p className="rsvpGuests">+ {guests} Guests</p>
                    </div>
                  );
                });
                return rsvpList;
              }
            });
            return (
            <div key = {key}>
              <h4>{date}</h4>
              {rsvpKeys}
            </div>
            );
          }
        );
        return (
          <div className="manageRSVP-wrapper">
            <div className="manageRSVP-header">
              <h4>{<MailIcon />} Manage RSVP</h4>
              <button className="closeManageRSVP" onClick={closeManageRSVP}>
                X
              </button>
            </div>
            <div className="rsvpList-wrapper">
              {rsvpObject}
            </div>
          </div>
        );
      } else {
        return (
          <div className="manageRSVP-wrapper">
            <div className="manageRSVP-header">
              <h4>{<MailIcon />} Manage RSVP</h4>
              <button className="closeManageRSVP" onClick={closeManageRSVP}>
                X
              </button>
            </div>
            <div className="rsvpList-wrapper">
              <p>No Sign Ups Yet</p>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="manageRSVP-wrapper">
          <div className="manageRSVP-header">
            <h4>{<MailIcon />} Manage RSVP</h4>
            <button className="closeManageRSVP" onClick={closeManageRSVP}>
              X
            </button>
          </div>
          <div className="rsvpList-wrapper">
            <p>No Sign Ups Yet</p>
          </div>
        </div>
      );
    }
  };

  let manageRSVPWrapper = document.querySelector(".manageRSVP-wrapper");
  let manageRSVPModal = document.querySelector(".manageRSVP");

  const openManageRSVP = () => {
    manageRSVPWrapper.classList.add("is-active");
    manageRSVPModal.classList.add("is-active");

    setTimeout(function() {
      manageRSVPModal.classList.add("animate-background");
    }, 200);

    setTimeout(function() {
      manageRSVPWrapper.classList.add("animate-transform");
    }, 100);
  };

  const closeManageRSVP = () => {
    manageRSVPWrapper.classList.remove("is-active");
    manageRSVPModal.classList.remove("is-active");
    manageRSVPWrapper.classList.remove("animate-transform");
    manageRSVPModal.classList.remove("animate-background");
  };

  return (
    <section id="updateEvent">
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
        <div>
          <h3>Data Response</h3>
          <pre>{JSON.stringify(eventData, null, 4)}</pre>
          <div className="formHero">
            <button onClick={openManageRSVP}>Manage RSVP</button>
          </div>
          <form
            id="updateEventForm"
            className="formTicket"
            onSubmit={handleSubmit(updateEvent)}
          >
            <input
              name="id"
              defaultValue={eventData[0].id}
              ref={register}
              hidden
            />
            <input
              name="community"
              defaultValue={tableName}
              ref={register}
              hidden
            />
            <div className="input-wrap is-focused">
              <label htmlFor="title">Title</label>
              <input
                name="title"
                defaultValue={eventData[0].title}
                ref={register}
              />
            </div>
            <div className="input-wrap is-focused">
              <label htmlFor="eventLocation">Location</label>
              <input
                name="eventLocation"
                defaultValue={eventData[0].info.eventLocation}
                ref={register}
              />
            </div>
            <input
              name="startDate"
              defaultValue={eventData[0].info.dailyEquation.ogStartDate}
              hidden
              ref={register}
            />
            <input
              name="endDate"
              defaultValue={eventData[0].info.dailyEquation.ogEndDate}
              hidden
              ref={register}
            />
            <div className="date-wrap">
              <div className="time">
                <label htmlFor="ogStartDate">Start Time</label>
                <input
                  name="ogStartDate"
                  defaultValue={eventData[0].info.dailyEquation.ogStartDate}
                  hidden
                  ref={register}
                />
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  showTimeSelect
                  timeFormat="hh:mm aa"
                  timeIntervals={30}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy hh:mm aa"
                  placeholderText={moment(
                    eventData[0].info.dailyEquation.ogStartDate
                  ).format("dddd MMMM Do YYYY h:mm a")}
                />
              </div>
              <div className="time">
                <label htmlFor="ogEndDate">End Time</label>
                <input
                  name="ogEndDate"
                  defaultValue={eventData[0].info.dailyEquation.ogEndDate}
                  hidden
                  ref={register}
                />
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  showTimeSelect
                  timeFormat="hh:mm aa"
                  timeIntervals={30}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy hh:mm aa"
                  placeholderText={moment(
                    eventData[0].info.dailyEquation.ogEndDate
                  ).format("dddd MMMM Do YYYY h:mm a")}
                />
              </div>
            </div>
            <div className="textarea-wrap">
              <label htmlFor="description">Descriptions</label>
              <textarea
                name="description"
                id=""
                cols="30"
                rows="2"
                defaultValue={eventData[0].info.description}
                ref={register}
              ></textarea>
            </div>
            {errors.title && <p>Title field is required</p>}
            {errors.eventLocation && <p>Location field is required</p>}
            {errors.description && <p>Description field is required</p>}
            <input
              type="submit"
              value="Update"
              className="btn btn-custom"
              onClick={() => {
                setValue(
                  "ogStartDate",
                  startDate == null
                    ? eventData[0].info.dailyEquation.ogStartDate
                    : startDate
                );
                setValue(
                  "ogEndDate",
                  endDate == null
                    ? eventData[0].info.dailyEquation.ogEndDate
                    : endDate
                );
                setValue(
                  "startDate",
                  startDate == null
                    ? eventData[0].info.dailyEquation.ogStartDate
                    : startDate
                );
                setValue(
                  "endDate",
                  endDate == null
                    ? eventData[0].info.dailyEquation.ogEndDate
                    : endDate
                );
              }}
            />
          </form>
        </div>
      )}
      <section className="manageRSVP">{manageRSVP(eventData)}</section>
    </section>
  );
};

export default UpdateEvent;
