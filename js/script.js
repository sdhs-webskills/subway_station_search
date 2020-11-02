//write...
//역정보 json객체속 데이터 배열을 매핑해서 json객체로 만들어 변수로 저장
var mappedStationList = stationList.data.map((x) => x);
var mappedTimeList = timeList.data.map((x) => x);

// $(document).on('ready', function(){
//     console.log(mappedStationList.filter(x => x.station_nm=="교대"))
// })  

$(".search").on('submit', function(){
    var stNm = $("input").val()
    var stInfo = mappedStationList.filter(x => x.station_nm==`${stNm}`)
    $('.result').empty()
    for(var i in stInfo){
        console.log(stInfo[i])
        showList(stInfo[i])
    }
})

function findStInfo(frCode){
    return mappedTimeList.filter(x => x.fr_code == `${frCode}`)
}

var yoil
window.onload = function checkDate(infos){
    var dt = new Date();
    if(dt.getDay() == 6){yoil = 2}
    else if(dt.getDay() == 0){yoil = 3}
    else{yoil = 1}
}

function timer(){
    var timer = new Date().getTime();
    
}

function showList(infos){
    try{var stTimeInfos = findStInfo(infos.fr_code)}
    catch(e){console.log(1);return}
    var inStTimeInfos = stTimeInfos.filter(x=>x.inout_tag == '1'&& x.week_tag == `${yoil}`)[0]
    var outStTimeInfos = stTimeInfos.filter(x=>x.inout_tag == '2'&& x.week_tag == `${yoil}`)[0]
        $(".result").append(
            `<div class="stInfo">
            <h1>${infos.station_nm}</h1>
            <p>${infos.line_num}호선</p>
            <h1>상행선</h1>
            <p>${inStTimeInfos.first_time}</p>
            <p>${inStTimeInfos.last_time}</p>
            <h1>하행선</h1>
            <p>${outStTimeInfos.first_time}</p>
            <p>${outStTimeInfos.last_time}</p>
            </div>`
        )
    
    $('.timer').append(`<p></p>`)
}
    