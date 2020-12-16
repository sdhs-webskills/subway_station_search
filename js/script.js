//write...


// let data = document.createElement('div');
// data.classList.add('search_box');
// document.body.appendChild(data);


// 검색 단어 
const search_key = document.getElementsByName('search_key');

let abc = search_key[0].addEventListener('input', (value)=>{
    console.log([value.data]);
});
// 



// 지하철 역명 배열
const station = new Array();
for (let i=0; i < stationList.data.length; i++) {
    station.push(stationList.data[i].station_nm);
}
// 

window.onload = function search(){
    console.log(station);
}








// console.log("역명: "+station_data(0).station_nm);
// console.log(time_data(0).line_num+"호선");
// console.log("첫차 시간: "+time_data(0).first_time);
// console.log("막차 시간: "+time_data(0).last_time);


