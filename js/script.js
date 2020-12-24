//write... 
document.querySelector('button').addEventListener('click', search) // button 클릭시 search함수 실행
document.querySelector('input').addEventListener('keyup', autocomplete) // input의 값 변경시 autocomplete 함수 실행
//body 밖에 script태그가 있으면 window.onload 사용



function autocomplete(){// 자동완성 해주는 함수
    let autocomplete = document.querySelector('.autocomplete ul'); // .autocomplete ul 선언
    autocomplete.innerHTML = "";
    let value = this.value.replace(" ", ""); 
    if(value != ""){
        let stat = stationList.data.filter((data) => {  // filter로 data안에 station_nm과 같은 값 선언
            if (data.station_nm.indexOf(this.value) != -1) { // input입력 값과 역이름이 값을때 역이름 반환
                return data.station_nm
            }
        })
    
        const result = stat.map((obj) => obj.station_nm); // 역이름
        // while (autocomplete.firstChild) autocomplete.removeChild(autocomplete.firstChild) // 첫번째 자식이 말고 다른 자식을 입력 받을 때 첫번쨰 자식 삭제
        for(let i=0; i<result.length && i < 10;i++){ // 역이름
            // let li =[];
            let li = document.createElement('li');
            li.innerHTML = result[i].replaceAll(value, `<span id="highlight">${value}</span>`);
            autocomplete.appendChild(li);
        }
    }
};






let station_data = stationList.data; // stationList의 data
let time_data = timeList.data; // timeList의 data

function search(){
    // inuput값 가져오기
    let input = document.querySelector('input').value; // input의 입력 받은 value값 선언
    // filter로 input값에 맞는 데이터 추출
    let stat = station_data.filter(function(data){ // filter로 data안에 station_nm과 같은 값 선언
        return data.station_nm == input
    })
    const result_nm = stat.map((obj) => obj.station_nm); // 역이름
    const result_ln = stat.map((obj) => obj.line_num); // 역노선
    // 데이터를 넣을 곳 생성
    let re = document.querySelector('.result');  // .result 선언
    re.innerHTML =  "" // re안에 있는 객체 초기화
    
    // 추출한 데이터를 안에 넣기
    for(let i=0; i< stat.length; i++){ //stat의 개수만큼 for문이 돔
        let res = document.createElement('div'); // 돔객체 생성
        res.classList.add('res') // 클래스명 지정
        re.appendChild(res) //re안에 자식요소로 넣기
        res.innerText = "역명: " + result_nm[i] + "\n"  // 정보 삽입
        + result_ln + "호선"+"\n"
    }
}

