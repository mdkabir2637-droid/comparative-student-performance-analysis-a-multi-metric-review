let subjects=["Maths","Physics","Chemistry","English","Hindi"]

let students=[]

function createInputs(){

let n=document.getElementById("numStudents").value

let div=document.getElementById("inputs")

div.innerHTML=""

for(let i=0;i<n;i++){

div.innerHTML+=`

<h3>Student ${i+1}</h3>

<input placeholder="Roll No" id="roll${i}">

<input placeholder="Name" id="name${i}">

<br><br>

${subjects.map(s=>`<input placeholder="${s}" id="${s}${i}">`).join("")}

<br><br>

`

}

}

function generateResult(){

students=[]

let n=document.getElementById("numStudents").value

let tbody=document.querySelector("#resultTable tbody")

tbody.innerHTML=""

for(let i=0;i<n;i++){

let roll=document.getElementById(`roll${i}`).value
let name=document.getElementById(`name${i}`).value

let marks=[]
let total=0

subjects.forEach(s=>{

let m=parseFloat(document.getElementById(`${s}${i}`).value)

marks.push(m)

total+=m

})

let percentage=total/subjects.length

let cgpa=(percentage/9.5)

let grade=""

if(percentage>=90) grade="AA"
else if(percentage>=80) grade="AB"
else if(percentage>=70) grade="BB"
else if(percentage>=60) grade="BC"
else if(percentage>=50) grade="CC"
else if(percentage>=33) grade="DD"
else grade="F"

students.push({

roll,
name,
percentage,
cgpa,
grade,
marks

})

let tr=document.createElement("tr")

tr.innerHTML=`

<td>${roll}</td>
<td>${name}</td>
<td>${percentage.toFixed(2)}</td>
<td>${cgpa.toFixed(2)}</td>
<td>${grade}</td>

`

tbody.appendChild(tr)

}

showCharts()

}

function showCharts(){

let names=students.map(s=>s.name)

let percentages=students.map(s=>s.percentage)

let topper=Math.max(...percentages)

let colors=[]

students.forEach(s=>{

if(s.percentage==topper) colors.push("green")

else if(s.grade=="F") colors.push("red")

else colors.push("yellow")

})

new Chart(document.getElementById("barChart"),{

type:"bar",

data:{
labels:names,
datasets:[{
label:"Percentage",
data:percentages,
backgroundColor:colors
}]
}

})

let grades=students.map(s=>s.grade)

let count={}

grades.forEach(g=>{

count[g]=(count[g]||0)+1

})

new Chart(document.getElementById("pieChart"),{

type:"pie",

data:{
labels:Object.keys(count),
datasets:[{

data:Object.values(count)

}]
}

})

let avg=[]

for(let i=0;i<subjects.length;i++){

let sum=0

students.forEach(s=>{

sum+=s.marks[i]

})

avg.push(sum/students.length)

}

new Chart(document.getElementById("avgChart"),{

type:"bar",

data:{
labels:subjects,
datasets:[{

label:"Average Marks",

data:avg,

backgroundColor:[
"blue",
"green",
"orange",
"purple",
"red"
]

}]
}

})

}

function toggleDark(){

document.body.classList.toggle("dark")

}
