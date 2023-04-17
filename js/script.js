const auto = document.querySelector(".autocomplete ul");
const input = document.getElementsByName("search_key")[0]
const Btn = document.querySelector("button")
const result = document.querySelector(".result")
const station_data = stationList.data;
const timeList_data = timeList.data;
let value = input.value;
let i = 0;
input.addEventListener("input",function(e){
  let value = e.target.value;
  if(!value.trim()){
      return;
    }
  auto.innerHTML=""
  let state = station_data.filter(e => e.station_nm.includes(value));
  input.addEventListener("keydown",function(e){
    if(e.keyCode == 13){
      result.innerHTML=""
      let state = station_data.filter(e => e.station_nm.includes(input.value));
      state.forEach(e => {
        // console.log(e);
        let boxbox  = document.createElement("div");
        timeList_data.forEach(j => {
          if(j.station_cd == e.station_cd && j.fr_code == e.fr_code){
            boxbox.innerHTML = `<p>${e.station_nm}</p><p>${j.first_time}</p><p>${j.last_time}</p>`
            result.append(boxbox)
          }
        });
      });
    }
  })
  for (let i = 0; i < 10; i++) { 
      let text = (state[i].station_nm.replace(value,`<span class="aaa">${value}</span>`))
      let box = document.createElement("li")
      box.innerHTML=`<span>${text}</span>`
      auto.append(box)
  }
  state.forEach(e => {
  });
})
input.addEventListener("keydown",function(e){
  if(e.keyCode === 40){
    auto.childNodes.forEach(e => {
      e.classList.remove("ccc")
    });
    if(i < 0){
      i = 0;
    }if(i > auto.childNodes.length-1){
      i = auto.childNodes.length-1;
    }
    auto.children[i].classList.add("ccc")
    input.value = auto.children[i].innerText
    i++
  }
  // if()
})