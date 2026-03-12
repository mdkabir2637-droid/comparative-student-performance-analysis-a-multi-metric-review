let students=[]

let subjects=[
"Math",
"Physics",
"Chemistry",
"English",
"Hindi"
]

// Graph instances
let barChartInstance
let pieChartInstance
let avgChartInstance


function createInputs(){

let n=document.getElementById("numStudents").value

let container=document.getElementById("inputs")

container.innerHTML=""

for(let i=0;i<n;i++){

container.innerHTML+=`

<h3>Student ${i+1}</h3>

<input placeholder="Roll No" id="roll${i}">
<input placeholder="Name" id="name${i}">

<br>

<input placeholder="Math" id="m${i}">
<input placeholder="Physics" id="p${i}">
<input placeholder="Chemistry" id="c${i}">
<input placeholder="English" id="e${i}">
<input placeholder="Hindi" id="h${i}">

<br><br>

`

}

}


function generateResult(){

let n=document.getElementById("numStudents").value

students=[]

let tbody=document.querySelector("#resultTable tbody")

tbody.innerHTML=""

for(let i=0;i<n;i++){

let roll=document.getElementById(`roll${i}`).value
let name=document.getElementById(`name${i}`).value

let math=Number(document.getElementById(`m${i}`).value)
let phy=Number(document.getElementById(`p${i}`).value)
let chem=Number(document.getElementById(`c${i}`).value)
let eng=Number(document.getElementById(`e${i}`).value)
let hin=Number(document.getElementById(`h${i}`).value)

let total=math+phy+chem+eng+hin

let percentage=total/5

let cgpa=(percentage/9.5).toFixed(2)

let grade=""

if(percentage>=85) grade="A"
else if(percentage>=70) grade="B"
else if(percentage>=55) grade="C"
else if(percentage>=33) grade="D"
else grade="F"


students.push({
roll,
name,
percentage,
cgpa,
grade,
math,
phy,
chem,
eng,
hin
})

let row=`<tr>

<td>${roll}</td>
<td>${name}</td>
<td>${percentage.toFixed(2)}</td>
<td>${cgpa}</td>
<td>${grade}</td>

</tr>`

tbody.innerHTML+=row

}

makeCharts()

}



function makeCharts(){

let names=students.map(s=>s.name)
let percentages=students.map(s=>s.percentage)

let top=Math.max(...percentages)

let colors=percentages.map(p=>{

if(p==top) return "green"
if(p<33) return "red"
return "yellow"

})


// Destroy old charts

if(barChartInstance) barChartInstance.destroy()
if(pieChartInstance) pieChartInstance.destroy()
if(avgChartInstance) avgChartInstance.destroy()



// Student Performance Graph

let barCtx=document.getElementById("barChart").getContext("2d")

barChartInstance=new Chart(barCtx,{
type:"bar",
data:{
labels:names,
datasets:[{
label:"Percentage",
data:percentages,
backgroundColor:colors
}]
},
options:{
scales:{
y:{
beginAtZero:true
}
}
}
})



// Grade Pie Chart

let grades=students.map(s=>s.grade)

let gradeCount={}

grades.forEach(g=>{

gradeCount[g]=(gradeCount[g]||0)+1

})

let pieCtx=document.getElementById("pieChart").getContext("2d")

pieChartInstance=new Chart(pieCtx,{
type:"pie",
data:{
labels:Object.keys(gradeCount),
datasets:[{
data:Object.values(gradeCount)
}]
}
})




// Subject Average Graph

let avg=[0,0,0,0,0]

students.forEach(s=>{

avg[0]+=s.math
avg[1]+=s.phy
avg[2]+=s.chem
avg[3]+=s.eng
avg[4]+=s.hin

})

avg=avg.map(a=>a/students.length)

let avgCtx=document.getElementById("avgChart").getContext("2d")

avgChartInstance=new Chart(avgCtx,{
type:"bar",
data:{
labels:subjects,
datasets:[{
label:"Average Marks",
data:avg,
backgroundColor:[
"orange",
"blue",
"purple",
"teal",
"brown"
]
}]
},
options:{
scales:{
y:{
beginAtZero:true
}
}
}
})

}



// Search Student

document.getElementById("search").addEventListener("keyup",function(){

let filter=this.value.toLowerCase()

let rows=document.querySelectorAll("#resultTable tbody tr")

rows.forEach(row=>{

let name=row.children[1].textContent.toLowerCase()

row.style.display=name.includes(filter)?"":"none"

})

})



// Dark Mode

function toggleDark(){

document.body.classList.toggle("dark")

}
