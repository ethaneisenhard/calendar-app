import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useGlobal from "../store/eventData";
import shortid from "shortid";
import DatePicker from "react-datepicker";
import * as utils from "../utils/formEvents";

import "react-datepicker/dist/react-datepicker.css";

const CreateEventForm = props => {
  const { register, handleSubmit, setValue, errors } = useForm();
  const [globalState, globalActions] = useGlobal();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [repeats, setRepeats] = useState();
  const [daysOfMonth, setDaysOfMonth] = useState();
  const [monthsOfYear, setMonthsOfYearRules] = useState();
  const [dayType, setDayTypeRules] = useState();

  const createEvent = data => {

    if(data.repeats === "days"){
      data.daysOfWeek = "_";
      data.daysOfMonth="_";
      data.monthsOfYear="_";
      data.dayType="_";
      data.dayNumber="_";
    } else if(data.repeats === "weeks"){
      data.dayType="_";
      data.monthsOfYear="_";
      data.daysOfMonth="_";
      data.dayNumber="_";
    } else if(data.repeats === "months"){
      data.daysOfWeek = "_";
      data.monthsOfYear="_";
      if(data.daysOfMonth !== "days"){
        data.dayNumber="_";
      }
    } else if(data.repeats === "years"){
      if(data.daysOfMonth !== "days"){
        data.dayNumber="_";
      }
      data.daysOfWeek = "_";
    }

    if(data.availableSpots === ""){
      data.availableSpots = "_"
    }

    var filteredData = data

    console.log(filteredData)
    
    const stringData = JSON.stringify(filteredData);

    globalActions.setEvent(stringData);

    // alert("Event Created");

    // window.location.reload(true);

    console.log("createEvent");
  };

  const id = shortid();

  useEffect(() => {
    utils.formEvents();
  });

  var capitalizeCommunity =
    props.community.charAt(0).toUpperCase() + props.community.slice(1);

  var tableName = "Calendar-" + capitalizeCommunity;

  var showDAEquation = function showDAEquation() {
    var recurringEquationSection = document.querySelector(".recurring-equation");
    recurringEquationSection.classList.remove("is-hidden")
  };

  var hideDAEquation = function hideDAEquation() {
    var recurringEquationSection = document.querySelector(".recurring-equation");
    recurringEquationSection.classList.add("is-hidden")
  };

  var handleRepeatsChange = function handleRepeatsChange(e) {
    
    const everySpanSelector = document.querySelector(".js-every-selector-span");
    const everyDaySelector = document.getElementById("every-selector");
    const yearlyEverySelector = document.getElementById("yearly-every-selector")
    const weekDaySelector = document.getElementById("weekDays-selector");
    const monthlyDaySelector = document.getElementById("monthly-day-selector");

    setRepeats(e.target.value);

    if (e.target.value === "days") {
      everyDaySelector.classList.remove("is-hidden");
      yearlyEverySelector.classList.add("is-hidden");
      weekDaySelector.classList.add("is-hidden");
      monthlyDaySelector.classList.add("is-hidden");

      everySpanSelector.innerHTML = "day(s)"

    } else if (e.target.value === "weeks") {
      everyDaySelector.classList.remove("is-hidden");
      yearlyEverySelector.classList.add("is-hidden");
      weekDaySelector.classList.remove("is-hidden");
      monthlyDaySelector.classList.add("is-hidden");

      everySpanSelector.innerHTML = "week(s)"

    } else if (e.target.value === "months") {
      everyDaySelector.classList.remove("is-hidden");
      yearlyEverySelector.classList.add("is-hidden");
      weekDaySelector.classList.add("is-hidden");
      monthlyDaySelector.classList.remove("is-hidden");
      
      everySpanSelector.innerHTML = "month(s)"
    } else if (e.target.value === "years") {
      everyDaySelector.classList.add("is-hidden");
      yearlyEverySelector.classList.remove("is-hidden");
      weekDaySelector.classList.add("is-hidden");
      monthlyDaySelector.classList.remove("is-hidden");

      everySpanSelector.innerHTML = "year(s)"
    }

  };

  var handleDaysOfMonthChange = function handleDaysOfMonthChange(e) {
    if (e.target.value === "Day" || e.target.value === "") {
      document.getElementById("day-number").classList.remove("is-hidden");
      document.getElementById("day-type-selector").classList.add("is-hidden");
    }else{
      document.getElementById("day-type-selector").classList.remove("is-hidden");
      document.getElementById("day-number").classList.add("is-hidden");
    }

    setDaysOfMonth(e.target.value);
  };

  var handleMonthsOfYearChange = function handleMonthsOfYearChange(e) {
    setMonthsOfYearRules(e.target.value);
  };

  var handleDayTypeChange = function handleDayTypeChange(e) {
    setDayTypeRules(e.target.value);
  };

  return (
    <section id="createEvent">
      <div className="formHero">
          <img src="" alt=""/>
         <input type="file" className="hero-image" name="heroImage"/>
      </div>
      <form
        id="createEventForm"
        className="formTicket formEvents"
        onSubmit={handleSubmit(createEvent)}
      >
        <input name="id" defaultValue={id} ref={register} hidden />
        <input
          name="community"
          defaultValue={tableName}
          ref={register}
          hidden
        />
        <div className="radio-wrap">
          <p>Type of Event</p>
          <div className="radio">
            <input
              name="dailyActivity"
              id="oneTime"
              value="false"
              type="radio"
              ref={register}
              defaultChecked
              onClick={hideDAEquation}
            />
            <label htmlFor="oneTime">One Time</label>
          </div>
          <div className="radio">
            <input
              name="dailyActivity"
              id="dailyActivity"
              value="true"
              type="radio"
              ref={register}
              onClick={showDAEquation}
            />
            <label htmlFor="dailyActivity">Recurring Activity</label>
          </div>
        </div>

        <div className="input-wrap">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            defaultValue=""
            ref={register({ required: true })}
          />
        </div>
        {errors.title && (
          <p className="error">Please enter the Title of the event</p>
        )}
        <div className="input-wrap">
          <label htmlFor="eventLocation">Location</label>
          <input
            name="eventLocation"
            defaultValue=""
            ref={register({ required: true })}
          />
        </div>
        {errors.eventLocation && (
          <p className="error">Please enter the Location of the event</p>
        )}

        <div className="date-wrap">
          <div className="time">
            <label htmlFor="startDate">Start Date and Time</label>
            <input name="startDate" hidden ref={register({ required: true })} />
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="MMMM d, yyyy hh:mm aa"
            />
          </div>
          <div className="time">
            <label htmlFor="endDate">End Date and Time</label>
            <input name="endDate" hidden ref={register({ required: true })} />
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="MMMM d, yyyy hh:mm aa"
            />
          </div>
        </div>

        <div className="input-wrap is-hidden is-focused">
          <label htmlFor="ogStartDate">OG Date</label>
          <input className="" name="ogStartDate" ref={register} />
        </div>

        <div className="input-wrap is-hidden is-focused">
          <label htmlFor="ogEndDate">OG Date</label>
          <input className="" name="ogEndDate" ref={register} />
        </div>

       <div className = "recurring-equation is-hidden">
          <div className="select-wrap select-wrap__repeats">
            <label htmlFor="repeats">Recurring </label>
            <select
              name="repeats"
              value={repeats}
              onChange={handleRepeatsChange}
              className="custom-select"
              ref={register}
            >
              <option value="days">Daily</option>
              <option value="weeks">Weekly</option>
              <option value="months">Monthly</option>
              <option value="years">Yearly</option>
            </select>
          </div>
         
          <div className = "repeat-selector-wrapper">
            <div id="every-selector" className="input-wrap is-focused">
              <label htmlFor="every">Every </label>
              <input name="every" defaultValue="1" ref={register}/>
              <span className = "js-every-selector-span">day(s)</span>
            </div>
            
            <div id="yearly-every-selector" className="is-hidden select-wrap">
              <label htmlFor="monthsOfYear">Every </label>
              <select
                name="monthsOfYear"
                value={monthsOfYear}
                onChange={handleMonthsOfYearChange}
                className="custom-select"
                ref={register}
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            
            <div id="weekDays-selector" className="is-hidden">
              <label htmlFor="daysOfWeek">On: </label>
              <input
                type="checkbox"
                id="weekday-sun"
                className="weekday"
                name="daysOfWeek"
                value="Sunday"
                ref={register}
              />
              <label htmlFor="weekday-sun">S</label>
              <input
                type="checkbox"
                id="weekday-mon"
                className="weekday"
                name="daysOfWeek"
                value="Monday"
                ref={register}
              />
              <label htmlFor="weekday-mon">M</label>
              <input
                type="checkbox"
                id="weekday-tue"
                className="weekday"
                name="daysOfWeek"
                value="Tuesday"
                ref={register}
              />
              <label htmlFor="weekday-tue">T</label>
              <input
                type="checkbox"
                id="weekday-wed"
                className="weekday"
                name="daysOfWeek"
                value="Wednesday"
                ref={register}
              />
              <label htmlFor="weekday-wed">W</label>
              <input
                type="checkbox"
                id="weekday-thu"
                className="weekday"
                name="daysOfWeek"
                value="Thursday"
                ref={register}
              />
              <label htmlFor="weekday-thu">T</label>
              <input
                type="checkbox"
                id="weekday-fri"
                className="weekday"
                name="daysOfWeek"
                value="Friday"
                ref={register}
              />
              <label htmlFor="weekday-fri">F</label>
              <input
                type="checkbox"
                id="weekday-sat"
                className="weekday"
                name="daysOfWeek"
                value="Saturday"
                ref={register}
              />
              <label htmlFor="weekday-sat">S</label>
            </div>
            
            <div id="monthly-day-selector" className = "month-day is-hidden">
              <div className="months select-wrap">
                <label htmlFor="daysOfMonth">On: </label>
                <select
                  name="daysOfMonth"
                  value={daysOfMonth}
                  onChange={handleDaysOfMonthChange}
                  className="custom-select"
                  ref={register}
                >
                  <option value="Day">Day</option>
                  <option disabled>––––––––––</option>
                  <option value="0">First</option>
                  <option value="1">Second</option>
                  <option value="2">Third</option>
                  <option value="3">Fourth</option>
                  <option value="4">Last</option>
                </select>
              </div>
            
              <div id="day-number" className="input-wrap">
                <label htmlFor="dayNumber">#</label>
                <input name="dayNumber" defaultValue="" ref={register} />
              </div>
            
              <div id="day-type-selector" className="is-hidden select-wrap">
                <label htmlFor="dayType"></label>
                  <select
                  name="dayType"
                  value={dayType}
                  onChange={handleDayTypeChange}
                  className="custom-select"
                  ref={register}
                  >
                  {/* <option value="Day">Day</option>
                  <option value="Weekend">Weekend</option>
                  <option value="Weekend Day">Weekend Day</option>
                  <option disabled>––––––––––</option> */}
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>
            </div>
          </div>
       </div>

       <div className = "input-wrap">
            <label htmlFor="availableSpots">Available Spots (Optional)</label>
            <input ref={register} type="text" name="availableSpots"/>
       </div>

        <div className="textarea-wrap">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            ref={register({ required: true })}
          ></textarea>
        </div>
        {errors.description && (
          <p className="error">Please give your event a Description</p>
        )}
        <input
          type="submit"
          value="publish"
          className="btn btn-custom"
          onClick={() => {
            setValue("startDate", startDate);
            setValue("endDate", endDate);
            setValue("ogStartDate", startDate);
            setValue("ogEndDate", endDate);
          }}
        />
      </form>
    </section>
  );
};

export default CreateEventForm;
