//write...

window.onload = function(){
    Search();
    AutoComplete();
    //const target = 'Is this all there is';
    //const regExp = /.../ig;
    //console.log(target.match(regExp));
}

// 지하철 역명 배열
const station = [];
for (let i=0; i < stationList.data.length; i++) {
    station.push(stationList.data[i].station_nm);
}
// 

//let list_ul = document.createElement('ul');
//list_ul.classList.add('list_ul');
//document.body.appendChild(list_ul);
//for(let i=0; i < station.length; i++){
//    let list_li = [i];
//    list_li[i] = document.createElement('li');
//    list_li[i].classList.add('list_li');
//    list_ul.appendChild(list_li[i]);
//    list_li[i].innerText = station[i]
//}




const search_key = document.getElementsByName('search_key')[0]; //name이 search_key이라는 객체를 가져옴
search_key.classList.add('input');
let input_value = new String(); // input_value이라는 변수를 문자열로 복제?


function AutoComplete(){// 자동완성 해주는 함수
    //search_key.addEventListener('input', function () {
    //    for(let i=0; i < station.length; i++){
    //       let p = [i];
    //       p[i] = document.createElement('p');
    //       p[i].classList.add('p');
    //       document.body.appendChild(p[i]);
    //       p[i].innerText = station[i];
    //    }
    //});
    





    //let p = document.createElement('p')
    //p.classList.add('p');
    //document.body.appendChild(p);
    //console.log(str);
    //search_key.addEventListener('input', function(){
    //    let station_num = station.indexOf(input_value)
    //    station.filter(function(value){
    //        if(value == input_value){   
    //            p.innerText = station[station_num] +" / "+stationList.data[station_num].line_num+"호선"
    //        }
    //    })
    //});
};






function Search(){ // 검색 해주는 함수
    let res = document.createElement('div');
    res.classList.add('res')
    document.body.appendChild(res);
    search_key.addEventListener('input', function () { //search_key의 value갑이 변할때마다 함수 실행
        input_value = this.value; // input_value 안에 바뀐 value값 실시간으로 반환
        // console.log(station.indexOf(input_value));

        let station_num = station.indexOf(input_value); // station_num안에 value값의 맞는 번호를 집어 넣음
        // console.log(station_num);

        let search_btm = document.getElementsByTagName('button')[0]; // 검색 버튼을 불러옴
        search_btm.addEventListener('click', function(){ // 검색버튼 클릭시 함수 실행
            res.innerText = "역명: "+ station[station_num] + "\n"
            + "호선: " +stationList.data[station_num].line_num +"호선" + "\n"
            + "첫차: " +timeList.data[station_num].first_time + "\n"
            + "막차: " +timeList.data[station_num].last_time + "\n"
        })
    })
}


