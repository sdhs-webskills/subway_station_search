//write... 
//body 밖에 script태그가 있으면 window.onload 사용
const input = document.querySelector('input');
let autocomplete = document.querySelector('.autocomplete ul'); // .autocomplete ul 선언
let station_data = stationList.data; // stationList의 data
let time_data = timeList.data; // timeList의 data
// let nf = false;

document.querySelector('button').addEventListener('click', Search) // button 클릭시 search함수 실행
input.addEventListener('input', AutoComplete) // input의 값 변경시 autocomplete 함수 실행
input.addEventListener('keyup', highlight); // 키 누룰시 실행

let count = -1; 

function highlight(e){    //하이라이트
    let key = e.keyCode;  // 키코드 받기
    switch(key){
        case 38:
            count--;
            if(count < 0){count = autocomplete.children.length-1}
            auclassremove();
            auclass();
            break;
        case 40:
            count++;
            if(count > autocomplete.children.length -1){count = 0;}
            auclassremove();
            auclass();
            break;
    };
};
function auclass(){ // 클래스를 입히는 함수
    autocomplete.children[count].classList.add('active');
    input.value = autocomplete.children[count].textContent.split("/")[0] // split으로 역명/호선 -> [역명, 호선]바꾼 후 첫번째것만 반환
}
function auclassremove() { //클래스를 지우는 함수
    Array.from(autocomplete.children).forEach((e) => {
        e.classList.remove('active')
    })
}

function AutoComplete(){// 자동완성 해주는 함수
    count = -1;
    autocomplete.innerHTML = "";
    let value = this.value.replace(" ", ""); 
    // if(value != ""){
        let stat = stationList.data.filter((data) => {  // filter로 data안에 station_nm과 같은 값 선언
            if (data.station_nm.indexOf(this.value) != -1) { // input입력 값과 역이름이 값을때 역이름 반환
                return data.station_nm
            };
        });
    
        const result = stat.map((obj) => obj.station_nm); // 역이름
        const result_ln = stat.map((obj) => obj.line_num); // 역노선
        // while (autocomplete.firstChild) autocomplete.removeChild(autocomplete.firstChild) // 첫번째 자식이 말고 다른 자식을 입력 받을 때 첫번쨰 자식 삭제
        for(let i=0; i<result.length && i < 10;i++){ // 역이름
            let li = document.createElement('li');
            li.innerHTML = result[i].replaceAll(value, `<span id="highlight">${value}</span>`)+"/"+result_ln[i]+"호선";
            autocomplete.appendChild(li);
        };

    // };

};


function Search(){
    // inuput값 가져오기
    let input = document.querySelector('input').value; // input의 입력 받은 value값 선언
    // filter로 input값에 맞는 데이터 추출
    let stat = station_data.filter(function(data){ // filter로 data안에 station_nm과 같은 값 선언
        return data.station_nm == input
    })
    const renm = stat.map((obj) => obj.station_nm); // 입력받은 역이름
    const reln = stat.map((obj) => obj.line_num); // 입력받은 역노선
    const frcd = stat.map((obj) => obj.fr_code); // 입력받은 역 코드
    // console.log(stcd) 


    // fr_code로 time_list의 정보 불러오기
    let tim = time_data.filter(function(data){ // time_list에서 fr_code 같은 데이터 가져오기
        for(let i=0; i<frcd.length; i++){
            if(frcd[i] == data.fr_code){
                return data
            };
        };
    });
    tim.sort(); // 데이터 오름차순 정렬
    // console.log(tim)

    let intt1 = tim.filter(function(data){ // 상행선 데이터 구하기
        if(data.inout_tag == 1){
            return data
        };
    });
    let intt2 = tim.filter(function(data){ // 하행선 데이터 구하기
        if(data.inout_tag == 2){
            return data
        };
    });

    intt1 = intt1.filter((data, index, self) =>  // 중복된 오프젝트 지우기(호선)
        index === self.findIndex((t) => (
            t.line_num === data.line_num
        ))
    )
    intt2 = intt2.filter((data, index, self) => 
        index === self.findIndex((t) => (
            t.line_num === data.line_num
        ))
    )

    let ft1 = intt1.map((obj) => obj.first_time);
    let lt1 = intt1.map((obj) => obj.last_time);
    let ft2 = intt2.map((obj) => obj.first_time);
    let lt2 = intt2.map((obj) => obj.last_time);

    // 데이터를 넣을 곳 생성
    let re = document.querySelector('.result');  // .result 선언
    re.innerHTML =  "" // re안에 있는 객체 초기화

    // 추출한 데이터를 안에 넣기
    for(let i=0; i< renm.length; i++){ //stat의 개수만큼 for문이 돔
        let res = document.createElement('div'); // 돔객체 생성
        res.classList.add('res') // 클래스명 지정
        re.appendChild(res) //re안에 자식요소로 넣기
        res.innerHTML = `역명 ${renm[i]} / ${reln[i]} 호선 <br>
        상행선 <br>
        첫차: ${ft1[i]}<br> 막차: ${lt1[i]}<br>
        하행선<br>
        첫차: ${ft2[i]}<br> 막차: ${lt2[i]}<br>`
    };
};