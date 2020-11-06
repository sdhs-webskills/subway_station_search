//write...
//지하철역정보 json객체속 데이터 배열을 매핑해서 json객체로 만들어 변수로 저장
var mappedStationList = stationList.data.map((x) => x);


var upwardTimeList//상행선 열차 시간 정보 저장용 배열
var downwardTimeList//하행선 열차 시간 정보 저장용 배열
var yoil //week_tag 구별용 변수
window.onload = function checkDate(infos){
    //요일 변수 설정, 평일은 1, 토요일은 2, 일요일은 3
    var dt = new Date();
    if(dt.getDay() == 6){yoil = 2}
    else if(dt.getDay() == 0){yoil = 3}
    else{yoil = 1}
    //timeList 객체의 data값중 상행선 열차의 정보만 가져와 변수에 저장
    upwardTimeList = timeList.data.filter((x) => {if(x.inout_tag='1'&&x.week_tag == `${yoil}`)return x});
    //timeList 객체의 data값중 하행선 열차의 정보만 가져와 변수에 저장
    downwardTimeList = timeList.data.filter((x) => {if(x.inout_tag='2'&&x.week_tag == `${yoil}`)return x});
}

// var rowCount;
// function rowSelect(arrow){
//     if(arrow == 'up'){
//         console.log($('.autocomplete>ul').element)
//     } else if(arrow == 'down'){

//     }
// }

//검색창에서 키 입력 감지시 자동완성 목록을 보여주는 함수 실행
$('.search').keyup(function(){
    if($('input').val() != ''){ //입력값이 비어있을때 작동하지 않도록 조건문 설정
        //역 목록에서 역 이름에 입력값이 포함된 객체만 가져와 배열로 저장
        var recommended = mappedStationList.filter(x => x.station_nm.indexOf($("input").val()) != -1)
        //가져온 역 목록을 이름에 맞게 정렬
        recommended.sort((a,b)=>a.station_nm < b.station_nm ? -1 : a.station_nm > b.station_nm ? 1 : 0);
        //정렬된 역 목록 배열과 입력값을 추천목록을 보여주는 함수의 인자로 넘겨주며 호출
        showRecommended(recommended, $("input").val())
    } else {
        //입력값이 빌 시 자동완성 목록을 없앰
        $('.autocomplete>ul').empty()
    }
})


//역 목록과 입력된 값을 받아 역 목록을 최대 10개까지 보여주는 함수
function showRecommended(recommended, input){

    //이미 표시돼있는 역 목록을 초기화
    $('.autocomplete>ul').empty()

    //역명에서 입력된 값을 빨간 글자로 변경하기 위한 변수
    
    //역 목록의 길이만큼, 최대 10번 반복
    for(var i = 0; i < recommended.length && i < 10; i++){
        const redLetter = `<p class="redChar">${input.charAt(i)}</p>`
        
        //출력할 내용 변수
        const result = `${(recommended[i].station_nm+recommended[i].line_num)}호선`

        //출력할 내용에서 입력값과 같은 부분을 replaceLetter 변수의 값으로 변환함
        for(let j = 0; j < input.length; j++){
            result = result.replaceAll(result.charAt(result.indexOf(input.charAt(i))).toString(),replaceLetter)
        }

        //result 변수의 값을 li태그에 담아 자동완성 리스트에 추가
        $('.autocomplete>ul').append(`<li><p class="redChar">${redLetter}</p>${result}</li>`)
    }
}

//역 이름 입력창에서 전송시 역정보 목록을 찾아 띄워주는 함수 실행
$(".search").on('submit', function () {

    //입력값을 읽어와 변수로 저장
    var stNm = $("input").val();
    
    //역정보 목록 초기화
    $('.result').empty();

    if(stNm == ''){//입력값이 비어있을경우 모든 역 목록을 보여줌
        showList(mappedStationList)
    } else {//입력값이 있을경우

        //역정보 객체에서 역명이 검색한 역명과 같은 객체만 가져와 stInfo 변수에 저장
        var stInfo = mappedStationList.filter(x => x.station_nm == `${stNm}`);


        //역정보 목록을 띄워주는 함수에 stInfo배열을 넘겨줌
        showList(stInfo);
    }
})


//검색된 역정보 배열을 받아 역 목록을 화면에 출력하는 함수
function showList(infos){

    //함수 시작시간 기록
    var startTime = new Date().getTime();
    var result = ''
    for(var i in infos){
        var inStTimeInfo = upwardTimeList.filter(x=> x.fr_code == infos[i].fr_code)[0]
        var outStTimeInfo = upwardTimeList.filter(x=> x.fr_code == infos[i].fr_code)[0]
        result+=`<div class="stInfo">
                <h1>${infos[i].station_nm}</h1>
                <p>${infos[i].line_num}호선</p>`
        inStTimeInfo == undefined ? outStTimeInfo == undefined ? result+='<h1>정보가 없습니다</h1>' : result += `<h1>하행선</h1><p>${outStTimeInfo.first_time}</p><p>${outStTimeInfo.last_time}</p>`
        : outStTimeInfo == undefined ? result += `<h1>상행선</h1><p>${inStTimeInfo.first_time}</p><p>${inStTimeInfo.last_time}</p>` 
        : result += `<h1>상행선</h1><p>${inStTimeInfo.first_time}</p><p>${inStTimeInfo.last_time}</p>
                     <h1>하행선</h1><p>${outStTimeInfo.first_time}</p><p>${outStTimeInfo.last_time}</p>` ;
        result+='</div>'
    }
    $('.result').append(result)
    var endTime = new Date().getTime();
    $('.timer>h1').remove()
    $('.timer').append(`<h1>${(endTime - startTime)/1000}초</h1>`)
}

// feat: 기능추가
// refactor: 개선
// docs: 문서
// chore: 기능상의 변화는 없음
// fix: 오류 수정, 버그 수정