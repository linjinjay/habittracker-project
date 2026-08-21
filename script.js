//declare the list, button, and text box variables
const habitList = document.getElementById("habit-list");    //the list
const addButton = document.getElementById("add-button");    //button
const habitInput = document.getElementById("habit-input");  //text box
//Total habits counter
const totalHabits = document.getElementById("total-habits");
//count the completed habits counter
const completedHabits = document.getElementById("completed-habits");
//remaining habits counter
const remainHabits = document.getElementById("remaining-habits");

//declare create new habit class
class Habit {
    constructor(name, completed = false) {
        this.name = name;
        this.completed = completed;
        } //end of constructor
    toggleCompleted() {
          this.completed = !this.completed;
        } //end of toggleCompleted
    } //end of Habit class

//declare HabitTracker class
class HabitTracker {

//create the habit array
    constructor() {
        this.habits = [];
        this.storage = storage;  
    } // end of constructor

//count number of completed habits
   countCompletedHabits() {
  //start count at 0
    let count = 0;
  //look at each habit
    for(let i = 0; i < this.habits.length; i++) {
  //testing if statement
    let habit = this.habits[i];
    if (habit.completed) { 
    count = count + 1;
    } //end of if habit.complete condition
    } //end of for
    return count;
    }  // end of countCompleteHabits function

//addHabit method
    addHabit(name) {
        const habit = new Habit(name);
        this.habits.push(habit);
        this.storage.save(this.habits);
    } // end of addHabit method

//removeHabit method
deleteHabit(habit) {
    const index = this.habits.indexOf(habit);

    if(index === -1) {
        return;
    }

    this.habits.splice(index, 1);
    this.storage.save(this.habits);
}//end of removeHabit method

//habit count method
    getHabitCount() {
        return this.habits.length;
    } // end of getHabitCount method

// getHabits method
    getHabit(index) {
        return this.habits[index];
    }

// toggleHabit method
    toggleHabit(habit) {
        habit.toggleCompleted();
        this.storage.save(this.habits);
    }

// for each method
    forEachHabit(callback) {
        for (let i = 0; i< this.habits.length; i++) {
            callback(this.habits[i]);
        }
    }

// habitlist creator method
    loadHabits() {
        const savedHabits = storage.load(); 

        if(savedHabits !== null) {
        this.habits = [];


        for(let i = 0; i < savedHabits.length; i++) {
            let savedHabit = savedHabits[i];
            const newHabit = new Habit(
                savedHabit.name,
                savedHabit.completed
            );
            this.habits.push(newHabit);
        } // end of for
        } // end of if
      } // end of habitlist creator method

    } // end of HabitTracker class

// Data Storage class
class DataStorage {
    save(habits) {
        const stringHabits = JSON.stringify(habits);
        localStorage.setItem("habitKey", stringHabits);
    }
    load() {
        const getHabits = localStorage.getItem("habitKey");

        if(getHabits === null) {
           return null;
        }

        return JSON.parse(getHabits);
    } //end of load
   
    } //end of class

// declare storage variable
const storage = new DataStorage();

//declare tracker array variable
const tracker = new HabitTracker();

//declare add habit function
function addHabit() {
    const newHabit = habitInput.value;
    if(newHabit.trim() == "") {
      return;
    }  // end of if
   
    tracker.addHabit(newHabit); 
   
    
    renderHabits();
    habitInput.value = "";
    }  //end of addHabit function

//listen for add habit button to be clicked
addButton.addEventListener("click", addHabit);

//update stats function
function updateStat(element, label, value) {
      element.textContent = label + value;
    }

//render habit function. Clears the page first. 
function renderHabits() {
    habitList.innerHTML = "";

   //For loop to cycle through the habit array.
    tracker.forEachHabit(function(habit) {

   //create list variable. Displays the habit list. 
    const li = document.createElement("li");
    li.textContent = habit.name;

   //complete button, if completed is true, button will show undo.
    const button = document.createElement("button");
        if (habit.completed) {
           button.textContent = "Undo";
        }  //end of if
        else {
          button.textContent = "Complete";
        }  // end of else


    //declare handleToggleHabit function
    function handleToggleHabit(){
        tracker.toggleHabit(habit);
        renderHabits();
        }

    //listen for click of the button
    button.addEventListener("click", handleToggleHabit);

    //delete button. 
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    //declare delete habit function
    function deleteHabit() {
        tracker.deleteHabit(habit);
        renderHabits();
        }  // end of deleteHabit function
    
    //listen for click of the delete button.
    deleteButton.addEventListener("click", deleteHabit);

    //cross off habit if it is completed with a line through. 
    if (habit.completed) {
        li.style.textDecoration = "line-through";
        }  // end of if

    habitList.appendChild(li);
    li.appendChild(button);
    li.appendChild(deleteButton);

    }); //end of for loop.

    //Display the number of total habit     
    updateStat(totalHabits, "Total Habits: ", tracker.getHabitCount());

    //displays the completed count after checking every habit
    const completedCount = tracker.countCompletedHabits();
    updateStat(completedHabits, "Completed Habits: ", completedCount);

    //remaining habits counter
    const remainCount = tracker.getHabitCount() - completedCount;
    updateStat(remainHabits, "Remaining Habits: ", remainCount);
    } //end of render function

//run the load method and render habit function
tracker.loadHabits();
renderHabits();
