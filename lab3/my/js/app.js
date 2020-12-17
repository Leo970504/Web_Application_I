//Tasks definition
const tasks = [
    {
        "id": 1,
        "description" : "Complete Lab 4",
        "important": true,
        "private": false,
        "sharedWith": "Marco",
        "deadline": new Date("2020-04-03T11:00:00"),
        "project": "WebApp I"
    },
    {
        "id": 2,
        "description" : "Watch Mr. Robot",
        "important": false,
        "private": true,
        "deadline": new Date("2020-05-31T18:59:00"),
        "project": "Personal"
    },
    {
        "id": 3,
        "description" : "Go for a walk",
        "important": true,
        "private": true,
        "deadline": new Date("2020-04-18T08:00:00"),
        "project": "Personal"
    }];


//Functions definition

/**
 * Function to create a single task encolsed in an <li> tag
 * @param {*} task the task object
 */
function createTaskNode(task){
    const li = document.createElement('li');
    li.id = "task"+task.id;
    li.className = 'list-group-item';
    const innerDiv = document.createElement('div');
    innerDiv.className = 'custom-control custom-checkbox';
    const externalDiv = document.createElement('div');
    externalDiv.className = 'd-flex w-100 justify-content-between';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = "check-t"+ task.id;
    if(task.important)
        checkbox.className = 'custom-control-input important';
    else
        checkbox.className = 'custom-control-input';

    innerDiv.appendChild(checkbox);

    const descriptionText = document.createElement('label');
    descriptionText.className = 'description custom-control-label';
    descriptionText.innerText = task.description;
    descriptionText.htmlFor = "check-t"+ task.id;
    innerDiv.appendChild(descriptionText);

    if(task.project){
        const projectText = document.createElement('span');
        projectText.className = 'project badge badge-primary ml-4';
        projectText.innerText = task.project;
        innerDiv.appendChild(projectText);
    }

    const dateText = document.createElement('small');
    dateText.className = 'date';
    dateText.innerText = task.deadline.toString();
    //mark expired tasks
    const now = new Date();
    if(task.deadline.getTime() < now.getTime()){
        dateText.classList.add('bg-danger');
        dateText.classList.add('text-white');
    }

    externalDiv.appendChild(innerDiv);
    externalDiv.appendChild(dateText);

    if(!task.private && task.sharedWith !== undefined){
        innerDiv.insertAdjacentHTML("afterend", `<svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg> `);
    }

    li.appendChild(externalDiv);
    return li;
}

/**
 * Function to create the <ul></ul> list of tasks, withouth any filters
 */
function createAllTasks(){
    const taskList = document.getElementById("taskList");
    for(const task of tasks){
        const taskNode = createTaskNode(task);
        taskList.appendChild(taskNode);
        //set a timeout to mark the deadline, if the deadline is "valid"
        if(!Number.isNaN(task.deadline.getTime())) {
            const now = new Date();
            setTimeout(function() {
                const li = document.getElementById("task" + task.id);
                const date = li.getElementsByClassName("date")[0];
                date.classList.add('bg-danger');
                date.classList.add('text-white');
            }, task.deadline.getTime() - now.getTime(), task);
        }
    }
}

/**

/**
 * Function to destroy the <ul></ul> list of tasks
 */
function clearTasks(){
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';
}

//Functions invocation
createAllTasks();
