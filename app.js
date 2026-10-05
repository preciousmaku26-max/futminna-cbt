const courses={
100:["GST 101","GST 102","MTH 101","PHY 101","CHM 101","CSC 101"],
200:["GST 201","MTH 201","PHY 201","CHM 201","Departmental Core"],
300:["Departmental Core","GST / Entrepreneurship","Major Elective","Technical Elective"],
400:["Departmental Core","Major Elective","Technical Elective","Project Preparation"],
500:["Departmental Core","Major Elective","Final Year Project","Seminar"]
};
const questions=[
{q:"If f(x)=2x+3, what is f(4)?",a:["7","8","11","12"],correct:2,why:"Substitute x=4: 2(4)+3=11."},
{q:"Which SI unit measures force?",a:["Joule","Newton","Watt","Pascal"],correct:1,why:"Force is measured in newtons (N)."},
{q:"Which number is prime?",a:["21","27","29","33"],correct:2,why:"29 has no positive divisors other than 1 and itself."}
];
let level=100, course=courses[100][0];
const grid=document.querySelector("#levelsGrid"), box=document.querySelector("#courseBox"), modal=document.querySelector("#modal"), body=document.querySelector("#dialogBody");
function renderLevels(){grid.innerHTML=[100,200,300,400,500].map(x=>`<button class="level ${x===level?"active":""}" data-level="${x}"><strong>${x}L</strong><small>${["Foundation","Intermediate","Core","Advanced","Final year"][x/100-1]}</small></button>`).join("");renderCourses()}
function renderCourses(){box.innerHTML=`<strong>${level}L course selection</strong><div>${courses[level].map(c=>`<button data-course="${c}">${c}</button>`).join("")}</div>`}
function open(html){body.innerHTML=html;modal.classList.remove("hide")}
function quiz(mode){let i=0,score=0;function draw(){let q=questions[i];body.innerHTML=`<div class="eyebrow">${mode==="exam"?"EXAM SIMULATION":"PRACTICE MODE"} · ${level}L · ${course}</div><h2>Question ${i+1} of ${questions.length}</h2><p><b>${q.q}</b></p>${q.a.map((a,n)=>`<button class="quiz-option" data-n="${n}">${String.fromCharCode(65+n)}. ${a}</button>`).join("")}<p id="feedback" style="color:#66746e"></p>`}
function finish(){open(`<div class="eyebrow">RESULT</div><h2>${score}/${questions.length} correct</h2><p>Your score is <b>${Math.round(score/questions.length*100)}%</b>.</p><p>This demo shows the CBT flow. The production version will save attempts, explanations and performance history to your student account.</p><button class="primary full" onclick="modal.classList.add('hide')">Back to dashboard</button>`)}
draw();body.onclick=e=>{if(!e.target.matches(".quiz-option"))return;let q=questions[i],n=+e.target.dataset.n;if(n===q.correct){score++;e.target.style.borderColor="#7cae43";}else{e.target.style.borderColor="#d68a8a"}document.querySelector("#feedback").textContent=q.why;i++;setTimeout(()=>i<questions.length?draw():finish(),650)}}
document.addEventListener("click",e=>{
if(e.target.matches(".level")){level=+e.target.dataset.level;course=courses[level][0];renderLevels()}
if(e.target.matches("[data-course]")){course=e.target.dataset.course;open(`<div class="eyebrow">${level}L COURSE</div><h2>${course}</h2><p>Choose how you want to study.</p><button class="primary full" id="beginPractice">Start practice</button>`);document.querySelector("#beginPractice").onclick=()=>quiz("practice")}
if(e.target.matches(".modes button")){const m=e.target.dataset.mode;if(m==="review")open("<h2>Review mistakes</h2><p>Your mistake history will appear here after you complete real tests and sign in.</p>");else quiz(m)}
if(e.target.id==="login")open("<h2>Student login</h2><p>Authentication is the next production milestone. This prototype keeps the interface ready for student accounts.</p><button class='primary full' onclick='modal.classList.add(\"hide\")'>Continue as demo student</button>")
});
document.querySelector("#close").onclick=()=>modal.classList.add("hide");
renderLevels();
