let cars = [
{name:"Maruti Swift",price:2200,img:"images/swift.jpg"},
{name:"Honda City",price:3200,img:"images/city.jpg"},
{name:"Jeep Compass",price:5200,img:"images/jeep_compass.avif"},
{name:"Volkswagen Taigun",price:5600,img:"images/VW-taigun-gt-edge-exterior.jpg"},
{name:"Volvo XC60",price:6200,img:"images/xc60.jpg"},
{name:"BMW M8",price:8200,img:"images/m8.webp"}
];

let selectedList=[];

function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateName(name) {
    return /^[A-Za-z\s]{2,50}$/.test(name.trim());
}

function handleLogin() {
    let name = document.getElementById('loginName').value.trim();
    let email = document.getElementById('loginEmail').value.trim();
    let terms = document.getElementById('loginTerms').checked;
    let errorText = document.getElementById('loginError');
    
    if(name === "" || email === ""){
        errorText.innerText = "Error: Please fill in your Name and Email!";
        return; 
    }
    
    if(!validateName(name)){
        errorText.innerText = "Error: Please enter a valid name!";
        return; 
    }
    
    if(validateEmail(email) === false) {
        errorText.innerText = "Error: Please enter a valid Email address!";
        return; 
    }
    
    if(terms === false){
        errorText.innerText = "Error: You must check the permission box!";
        return; 
    }
    
    errorText.innerText = "";
    localStorage.setItem("userName", name); 
    window.location.href = 'main.html';
}

function loadCars(){
let html="";
cars.forEach(c=>{
html+=`
<div class="menu-item" onclick="addToBooking('${c.name}')">
<img src="${c.img}" alt="${c.name}">
<div class="menu-details">
<h3>${c.name}</h3>
<p class="price">₹${c.price}/day</p>
</div>
</div>`;
});
let grid = document.getElementById("car-grid");
if(grid) grid.innerHTML=html;
}

if(document.getElementById("car-grid")){
  loadCars();
}

function addToBooking(item){
selectedList.push(item);
playSound();
updateList();
}

function updateList() {
    let counts = {};
    selectedList.forEach(item => {
        if(!counts[item]){
            counts[item] = 1;
        } else {
            counts[item]++;
        }
    });

    let html = "";
    Object.keys(counts).forEach(item => {
        let quantity = counts[item];
        html += `
        <li><b>${quantity}x</b> ${item}
        <button onclick="removeItem('${item}')">❌</button>
        </li>`;
    });
    
    let list = document.getElementById("selectedItems");
    if(list) list.innerHTML=html;
}

function removeItem(itemToRemove){
    selectedList = selectedList.filter(item => item !== itemToRemove);
    updateList();
}

function validateBooking(){
if(selectedList.length===0){alert("Select at least one car");return false;}

let type=document.getElementsByName("type");
let ok=false;
for(let i=0;i<type.length;i++){if(type[i].checked) ok=true;}
if(!ok){alert("Select ride type");return false;}

let phone=document.getElementById("phone").value;
if(phone.length!=10 || isNaN(phone)){alert("Enter valid phone number");return false;}

let address=document.getElementById("address").value;
if(address.trim()===""){alert("Enter pickup location");return false;}

let payment=document.getElementById("payment").value;
if(payment===""){alert("Select payment");return false;}

return true;
}

function processBooking(){
if(!validateBooking()) return;

let output = document.getElementById("output");
if(output){
  output.style.display="block";
  output.innerText="Your booking is confirmed! Our team will contact you shortly.";
}

showToast();
}

function submitContact(){
let n=document.getElementById("name").value;
let e=document.getElementById("email").value;
let m=document.getElementById("contactMsg").value;
let out=document.getElementById("contactOutput");

if(n==""||e==""||m==""){
    out.style.color="red";out.innerText="Fill all fields";
} else if(!validateEmail(e)) {
    out.style.color="red";out.innerText="Please enter a valid email address.";
} else {
    out.style.color="green";out.innerText="Message sent!";
}
}

function submitFeedback(){
let n=document.getElementById("feedbackName").value;
let e=document.getElementById("feedbackEmail").value;
let out=document.getElementById("feedbackOutput");

if(n==""||e==""){
    out.style.color="red";out.innerText="Please fill in all blanks!";
} else if(!validateEmail(e)) {
    out.style.color="red";out.innerText="Please enter a valid email address.";
} else {
    out.style.color="green";out.innerText="Thanks for your feedback!";
}
}

function showToast(){
let t=document.getElementById("toast");
if(t){
  t.style.display="block";
  setTimeout(()=>t.style.display="none",2000);
}
}

function playSound(){
let sound = document.getElementById("clickSound");
if(sound) sound.play();
}

setInterval(()=>{
let clock = document.getElementById("clock");
if(clock) clock.innerText=new Date().toLocaleTimeString();
},1000);

window.onscroll=function(){
let topBtn = document.getElementById("topBtn");
if(topBtn){
  topBtn.style.display=window.scrollY>200?"block":"none";
}
}

function scrollToTop(){
window.scrollTo({top:0,behavior:'smooth'});
}

let profileDiv = document.getElementById("profileSection");
let storedName = localStorage.getItem("userName"); 

if (profileDiv && storedName) {
    profileDiv.style.display = "flex";
    profileDiv.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" style="width:25px; margin-right:8px;"> <span>${storedName}</span>`;
}