const AllEvents = [];

class Event{
    //var EventDate = new Date();
    //var EventDescription = "";

    constructor(Year, Month, Day){
        this.EventDate = new Date(Year, Month, Day);
        this.EventDescription = "test";
    }

    GetEventDescription() {
        return this.EventDescription;
    }

    SetEventDescription(Description){
        this.EventDescription = Description;
    }
}

let temp = new Event(2024, 2, 24);
temp.SetEventDescription("Science Carnival");

AllEvents.push(temp);