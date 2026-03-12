let students=[]

function createInputs(){

let n=document.getElementById("numStudents").value

let area=document.getElementById("inputArea")

area.innerHTML=""

for(let i=0;i<n;i++){

area.innerHTML+=`

<h3>Student ${i+1}</h3>

<input placeholder="Name" id="name${i}">

<input placeholder="Maths" id="m${i}">

<input placeholder="Physics" id="p${i}">

<input placeholder="Chemistry" id="c${i}">

<input placeholder="English" id="e${i}">

<input placeholder="Hindi" id="h${i}">

<br><br>

`

}

}

function generateResult(){

students=[]

let n=document.getElementById("numStudents").value

let table=document.getElementById("resultTable")

table.innerHTML=`
<tr>
<th>Rank</th>
<th>Name</th>
<th>Percentage</th>
<th>CGPA</th>
<th>Grade</th>
</tr>
`

for(let i=0;i<n;i++){

let name=document.getElementById(`name${i}`).value

let m=+document.getElementById(`m${i}`).value
let p=+document.getElementById(`p${i}`).value
let c=+document.getElementById(`c${i}`).value
let e=+document.getElementById(`e${i}`).value
let h=+document.getElementById(`h${i}`).value

let total=m+p+c+e+h

let percentage=total/5

let cgpa=(percentage/9.5).toFixed(2)

let grade=""

if(percentage>=90) grade="A"
else if(percentage>=80) grade="B"
else if(percentage>=70) grade="C"
else if(percentage>=60) grade="D"
else if(percentage>=40) grade="E"
else grade="F"

students.push({name,percentage,grade,m,p,c,e,h})

}

students.sort((a,b)=>b.percentage-a.percentage)

students.forEach((s,i)=>{

let cgpa=(s.percentage/9.5).toFixed(2)

table.innerHTML+=`
<tr>
<td>${i+1}</td>
<td>${s.name}</td>
<td>${s.percentage.toFixed(2)}</td>
<td>${cgpa}</td>
<td>${s.grade}</td>
</tr>
`

})

showTopper()

showCharts()

}

function showTopper(){

let topper=students[0]

let lowest=students[students.length-1]

document.getElementById("topper").innerHTML=

`Topper : ${topper.name} (${topper.percentage.toFixed(2)}%) <br>
Lowest Performer : ${lowest.name} (${lowest.percentage.toFixed(2)}%)`

}

function showCharts(){

let names=students.map(s=>s.name)
let percentages=students.map(s=>s.percentage)

let colors=[]

students.forEach(s=>{

if(s.percentage==Math.max(...percentages))
colors.push("green")

else if(s.percentage<40)
colors.push("red")

else
colors.push("steelblue")

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

let gradeCount={}

students.forEach(s=>{
gradeCount[s.grade]=(gradeCount[s.grade]||0)+1
})

new Chart(document.getElementById("pieChart"),{

type:"pie",

data:{
labels:Object.keys(gradeCount),
datasets:[{
data:Object.values(gradeCount)
}]
}

})

let subjects=["Maths","Physics","Chemistry","English","Hindi"]

let avg=[0,0,0,0,0]

students.forEach(s=>{

avg[0]+=s.m
avg[1]+=s.p
avg[2]+=s.c
avg[3]+=s.e
avg[4]+=s.h

})

avg=avg.map(a=>a/students.length)

new Chart(document.getElementById("avgChart"),{

type:"bar",

data:{
labels:subjects,
datasets:[{
label:"Average Marks",
data:avg,
backgroundColor:"orange"
}]
}

})

}

function darkMode(){
document.body.classList.toggle("dark")
}

function searchStudent(){

let input=document.getElementById("search").value.toLowerCase()

let rows=document.querySelectorAll("#resultTable tr")

rows.forEach((row,i)=>{

if(i==0) return

let name=row.children[1].innerText.toLowerCase()

row.style.display=name.includes(input)?"":"none"

})

}
