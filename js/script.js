//write...
const search_key = document.getElementsByName('search_key')[0]; //name이 search_key이라는 객체를 가져옴
search_key.classList.add('input');
let input_value = new String(); // input_value이라는 변수를 문자열로 복제?

window.onload = function(){
    Search();
    AutoComplete();
    //recommend();
    //const target = 'Is this all there is';
    //const regExp = /.../ig;
    //console.log(target.match(regExp));
}


// function recommend() {
    //let value = search.querySelector('input').value //value에 input
    //value = value.replace(" ", ""); //value 튀어쓰기를 공백으러 바꾸기
    //if (value != "") { //input받은 값이 공백이 아니면 if문 실행
    //    let rrr = staitionData.filter((rc) => { //staitionData 배열의 값들을 순차적으로 함수에 인자로 전달하고 실행하는것
    //        // console.log(rc.station_nm.indexOf(value))
    //        if (rc.station_nm.indexOf(value) != -1) { //rc에 필터된 station_nm의 input에 친 값이 없으면 -1이 나오는데 -1아 아니면 if 실헹
    //            let result = rc.station_nm //
    //            return result
    //        }
    //    })
    //    console.log(rrr)
    //}
// }

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






function AutoComplete(){// 자동완성 해주는 함수
    search_key.addEventListener('input', function () {
        input_value = this.value;
        if (input_value != "") { 
            let stat = stationList.data.filter((data) => { 
                // console.log(data.station_nm.indexOf(this.value))
                if (data.station_nm.indexOf(input_value) != -1) { 
                    // for(let i=0; i<data.s)
                    let result = data.station_nm
                    return result
                }
            })
            const result = stat.map((obj) => Object.values(obj)[0]);
            let autocomplete = document.querySelector('.autocomplete ul');
            // let li = document.createElement('li');
            // li.classList.add('li');
            // autocomplete.appendChild(li)
            // li.innerText = result
            // console.log(result);
            
            for(let i=0; i<result.length;i++){
                while (autocomplete.firstChild) autocomplete.removeChild(autocomplete.firstChild)
                let li =[i];
                li[i] = document.createElement('li');
                li[i].classList.add('li');
                autocomplete.appendChild(li[i])
                console.log(result[i]);
                li[i].innerText = result;
            }

            
            // console.log(result);
            // console.log(stat[Object.keys(stat)[0]]);
            // let a = JSON.stringify(stat)
            // let b = a.split('-')
            
            // for(let i=0; i < station.length; i++){
            //    let list_li = [i];
            //    list_li[i] = document.createElement('li');
            //    list_li[i].classList.add('list_li');
            //    list_ul.appendChild(list_li[i]);
            //    list_li[i].innerText = station[i]
            // }
            // console.log(Object.entries(stat))
            // console.log(stat)
            // console.log(Object.keys(stat))
            // console.log(a)
            // li.innerText = JSON.stringify(result)
        }
    });
    
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


