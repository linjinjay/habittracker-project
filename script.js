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

//create the habit array
   class HabitTracker {
      constructor() {
          this.habits = [];  
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
    } // end of addHabit method

  //removeHabit method
    removeHabit(index) {
        this.habits.splice(index, 1);
    } //end of removeHabit method

  //habit count method
     getHabitCount() {
         return this.habits.length;
     } // end of getHabitCount method

  // getHabits method
     getHabits() {
        return this.habits;
     } // end of getHabits method

 } // end of class

//declare tracker array variable
   const tracker = new HabitTracker();

//function save to local storage
   function saveHabits() {
      const stringHabits = JSON.stringify(tracker.habits);
      localStorage.setItem("habitKey", stringHabits);
   }

//function load from local storage
   function loadHabits() {
     const getHabits = localStorage.getItem("habitKey");

   if(getHabits !== null){
      
      const savedHabits = JSON.parse(getHabits);        
      tracker.habits = [];
      for(let i = 0; i < savedHabits.length; i++) {
         let savedHabit = savedHabits[i]; 
         const newHabit = new Habit(savedHabit.name, savedHabit.completed);
         tracker.habits.push(newHabit);
       } // end of for
      
     } //end of if
   }  // end of loadHabits function

//declare add habit function
   function addHabit() {
      const newHabit = habitInput.value;
      if(newHabit.trim() == "") {
      return;
    }  // end of if
   tracker.addHabit(newHabit);  //end of push
   
   saveHabits();
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
      const habits = tracker.getHabits();

   //For loop to cycle through the habit array.
     for(let index = 0; index < habits.length; index++) {
        let habit = tracker.habits[index];

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
            habit.toggleCompleted();
            saveHabits();
            renderHabits();
        }

    //listen for click of the button
        button.addEventListener("click", handleToggleHabit);

    //delete button. 
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

    //declare delete habit function
        function deleteHabit() {
           tracker.removeHabit(index);
           saveHabits();
           renderHabits();
        }  // end of deleteHabit function
    //listen for click of the delete button.
        deleteButton.addEventListener("click", deleteHabit);

    //cross off habit if it is completed with a line through. 
        if (habit.completed) {
          li.style.textDecoration = "line-through";
        }  // end of if
        else {
          li.textContent = habit.name;
        }  // end of else

        habitList.appendChild(li);
        li.appendChild(button);
        li.appendChild(deleteButton);

   } //end of for loop.

//Display the number of total habit     
   updateStat(totalHabits, "Total Habits: ", tracker.getHabitCount());

//displays the count after checking every habit
   const completedCount = tracker.countCompletedHabits();
   updateStat(completedHabits, "Completed Habits: ", completedCount);

//remaining habits counter
   const remainCount = tracker.getHabitCount() - completedCount;
   updateStat(remainHabits, "Remaining Habits: ", remainCount);
   } //end of render function

//run the render habit function
   loadHabits();
   renderHabits();
