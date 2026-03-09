const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

renderHabits();

addHabitBtn.onclick = () => {

const name = habitInput.value.trim();

if(name === "") return;

const habit = {
name,
streak:0,
completedToday:false
};

habits.push(habit);

saveHabits();

habitInput.value = "";

renderHabits();

};

function renderHabits(){

habitList.innerHTML = "";

habits.forEach((habit,index)=>{

const card = document.createElement("div");
card.className = "habit-card";

const info = document.createElement("div");
info.className = "habit-info";

const title = document.createElement("strong");
title.textContent = habit.name;

const streak = document.createElement("span");
streak.className = "streak";
streak.textContent = "Streak: " + habit.streak;

info.appendChild(title);
info.appendChild(streak);

const actions = document.createElement("div");

const completeBtn = document.createElement("button");
completeBtn.className = "complete-btn";
completeBtn.textContent = "Done";

completeBtn.onclick = () => {

if(!habit.completedToday){

habit.streak++;
habit.completedToday = true;

saveHabits();
renderHabits();

}

};

const deleteBtn = document.createElement("button");
deleteBtn.className = "delete-btn";
deleteBtn.textContent = "Delete";

deleteBtn.onclick = () => {

habits.splice(index,1);

saveHabits();
renderHabits();

};

actions.appendChild(completeBtn);
actions.appendChild(deleteBtn);

card.appendChild(info);
card.appendChild(actions);

habitList.appendChild(card);

});

}

function saveHabits(){

localStorage.setItem("habits", JSON.stringify(habits));

}
