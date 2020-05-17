const weatherForm = document.querySelector("form");
console.log("rrr")
const loc = document.querySelector("input");
const mesg1=document.getElementById("message1");
const mesg2=document.getElementById("message2");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = loc.value;

  fetch("http://localhost:8080/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        mesg1.textContent=data.error;
      }
else{
      mesg1.textContent=data.location
      mesg2.textContent=data.forecastData}
    });
  });
});
