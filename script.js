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
    constructor(storage) {
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
        const savedHabits = this.storage.load(); 

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

//user interface class
class UserInterface {
    constructor(tracker) {
        this.tracker = tracker;

        this.habitList = document.getElementById("habit-list");    
        this.addButton = document.getElementById("add-button");    
        this.habitInput = document.getElementById("habit-input");  
    
        this.totalHabits = document.getElementById("total-habits");
        this.completedHabits = document.getElementById("completed-habits");
        this.remainHabits = document.getElementById("remaining-habits");

        this.addButton.addEventListener("click", () => {
            this.addHabit();
        });
    }

    updateStat(element, label, value) {
        element.textContent = label + value;
    }

    addHabit() {
        const newHabit = this.habitInput.value;

        if(newHabit.trim() == "") {
            return;
        }

        this.tracker.addHabit(newHabit);

        this.renderHabits();
        this.habitInput.value = "";
    }

    renderHabit(habit) {        
        const li = document.createElement('li');
        li.textContent = habit.name;

        const button = document.createElement("button");
            if(habit.completed) {
                button.textContent = "Undo";
            }
            else {
                button.textContent = "Complete";
            }

        const handleToggleHabit = () => {
            this.tracker.toggleHabit(habit);
            this.renderHabits();
        }

        button.addEventListener("click", handleToggleHabit);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        const deleteHabit = () => {
            this.tracker.deleteHabit(habit);
            this.renderHabits();
        }

        deleteButton.addEventListener("click", deleteHabit);

        if(habit.completed) {
            li.style.textDecoration = "line-through";
        }

        this.habitList.appendChild(li);
        li.appendChild(button);
        li.appendChild(deleteButton);
        }
    

    renderHabits() {
        this.habitList.innerHTML = "";

        this.tracker.forEachHabit((habit) => {
            this.renderHabit(habit);
        });        

        this.updateStat(this.totalHabits, "Total Habits: ", this.tracker.getHabitCount());

        const completedCount = this.tracker.countCompletedHabits();
        this.updateStat(this.completedHabits, "Completed Habits: ", completedCount);

        const remainCount = this.tracker.getHabitCount() - completedCount;
        this.updateStat(this.remainHabits, "Remaining Habits: ", remainCount);
    
    }
} // end of class

// declare storage variable
const storage = new DataStorage();

//declare tracker array variable
const tracker = new HabitTracker(storage);

//declare UI variable
const ui = new UserInterface(tracker);

//run the load method and render habit function
tracker.loadHabits();
ui.renderHabits();
