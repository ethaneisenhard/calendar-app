import moment from "moment";

export function sortAndGroupByDate(eventData){

      var sortByDate = eventData.sort(function(a, b) {
        return  new Date(b.info.dailyEquation.ogStartDate) - new Date(a.info.dailyEquation.ogStartDate);
      });
    
      const getDateEvents = sortByDate.map(item =>
        moment(item.info.startDate).format("MM-DD-YYYY")
      );
    
      const filterDuplicateDates = [...new Set(getDateEvents)];
    
      var groupedPublishedEvents = {};
    
      filterDuplicateDates.forEach(function(item) {
        var arrayOfEvents = [];
    
        eventData.forEach(function(value) {
          var compareTest = moment(item).isSame(value.info.startDate, "day");
          if (compareTest === true) {
            arrayOfEvents.push(value);
          }
        });
    
        if (typeof groupedPublishedEvents["d" + item.date] == "undefined") {
          groupedPublishedEvents["d" + item] = {
            date: item,
            events: arrayOfEvents
          };
        }
      });
    
    const convertToArray = Object.values(groupedPublishedEvents).map(array=>array);
  
  return convertToArray;
};
