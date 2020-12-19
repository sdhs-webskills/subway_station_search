//write...
const search_key = document.getElementsByName('search_key')[0]; //name이 search_key이라는 객체를 가져옴
search_key.classList.add('input');
let input_value = new String(); // input_value이라는 변수를 문자열로 복제?

window.onload = function(){
    Search();
    AutoComplete();
}


// 지하철 역명 배열
const station = [];
for (let i=0; i < stationList.data.length; i++) {
    station.push(stationList.data[i].station_nm);
}
//

function AutoComplete(){// 자동완성 해주는 함수
    search_key.addEventListener('input', function () {
        input_value = this.value;
            let stat = stationList.data.filter((data) => { 
                // console.log(data.station_nm.indexOf(this.value))
                if (data.station_nm.indexOf(input_value) != -1) { 
                    let result = data.station_nm
                    return result
                }
            })
            const result = stat.map((obj) => Object.values(obj)[0]);
            let autocomplete = document.querySelector('.autocomplete ul');
            
            
            while (autocomplete.firstChild) autocomplete.removeChild(autocomplete.firstChild)
            for(let i=0; i<result.length;i++){
                let li =[i];
                li[i] = document.createElement('li');
                li[i].classList.add('li');
                autocomplete.appendChild(li[i])
                // console.log(result[i]);
                li[i].innerText = result[i];
                // console.log(li.length);
                if(li.length > 10){
                    li[11].remove()
                }
            }
        }
    );
    
};






function Search(){ // 검색 해주는 함수
    let res = document.createElement('div');
    res.classList.add('res')
    document.body.appendChild(res);
    search_key.addEventListener('input', function () { //search_key의 value갑이 변할때마다 함수 실행
        input_value = this.value; // input_value 안에 바뀐 value값 실시간으로 반환
        // console.log(station.indexOf(input_value));        
        
        let search_btm = document.getElementsByTagName('button')[0]; // 검색 버튼을 불러옴
        search_btm.addEventListener('click', function(){ // 검색버튼 클릭시 함수 실행
            //let a = station.filter(function(data){
            //    if(data == input_value){
            //        return data
            //    }
            //})
            for(let i=0;i<station.length; i++){
                if(station[i].indexOf(input_value) != -1){
                     res.innerText = "역명: "+ station[i] + "\n"
                     + "호선: " +stationList.data[i].line_num +"호선" + "\n"
                     + "첫차: " +timeList.data[i].first_time + "\n"
                     + "막차: " +timeList.data[i].last_time + "\n"
                }
            } 
        })
    })
}
