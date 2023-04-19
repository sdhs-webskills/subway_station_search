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
        let resulttext;
        if(e.line_num =="a" || e.line_num =="k"){
          resulttext=`공항철도`
       }else if(e.line_num =="b"){
          resulttext=`분당선`
       }else if(e.line_num =="g"){
          resulttext=`경춘선`
       }else if(e.line_num =="s"){
          resulttext=`신분당선`
       }else if(e.line_num =="su"){
          resulttext=`수인선`
       }else if(e.line_num =="i"){
          resulttext=`인천 1호선`
       }else if(e.line_num =="e"){
          resulttext=`용인경전철`
       }else if(e.line_num =="u"){
          resulttext=`의정부경전철`
       }else{
       resulttext=`${e.line_num}호선`
       }
        timeList_data.forEach(j => {
          
          if(j.station_cd == e.station_cd && j.fr_code == e.fr_code){
            boxbox.innerHTML = `<p>${e.station_nm}</p><p>첫차:${j.first_time}</p><p>막차${j.last_time}</p>
            <p>${resulttext}<br></p>`
            result.append(boxbox)
          }
        });
      });
    }
  })
  Btn.addEventListener("click",function(e){
      console.log(Btn);
     result.innerHTML=""
     let state = station_data.filter(e => e.station_nm.includes(input.value));
     state.forEach(e => {
       // console.log(e);
       let boxbox  = document.createElement("div");
       let resulttext;
       if(e.line_num =="a" || e.line_num =="k"){
         resulttext=`공항철도`
      }else if(e.line_num =="b"){
         resulttext=`분당선`
      }else if(e.line_num =="g"){
         resulttext=`경춘선`
      }else if(e.line_num =="s"){
         resulttext=`신분당선`
      }else if(e.line_num =="su"){
         resulttext=`수인선`
      }else if(e.line_num =="i"){
         resulttext=`인천 1호선`
      }else if(e.line_num =="e"){
         resulttext=`용인경전철`
      }else if(e.line_num =="u"){
         resulttext=`의정부경전철`
      }else{
      resulttext=`${e.line_num}호선`
      }
       timeList_data.forEach(j => {
         
         if(j.station_cd == e.station_cd && j.fr_code == e.fr_code){
           boxbox.innerHTML = `<p>${e.station_nm}</p><p>첫차:${j.first_time}</p><p>막차${j.last_time}</p>
           <p>${resulttext}<br></p>`
           result.append(boxbox)
         }
       });
     });
 })
  let resulttext;
  for (let i = 0; i < 10; i++) { 
    console.log(state[i].line_num);
    if(state[i].line_num =="a" || state[i].line_num =="k"){
      resulttext=`공항철도`
   }else if(state[i].line_num =="b"){
      resulttext=`분당선`
   }else if(state[i].line_num =="g"){
      resulttext=`경춘선`
   }else if(state[i].line_num =="s"){
      resulttext=`신분당선`
   }else if(state[i].line_num =="su"){
      resulttext=`수인선`
   }else if(state[i].line_num =="i"){
      resulttext=`인천 1호선`
   }else if(state[i].line_num =="e"){
      resulttext=`용인경전철`
   }else if(state[i].line_num =="u"){
      resulttext=`의정부경전철`
   }else{
   resulttext=`${state[i].line_num}호선`
   }
      let text = (state[i].station_nm.replace(value,`<span class="aaa">${value}</span><span></span>`))
      let box = document.createElement("li")
      box.innerHTML=`<span>${text}</span><span> ${resulttext}</span>`
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
      i = 0;
    }
    auto.children[i].classList.add("ccc")
    input.value = auto.children[i].innerText.split(" ")[0]
    i++
  }
  // if()
})