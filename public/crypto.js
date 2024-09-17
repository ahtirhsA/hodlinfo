let clock=document.getElementById('timer')
let toggleButt=document.getElementById('toggle')
let containerEle=document.getElementById('container')
let toggleSwitch=true;

function clockPeriod(){

    let count=parseInt(clock.textContent)
    setInterval(()=>{
       count=count-1 
       if (count===0){
        count=60
       }
       clock.textContent=count 

    },1000)  
}

clockPeriod()

toggleButt.addEventListener('click',()=>{

    toggleSwitch=!toggleSwitch

   if (toggleSwitch){
    toggleButt.innerHTML=`
     <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="aqua" class="bi bi-toggle-on" viewBox="0 0 16 16">
        <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8"/>
      </svg>
    `

   
   }

   else{

    toggleButt.innerHTML=
    `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="aqua" class="bi bi-toggle-off" viewBox="0 0 16 16">
  <path d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5"/>
</svg>`;

   }

   containerEle.classList.toggle('main1')
    
})