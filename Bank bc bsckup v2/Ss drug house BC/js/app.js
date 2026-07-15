const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

if(mobileMenu.style.display==="block"){

mobileMenu.style.display="none";

}else{

mobileMenu.style.display="block";

}

});