const CurrentDate = document.querySelector('.calendar-month');
const ActiveDays = document.querySelector('.calendar-days');
const PreviousIcon = document.querySelectorAll('.calendar-month-previous');
const NextIcon = document.querySelectorAll('.calendar-month-next');
const EventText = document.querySelector('.calendar-event');
let Day = new Date();
CurrentYear = Day.getFullYear();
CurrentMonth = Day.getMonth();
const AllMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let DayList = [];
var DayPairs = [];

const RenderCalendar = () => {
    let MonthFirstDay = new Date(CurrentYear, CurrentMonth, 1).getDay();
    let MonthLastDate = new Date(CurrentYear, (CurrentMonth + 1), 0).getDate();
    let MonthLastDay = new Date(CurrentYear, CurrentMonth, MonthLastDate).getDay();
    let PreviousMonthLastDay = new Date(CurrentYear, CurrentMonth, 0).getDate();
    let LiElements = "";

    for (let i = MonthFirstDay; i > 0; i--){
        LiElements += `<li class="calendar-days-visible">${((PreviousMonthLastDay - i) + 1)}</li>`;
        DayList.push(new Date(CurrentYear, (CurrentMonth - 1), (PreviousMonthLastDay - i) + 1));
    }

    for (let i = 1; i <= MonthLastDate; i++){
        LiElements += `<li class="calendar-days-visible">${i}</li>`;
        DayList.push(new Date(CurrentYear, CurrentMonth, i));
    }

    for (let i = MonthLastDay; i < 6; i++){
        LiElements += `<li class="calendar-days-visible">${((i - MonthLastDay) + 1)}</li>`;
        DayList.push(new Date(CurrentYear, (CurrentMonth + 1), (i - MonthLastDay) + 1));
    }

    CurrentDate.innerText = `${AllMonths[CurrentMonth]} ${CurrentYear}`;
    ActiveDays.innerHTML = LiElements;
    //console.log(DayList);
}

RenderCalendar();

PreviousIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        CurrentMonth--;

        if (CurrentMonth < 0){
            CurrentMonth = 11;
            CurrentYear--;
        }

        RenderCalendar();

        DayPairs = [];

        for (let i = 0; i < VisibleDates.length; i++) {
            DayPairs.push(VisibleDates[i], DayList[i]);
            console.log("Day Pair:" + DayPairs[i]);
        }
    })
})

NextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        CurrentMonth++;

        if (CurrentMonth > 11){
            CurrentMonth = 0;
            CurrentYear++;
        }

        RenderCalendar();

        DayPairs = [];

        for (let i = 0; i < VisibleDates.length; i++) {
            DayPairs.push(VisibleDates[i], DayList[i]);
            console.log("Day Pair:" + DayPairs[i]);
        }


    })
})

const FindValue = (Key) => {
    for (let i = 0; i < DayPairs.length; i++){
        if (Key == dayPairs[i].Key){
            return DayPairs[i].Value;
        }
    }
}

const VisibleDates = document.querySelectorAll('.calendar-days-visible');
//console.log(VisibleDates);

DayPairs = []

for (let i = 0; i < VisibleDates.length; i++) {
    DayPairs.push(VisibleDates[i], DayList[i]);
    console.log("Day Pair:" + DayPairs[i] + " index: " + i);
}

VisibleDates.forEach(day => {
    day.addEventListener("click", () => {
        console.log("Events: " + AllEvents.length);
        for (let i = 0; i < AllEvents.length; i++){
            for (let j = 0; j < DayPairs.length; j++){
                if ((AllEvents[i].EventDate.getTime() == DayPairs[j].Value.getTime()) && (DayPairs[j].Key == day)){
                    EventText.innerText = AllEvents[i].EventDescription;
                }
            }
        }
    })
})

console.log("End of file");
