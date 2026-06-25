//declare the list, button, and text box variables
const habitList = document.getElementById("habit-list");    //the list
const addButton = document.getElementById("add-button");    //button
const habitInput = document.getElementById("habit-input");  //text box
//Total habits counter
const totalHabits = document.getElementById("total-habits");
//create the habit array
let habits = [];

//function save to local storage
function saveHabits() {
      const stringHabits = JSON.stringify(habits);
      localStorage.setItem("habitKey", stringHabits);
}

//function load from local storage
const getHabits = localStorage.getItem("habitKey");
function loadHabits() {
  if(getHabits !== null){
      
      const savedHabits = JSON.parse(getHabits);
      habits = savedHabits;
  }
}

//add habit button
addButton.addEventListener("click", function() {

   const newHabit = habitInput.value;

   if(newHabit.trim() == "") {
   }
   else {
   habits.push({
     name: newHabit,
     completed: false
   });

   saveHabits();
   renderHabits();

   habitInput.value = "";
}
});





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
        button.addEventListener("click", function() {
          habits[index].completed = 
          !habits[index].completed;
          saveHabits();
          renderHabits();
        });

      //delete button. 
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function(){
          habits.splice(index, 1);
          saveHabits();
          renderHabits();
        });


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
} //end of render function



//run the render habit function
loadHabits();
renderHabits();



