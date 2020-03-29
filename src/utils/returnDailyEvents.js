import moment from "moment";
import "moment-recur";

export function returnDailyEvents(eventData) {
  let recurrence;
  var id;
  var title;
  var eventLocation;
  var dailyActivity;
  var startDate;
  var endDate;
  var description;
  var repeats;
  var rsvp;
  // var every;
  var daysOfWeek;
  var daysOfMonth;
  var monthsOfYear;
  var dayNumber;
  var dayType;
  var ogStartDate;
  var ogEndDate;
  var dateObj = {};
  var eventDataCopy = eventData.map((x) => x);
  var arrayOfRuleDates = []

  function isDailyActivity(value) {
    return (
      value.info.dailyActivity === "true"
    );
  }

  var dailyActivityList = eventData.filter(isDailyActivity);

  var sortByDate = dailyActivityList.sort(function(a, b) {
    return new Date(a.info.dailyEquation.ogStartDate) - new Date(b.info.dailyEquation.ogStartDate);
  });

  sortByDate.forEach(function(item) {
    if (item.info.dailyActivity === "true") {
        let recurringDates;
        var every = item.info.dailyEquation.every;
        var repeat = item.info.dailyEquation.repeats;

        var everyOBJ = {};
        everyOBJ[every] = true;

        if(repeat === "days"){
          recurrence = moment().recur({
            start: item.info.dailyEquation.ogStartDate,
            end: item.info.dailyEquation.ogEndDate,
            rules: [
              { units: everyOBJ, measure: repeat }
            ]
          });
          recurringDates = recurrence.all("L")
          recurringDates.shift();
        } else if(repeat === "weeks"){

          if(item.info.dailyEquation.daysOfWeek !== "_"){
          
            recurrence = moment(item.info.dailyEquation.ogStartDate).recur(item.info.dailyEquation.ogStartDate, item.info.dailyEquation.ogEndDate).every(item.info.dailyEquation.daysOfWeek).daysOfWeek();

            var checkDay = moment(item.info.dailyEquation.ogStartDate).format('dddd');

            item.info.dailyEquation.daysOfWeek.forEach(function(item, index){

              if(checkDay === item){
                recurringDates = recurrence.all("L")
                recurringDates.shift();
              } else{
                recurringDates = recurrence.all("L")
                recurringDates.shift();
              }

            })

          } else{
            recurrence = moment().recur({
              start: item.info.dailyEquation.ogStartDate,
              end: item.info.dailyEquation.ogEndDate,
              rules: [
                { units: everyOBJ, measure: repeat }
              ]
            });
            recurringDates = recurrence.all("L")
            recurringDates.shift();
          }

        } else if(repeat === "months"){
          
          if(item.info.dailyEquation.daysOfMonth !== "Day"){
            
              recurrence = moment(item.info.dailyEquation.ogStartDate).recur(item.info.dailyEquation.ogStartDate, item.info.dailyEquation.ogEndDate).every(item.info.dailyEquation.dayType).daysOfWeek().every([item.info.dailyEquation.daysOfMonth]).weeksOfMonthByDay()

              recurringDates = recurrence.all("L")

          } else{
            recurrence = moment(item.info.dailyEquation.ogStartDate).recur(item.info.dailyEquation.ogStartDate, item.info.dailyEquation.ogEndDate).every(item.info.dailyEquation.dayNumber).daysOfMonth()

            recurringDates = recurrence.all("L")
            recurringDates.shift();
          }
        

       } else if(repeat === "years"){

        if(item.info.dailyEquation.daysOfMonth !== "Day"){
            recurrence = moment(item.info.dailyEquation.ogStartDate).recur(item.info.dailyEquation.ogStartDate, item.info.dailyEquation.ogEndDate).every(item.info.dailyEquation.monthsOfYear).monthsOfYear();
            recurringDates = recurrence.all("L")
         
        } else{
          recurrence = moment(item.info.dailyEquation.ogStartDate).recur(item.info.dailyEquation.ogStartDate, item.info.dailyEquation.ogEndDate).every(item.info.dailyEquation.dayNumber).daysOfMonth().every(item.info.dailyEquation.monthsOfYear).monthsOfYear();
         
          recurringDates = recurrence.all("L")
          recurringDates.shift();
        }

        }

        recurringDates.forEach(function(value) {
          id = item.id;
          title = item.title;
          eventLocation = item.info.eventLocation;
          dailyActivity = item.info.dailyActivity;
          startDate = value;
          endDate = item.info.endDate;
          description = item.info.description;
          repeats = item.info.dailyEquation.repeats;
          every = item.info.dailyEquation.every;
          daysOfWeek = item.info.dailyEquation.daysOfWeek;
          daysOfMonth = item.info.dailyEquation.daysOfMonth;
          monthsOfYear = item.info.dailyEquation.monthsOfYear;
          dayNumber = item.info.dailyEquation.dayNumber;
          dayType = item.info.dailyEquation.dayType;
          ogStartDate = item.info.dailyEquation.ogStartDate;
          ogEndDate = item.info.dailyEquation.ogEndDate;
          rsvp = item.info.rsvp;
          dateObj = {
            title: title,
            id: id,
            info: {
              eventLocation: eventLocation,
              dailyActivity: dailyActivity,
              startDate: startDate,
              endDate: endDate,
              description: description,
              dailyEquation:{
                repeats: repeats,
                every: every,
                daysOfWeek: daysOfWeek,
                daysOfMonth: daysOfMonth,
                monthsOfYear: monthsOfYear,
                dayNumber: dayNumber,
                dayType: dayType,
                ogStartDate: ogStartDate,
                ogEndDate: ogEndDate
              },
              rsvp: rsvp
            }
          };
          arrayOfRuleDates.push(dateObj)
        });
    }
  });
  
  arrayOfRuleDates.forEach(function(dailyEvent){
    eventDataCopy.push(dailyEvent)
  })

  return eventDataCopy

}
