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
//create the habit array
let habits = [];

//function save to local storage
function saveHabits() {
      const stringHabits = JSON.stringify(habits);
      localStorage.setItem("habitKey", stringHabits);
}

//function load from local storage
function loadHabits() {
  const getHabits = localStorage.getItem("habitKey");

  if(getHabits !== null){
      
      const savedHabits = JSON.parse(getHabits);
      habits = savedHabits;
  }
}

//declare add habit function
function addHabit() {
   const newHabit = habitInput.value;
   if(newHabit.trim() == "") {
      return;
   }

   habits.push({
        name: newHabit,
        completed: false
   });  //end of push
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

//For loop to cycle through the habit array.
   for(let index = 0; index < habits.length; index++) {
      let habit = habits[index];

     //create list variable. Displays the habit list. 
      const li = document.createElement("li");
        li.textContent = habit.name;

   //complete button, if completed is true, button will show undo.
      const button = document.createElement("button");
        if (habit.completed) {
           button.textContent = "Undo";
        }
        else {
          button.textContent = "Complete";
        }
        //declare toggle habit completed function 
        function toggleHabitCompleted() {
            habits[index].completed = !habits[index].completed;
            saveHabits();
            renderHabits();
         }
      //listen for click of the button
      button.addEventListener("click", toggleHabitCompleted);

   //delete button. 
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

       //declare delete habit function
        function deleteHabit() {
           habits.splice(index, 1);
           saveHabits();
           renderHabits();
        }
      //listen for click of the delete button.
        deleteButton.addEventListener("click", deleteHabit);

      //cross off habit if it is completed with a line through. 
        if (habit.completed) {
          li.style.textDecoration = "line-through";
        }
        else {
          li.textContent = habit.name;
        }

        habitList.appendChild(li);
        li.appendChild(button);
        li.appendChild(deleteButton);

   } //end of for loop.

//Display the number of total habit     
updateStat(totalHabits, "Total Habits: ", habits.length);

//number of completed habits
function countCompletedHabits(habits) {
//start count at 0
let count = 0;
//look at each habit
for(let i = 0; i < habits.length; i++) {
//testing if statement
let habit = habits[i];
if (habit.completed) { 
count = count + 1;
} //end of if habit.complete condition
} //end of for
return count;
}  // end of countCompleteHabits function

//displays the count after checking every habit
const completedCount = countCompletedHabits(habits);
updateStat(completedHabits, "Completed Habits: ", completedCount);

//remaining habits counter
const remainCount = habits.length - completedCount;
updateStat(remainHabits, "Remaining Habits: ", remainCount);

} //end of render function

//run the render habit function
loadHabits();
renderHabits();
