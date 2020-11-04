//write...
//지하철역정보 json객체속 데이터 배열을 매핑해서 json객체로 만들어 변수로 저장
var mappedStationList = stationList.data.map((x) => x);

//지하철시간정보 json객체속 데이터 배열을 매핑해서 json객체로 만들어 변수로 저장
var mappedTimeList = timeList.data.map((x) => x);


$('.search').on('keyup',function(){
    if($('input').val() != ''){
        try{
            var recommended = mappedStationList.filter(x => x.station_nm.indexOf($("input").val()) != -1)
        } catch(e){
            return
        }
        // console.log(recommended)
    }
})

function showRecommended(recommended){

}

$(".search").on('submit', function () {
        var stNm = $("input").val();
        if(stNm == ''){
            showList(mappedStationList)
        } else {
            var stInfo = mappedStationList.filter(x => x.station_nm == `${stNm}`);
            $('.result').empty();
            showList(stInfo);
        }
    })

var yoil
window.onload = function checkDate(infos){
    var dt = new Date();
    if(dt.getDay() == 6){yoil = 2}
    else if(dt.getDay() == 0){yoil = 3}
    else{yoil = 1}
}

function showList(infos){
    var startTime = new Date().getTime();
    $('.result').empty()

    var result = ``;
    for(var i in infos){
        var stTimeInfos = mappedTimeList.filter(x=> x.fr_code == infos[i].fr_code)
        var inStTimeInfos = stTimeInfos.filter(x=>x.inout_tag == '1'&& x.week_tag == `${yoil}`)[0]
        var outStTimeInfos = stTimeInfos.filter(x=>x.inout_tag == '2'&& x.week_tag == `${yoil}`)[0]
        result+=`<div class="stInfo">
                <h1>${infos[i].station_nm}</h1>
                <p>${infos[i].line_num}호선</p>`
        if(inStTimeInfos != undefined){
            result += `<h1>상행선</h1>
                    <p>${inStTimeInfos.first_time}</p>
                    <p>${inStTimeInfos.last_time}</p>`
        }
        if(outStTimeInfos != undefined){
            result += `<h1>하행선</h1>
                    <p>${outStTimeInfos.first_time}</p>
                    <p>${outStTimeInfos.last_time}</p>`
        }
    }
    result+='</div>'
    $('.result').append(result)
    var endTime = new Date().getTime();
    $('.timer>h1').remove()
    $('.timer').append(`<h1>${(endTime - startTime)/1000}초</h1>`)
}
    