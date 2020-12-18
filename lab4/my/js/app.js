class App {
    constructor() {
        this.taskManager = new TaskManager();

        this.filterView = new Filter(this.taskManager);

        this.projectView = new Project(this.taskManager, this.filterView);

        const timeInput = document.getElementById("form_deadline_time");
        const dateInput = document.getElementById("form_deadline_date");
        timeInput.addEventListener("input", function(event){
            if (timeInput.value !== "") {
                if (dateInput.value === "") {
                    dateInput.setCustomValidity("Please, specify the date!");
                    dateInput.classList.add("invalid");
                }
            } else {
                dateInput.setCustomValidity("");
                dateInput.classList.remove("invalid");
            }
        });
        dateInput.addEventListener("input", function(event){
            if (dateInput.value !== "") {
                dateInput.setCustomValidity('');
            }
        });

        document.getElementById('addForm').addEventListener('submit', event => {
            event.preventDefault();

            const addForm = document.getElementById('addForm');
            const description = addForm.elements["form_description"].value;

            let project = addForm.elements["form_description"].value;
            if (project === "") {
                project = undefined;
            }

            const important = addForm.elements["form_important"].checked;
            const privateTask = addForm.elements["form_private"].checked;
            
            const deadlineDate = addForm.elements["form_deadline_date"].value;
            const deadlineTime = addForm.elements["form_deadline_time"].value;
        
            let deadline = undefined;
            if (deadlineDate !== "" && deadlineTime !== "") {
                deadline = moment(deadlineDate + " " + deadlineTime);
            } else if (deadlineDate !== "") {
                deadline = moment(deadlineDate);
            }

            const task = new Task(
                description,
                important,
                privateTask,
                deadline,
                project
            )

            this.taskManager.addTask(task);
            //refresh tasks
            this.filterView.clearTasks();
            this.filterView.showTasks('all');
            //refresh projects
            this.projectView.clearProjects();
            this.projectView.createAllProjects();
            
            addForm.reset();
            document.getElementById("closeModal").click();
        });

        this.filterView.showTasks('all');
        this.projectView.createAllProjects();
    }
}