const topics=[
["IA y tecnología","Modelos, agentes, automatización y herramientas"],
["Negocios","Estrategia, ventas, marketing y modelos de negocio"],
["Economía y finanzas","Mercados, tasas, inflación, inversión y empresas"],
["Geopolítica","Poder, países, conflictos y tendencias globales"],
["Ciencia y salud","Investigación, medicina y biotecnología"],
["Historia","Contexto histórico y conexiones con el presente"],
["Psicología","Comportamiento humano, aprendizaje y decisiones"],
["Cultura y arte","Arte, arquitectura, música, literatura"],
["Motocicletas","Industria, tecnología, mantenimiento y mercado"],
["Productividad","Sistemas, hábitos y herramientas"]
];

const content=[
{id:"ai-agents",tag:"IA / TECNOLOGÍA",title:"Los agentes de IA están cambiando de herramienta a sistema",summary:"La evolución importante no es solo que los modelos respondan mejor, sino que puedan ejecutar secuencias de tareas con herramientas y contexto.",why:"Te conviene entender esta diferencia porque conecta IA, automatización y oportunidades de negocio.",read:"4 min",topic:"IA y tecnología"},
{id:"rates",tag:"ECONOMÍA",title:"Por qué las tasas de interés afectan casi todo",summary:"Las tasas cambian el costo del dinero y terminan influyendo en crédito, valuaciones, consumo, inversión y decisiones empresariales.",why:"Es uno de los conceptos fundamentales para entender mercados y empresas.",read:"5 min",topic:"Economía y finanzas"},
{id:"business-model",tag:"NEGOCIOS",title:"Una empresa no es solamente su producto",summary:"Un modelo de negocio explica cómo una empresa crea valor, lo entrega y captura ingresos de manera sostenible.",why:"Es una pieza básica para desarrollar criterio empresarial y detectar oportunidades.",read:"5 min",topic:"Negocios"},
{id:"geo",tag:"GEOPOLÍTICA",title:"Cómo leer un conflicto más allá del titular",summary:"Un buen análisis separa hechos, intereses de los actores, antecedentes, capacidades y escenarios futuros.",why:"Te ayuda a desarrollar criterio y evitar interpretar la geopolítica únicamente desde titulares.",read:"6 min",topic:"Geopolítica"},
{id:"surprise",tag:"SORPRÉNDEME",title:"El conocimiento se vuelve más útil cuando crea conexiones",summary:"Aprender conceptos aislados produce memoria frágil. Conectar ideas nuevas con modelos conocidos permite recuperar y aplicar mejor el conocimiento.",why:"Esta es una de las ideas centrales del sistema que estamos construyendo para ti.",read:"3 min",topic:"Psicología"}
];

let state=JSON.parse(localStorage.getItem("miAprendizaje")||'{"saved":[],"learned":[],"theme":"light"}');

function save(){localStorage.setItem("miAprendizaje",JSON.stringify(state));updateStats();renderSaved();}
function renderToday(){
 const el=document.getElementById("todayFeed");
 el.innerHTML=content.map((x,i)=>`<article class="story">
   <div class="meta">${x.tag} · ${x.read}</div>
   <h3>${x.title}</h3><p>${x.summary}</p>
   <p class="why">Por qué para ti: ${x.why}</p>
   <div class="actions"><button onclick="openContent('${x.id}')">Aprender</button><button onclick="toggleSave('${x.id}')">${state.saved.includes(x.id)?"Guardado":"Guardar"}</button></div>
 </article>`).join("");
}
function renderTopics(){
 document.getElementById("topicsGrid").innerHTML=topics.map(t=>`<button class="topic" onclick="filterTopic('${t[0]}')"><span class="eyebrow">MATERIA</span><strong>${t[0]}</strong><small>${t[1]}</small></button>`).join("");
 document.getElementById("profileTopics").innerHTML=topics.slice(0,7).map((t,i)=>`<div class="topic-line"><span>${t[0]}</span><strong>${i<3?"Alta":"Media"}</strong></div>`).join("");
}
function renderSaved(){
 const el=document.getElementById("savedFeed");
 const arr=content.filter(x=>state.saved.includes(x.id));
 el.innerHTML=arr.length?arr.map(x=>`<article class="story"><div class="meta">${x.tag}</div><h3>${x.title}</h3><p>${x.summary}</p><div class="actions"><button onclick="openContent('${x.id}')">Abrir</button><button onclick="toggleSave('${x.id}')">Quitar</button></div></article>`).join(""):`<div class="card"><h3>Aquí aparecerá lo que guardes.</h3><p>Guarda conceptos, noticias y lecciones que quieras volver a consultar.</p></div>`;
}
function updateStats(){
 document.getElementById("savedCount").textContent=state.saved.length;
 document.getElementById("learnedCount").textContent=state.learned.length;
}
function toggleSave(id){state.saved=state.saved.includes(id)?state.saved.filter(x=>x!==id):[...state.saved,id];save();renderToday();}
function openContent(id){
 const x=content.find(c=>c.id===id); if(!x)return;
 document.getElementById("modalContent").innerHTML=`<span class="pill">${x.tag}</span><h2>${x.title}</h2><p>${x.summary}</p><h3>Entender</h3><p>${x.why}</p><h3>Conectar</h3><p>Este concepto se puede relacionar con otras materias de tu sistema. A medida que aprendamos más, aquí aparecerán conexiones reales con lo que ya sabes.</p><h3>Idea importante</h3><p><strong>El objetivo no es consumir información: es convertirla en conocimiento que puedas recuperar y aplicar.</strong></p><h3>Comprobación</h3><p>¿Podrías explicarle a otra persona, con tus propias palabras, por qué este tema importa?</p><button class="primary" onclick="markLearned('${id}')">Lo entendí · guardar aprendizaje</button>`;
 document.getElementById("modal").classList.remove("hidden");
}
function openLesson(type){openContent("business-model")}
function markLearned(id){if(!state.learned.includes(id))state.learned.push(id);save();closeModal();document.querySelector('[data-target="aprender"]').click();}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function filterTopic(topic){alert(`En la siguiente versión, aquí tendrás un feed personalizado de ${topic}.`)}
document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".tab,.view").forEach(x=>x.classList.remove("active"));btn.classList.add("active");document.querySelector(`[data-view="${btn.dataset.target}"]`).classList.add("active");}));
document.querySelectorAll(".time").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".time").forEach(x=>x.classList.remove("active"));btn.classList.add("active");document.querySelector(".hero .pill").textContent=`HOY · ${btn.textContent.toUpperCase()}`;}));
document.getElementById("themeBtn").onclick=()=>{document.body.classList.toggle("dark");state.theme=document.body.classList.contains("dark")?"dark":"light";save()};
document.getElementById("resetBtn").onclick=()=>{if(confirm("¿Reiniciar los datos de prueba?")){state={saved:[],learned:[],theme:"light"};document.body.classList.remove("dark");save();renderToday();}};
if(state.theme==="dark")document.body.classList.add("dark");
renderToday();renderTopics();renderSaved();updateStats();

if("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(()=>{});
