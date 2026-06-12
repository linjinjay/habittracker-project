const habits = [
   {
     name: "Read",
     completed: false
   },
   {
     name: "Exercise",
     completed: false
   },
   {
     name: "coding",
     completed: false
   },
   {
     name: "video",
     completed: false
   }
];

const habitList = document.getElementById("habit-list");    //the list
const addButton = document.getElementById("add-button");    //button
const habitInput = document.getElementById("habit-input");  //text box

function renderHabits() {
   habitList.innerHTML = "";

   for(let index = 0; index < habits.length; index++) {
      let habit = habits[index];
      const button = document.createElement("button");
        if (habit.completed) {
           button.textContent = "Undo";
        }
        else {
          button.textContent = "Complete";
        }
      const li = document.createElement("li");
        li.textContent = habit.name;
        if (habit.completed) {
          li.style.textDecoration = "line-through";
        }
        else {
          li.textContent = habit.name;
        }
        habitList.appendChild(li);
        li.appendChild(button);

        button.addEventListener("click", function() {
          habits[index].completed = 
          !habits[index].completed;
          renderHabits();
      });
   }
}

renderHabits();

addButton.addEventListener("click", function() {

   const newHabit = habitInput.value;

   habits.push({
     name: newHabit,
     completed: false
   });

   renderHabits();

   habitInput.value = "";

});

