class TaskManager {
    constructor() {
        this.tasks = [new Task("Complete Lab 3",true, false, "2020-04-03T11:00:00", "WebApp I"),
        new Task("Watch Mr. Robot", false, true, "2020-04-28T18:59:00", "Personal"),
        new Task("Go for a walk", true, true, "2020-04-18T08:00:00", "Personal")];
    }

    get all() {
        return this.tasks;
    }

    get important() {
        return this.tasks.filter((element) => {
            if (element.important) {
                return element;
            }
        });
    }

    get today() {
        return this.tasks.filter((element) => {
            if (this.isToday)
        });
    }

    isToday(date) {
        return date.isSame(moment(), 'day');
    }

    isNextWeek(date) {
        const nextWeek = moment().add(1, 'weeks');
        const tomorrow = moment().add(1, 'days');
        return date.isAfter(tomorrow) && date.isBefore(nextWeek);
    }
}