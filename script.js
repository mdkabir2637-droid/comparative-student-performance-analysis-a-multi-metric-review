let students=[]

let subjects=["Math","Physics","Chemistry","English","Hindi"]

let barChart=null
let pieChart=null
let avgChart=null



function createInputs(){

let n=document.getElementById("numStudents").value

let container=document.getElementById("inputs")

container.innerHTML=""

for(let i=0;i<n;i++){

container.innerHTML+=`

<h3>Student ${i+1}</h3>

<input placeholder="Roll No" id="roll${i}">
<input placeholder="Name" id="name${i}"><br>

<input placeholder="Math Marks" id="math${i}">
<input placeholder="Physics Marks" id="phy${i}">
<input placeholder="Chemistry Marks" id="chem${i}">
<input placeholder="English Marks" id="eng${i}">
<input placeholder="Hindi Marks" id="hin${i}">

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

let math=Number(document.getElementById(`math${i}`).value)
let phy=Number(document.getElementById(`phy${i}`).value)
let chem=Number(document.getElementById(`chem${i}`).value)
let eng=Number(document.getElementById(`eng${i}`).value)
let hin=Number(document.getElementById(`hin${i}`).value)

let total=math+phy+chem+eng+hin

let percentage=total/5

let cgpa=(percentage/9.5).toFixed(2)

let grade=""

if(percentage>=90) grade="AA"
else if(percentage>=80) grade="AB"
else if(percentage>=70) grade="BB"
else if(percentage>=60) grade="BC"
else if(percentage>=50) grade="CC"
else if(percentage>=33) grade="DD"
else grade="F"


students.push({
roll,name,math,phy,chem,eng,hin,percentage,cgpa,grade
})

tbody.innerHTML+=`

<tr>
<td>${roll}</td>
<td>${name}</td>
<td>${percentage.toFixed(2)}</td>
<td>${cgpa}</td>
<td>${grade}</td>
</tr>

`

}

generateCharts()

}



function generateCharts(){

if(students.length===0) return

let names=students.map(s=>s.name)

let percentages=students.map(s=>s.percentage)

let topper=Math.max(...percentages)

let colors=percentages.map(p=>{

if(p===topper) return "green"
if(p<33) return "red"
return "yellow"

})


if(barChart) barChart.destroy()
if(pieChart) pieChart.destroy()
if(avgChart) avgChart.destroy()



barChart=new Chart(document.getElementById("barChart"),{

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
scales:{y:{beginAtZero:true}}
}

})



let gradeCount={}

students.forEach(s=>{

gradeCount[s.grade]=(gradeCount[s.grade]||0)+1

})


pieChart=new Chart(document.getElementById("pieChart"),{

type:"pie",

data:{
labels:Object.keys(gradeCount),
datasets:[{data:Object.values(gradeCount)}]
}

})



let avg=[0,0,0,0,0]

students.forEach(s=>{

avg[0]+=s.math
avg[1]+=s.phy
avg[2]+=s.chem
avg[3]+=s.eng
avg[4]+=s.hin

})

avg=avg.map(a=>a/students.length)


avgChart=new Chart(document.getElementById("avgChart"),{

type:"bar",

data:{
labels:subjects,
datasets:[{
label:"Average Marks",
data:avg,
backgroundColor:["orange","blue","purple","teal","brown"]
}]
},

options:{
scales:{y:{beginAtZero:true}}
}

})

}



document.getElementById("search").addEventListener("keyup",function(){

let filter=this.value.toLowerCase()

let rows=document.querySelectorAll("#resultTable tbody tr")

rows.forEach(row=>{

let name=row.children[1].textContent.toLowerCase()

row.style.display=name.includes(filter)?"":"none"

})

})



function toggleDark(){

document.body.classList.toggle("dark")

}
