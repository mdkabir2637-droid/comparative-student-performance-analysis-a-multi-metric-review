let students=[]

let subjects=[
"Mathematics I",
"Computer Science",
"Data Analytics",
"English"
]
function createInputs(){

let n=document.getElementById("numStudents").value

let area=document.getElementById("inputArea")

area.innerHTML=""

for(let i=0;i<n;i++){

area.innerHTML+=`

<h3>Student ${i+1}</h3>

<input placeholder="Roll Number" id="roll${i}">

<input placeholder="Student Name" id="name${i}">

<input type="number" placeholder="Math Marks" id="math${i}">

<input type="number" placeholder="CS Marks" id="cs${i}">

<input type="number" placeholder="DA Marks" id="da${i}">

<input type="number" placeholder="English Marks" id="eng${i}">

`

}

}
function generateResult(){

students=[]

let n=document.getElementById("numStudents").value

for(let i=0;i<n;i++){

let roll=document.getElementById(`roll${i}`).value

let name=document.getElementById(`name${i}`).value

let math=Number(document.getElementById(`math${i}`).value)

let cs=Number(document.getElementById(`cs${i}`).value)

let da=Number(document.getElementById(`da${i}`).value)

let eng=Number(document.getElementById(`eng${i}`).value)

let total=math+cs+da+eng

let percentage=total/4

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

roll,name,math,cs,da,eng,

percentage,

cgpa,

grade

})

}

showTable()

showTopper()

showCharts()

showSubjectAverage()

}
function showTable(){

let table=document.getElementById("resultTable")

table.innerHTML=

"<tr><th>Name</th><th>%</th><th>CGPA</th><th>Grade</th></tr>"

students.forEach(s=>{

table.innerHTML+=`

<tr>

<td>${s.name}</td>

<td>${s.percentage.toFixed(2)}</td>

<td>${s.cgpa}</td>

<td>${s.grade}</td>

</tr>

`

})

}
function showTopper(){

let topper=students.reduce((a,b)=>a.percentage>b.percentage?a:b)

let lowest=students.reduce((a,b)=>a.percentage<b.percentage?a:b)

document.getElementById("topper").innerText=

"Topper: "+topper.name+" "+topper.percentage+"%"

document.getElementById("lowest").innerText=

"Lowest: "+lowest.name+" "+lowest.percentage+"%"

}
function showCharts(){

let names=students.map(s=>s.name)

let percentages=students.map(s=>s.percentage)

new Chart(document.getElementById("barChart"),{

type:"bar",

data:{

labels:names,

datasets:[{

label:"Percentage",

data:percentages,

backgroundColor:"steelblue"

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
}
function showSubjectAverage(){

let mathAvg=students.reduce((a,b)=>a+b.math,0)/students.length

let csAvg=students.reduce((a,b)=>a+b.cs,0)/students.length

let daAvg=students.reduce((a,b)=>a+b.da,0)/students.length

let engAvg=students.reduce((a,b)=>a+b.eng,0)/students.length

let values=[mathAvg,csAvg,daAvg,engAvg]

new Chart(document.getElementById("subjectChart"),{

type:"bar",

data:{

labels:subjects,

datasets:[{

data:values,

backgroundColor:["orange","green","purple","teal"]

}]

}

})

let min=Math.min(...values)

let max=Math.max(...values)

let hardest=subjects[values.indexOf(min)]

let easiest=subjects[values.indexOf(max)]

document.getElementById("difficulty").innerText=

"Hardest Subject: "+hardest+

" | Easiest Subject: "+easiest
function searchStudent(){
let input=document.getElementById("search").value.toLowerCase();
}
let colors=[];

for(let i=0;i<percentages.length;i++){

if(percentages[i]==Math.max(...percentages))
colors.push("green");

else if(percentages[i]<33)
colors.push("red");

else
colors.push("blue");

}
  new Chart(ctx,{
type:'bar',

data:{
labels:names,
datasets:[{
label:'Percentage',
data:percentages,
backgroundColor:colors
}]
},

options:{
plugins:{
legend:{display:false}
},
scales:{
y:{beginAtZero:true}
}
}

});
new Chart(pie,{
type:'pie',

data:{
labels:['AA','AB','BB','BC','CC','DD','F'],

datasets:[{
data:gradeCounts,
backgroundColor:[
'green','blue','purple','orange','cyan','brown','red'
]
}]
}

});
new Chart(lineCtx,{

type:'line',

data:{
labels:subjects,

datasets:[{
label:'Average Marks',
data:subjectAverage,
borderColor:'blue',
fill:false
}]
}

});
function darkMode(){
document.body.classList.toggle("dark");
}
students.sort((a,b)=>b.percentage-a.percentage);

students.forEach((s,i)=>{
s.rank=i+1;
});
animation:{
duration:2000
}

  


}
