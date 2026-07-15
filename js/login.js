import { auth } from "./firebase.js";
import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async()=>{

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

const message=document.getElementById("loginMessage");

try{

await signInWithEmailAndPassword(auth,email,password);

location.href="dashboard.html";

}catch(e){

message.innerText=e.message;

}

});