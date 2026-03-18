
// let parent=document.getElementById("container")
// let childElement=document.createElement("div");
// let child2=document.createElement("span");
// childElement.style.backgroundColor="teal"
// child2.innerText="This is my second dom class";
// childElement.innerText="Test subject";
// childElement.appendChild(child2);
// parent.appendChild(childElement);


let parent=document.getElementById("container")
// let content=document.createElement("div");
// let title=document.createElement("p");
// let clickableButton=document.createElement("button");
// clickableButton.innerText="Click"
// clickableButton.addEventListener("click",()=>{
//    title.style.color="red";
//    desc.innerHTML="Event handlers"
// })
// title.innerText="This is javascript class"
// let desc=document.createElement("span");
// desc.innerText="This is my first js class where I am going to learn dom manupulation"

// content.appendChild(title);
// content.appendChild(desc);
// content.appendChild(clickableButton)
// parent.appendChild(content);



let inputbox=document.createElement("input");
inputbox.setAttribute("placeholder","Enter data");
let inputbox2=document.createElement("input");
inputbox2.setAttribute("placeholder","Enter Email");
inputbox.addEventListener("change",(e)=>{
console.log(e.target.value);
})
parent.appendChild(inputbox)
parent.appendChild(inputbox2)