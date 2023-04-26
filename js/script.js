//write...
const input = document.querySelector("input");
const autocomplete = document.querySelector('.autocomplete > ul');
const Bt = document.querySelector('button');
const resultTag = document.querySelector('.result');
let idx = -1;

// 입력시 동작
input.addEventListener("input", fu)

// const STATION_LINE_NAME = {
//    k: '경의중앙선',
//    a: '공항철도',
//    b: '분당선',
//    g: '경춘선',
//    s: '신분당선',
//    su: '수인선',
//    i: '인천 1호선',
//    e: '용인경전철',
//    u: '외정부경전철'
// }

// console.log(Object.values(STATION_LINE_NAME)[0])



// 입력값 + 호선 자동완성 리스트
let lineNum;
const createItem = ({ station_nm, station_cd, line_num }) => {
    if (autocomplete.children.length < 10) {
        const tagCr = document.createElement("li");
        if (line_num == 'k') {
            lineNum = '경의중앙선';
        } else if (line_num == 'a') {
            lineNum = '공항철도';
        } else if (line_num == 'b') {
            lineNum = '분당선';
        } else if (line_num == 'g') {
            lineNum = '경춘선';
        } else if (line_num == 's') {
            lineNum = '신분당선';
        } else if (line_num == 'su') {
            lineNum = '수인선';
        } else if (line_num == 'i') {
            lineNum = '인천 1호선';
        } else if (line_num == 'e') {
            lineNum = '용인경전철';
        } else if (line_num == 'u') {
            lineNum = '의정부경전철';
        } else {
            lineNum = line_num + '호선';
        }
        autocomplete.appendChild(tagCr);
        const replace_text = station_nm.replace(input.value, `<span class="active_text">${input.value}</span>`)
        tagCr.innerHTML = `${replace_text} ${lineNum}`;
    }
}

// 입력한 값 조회
function fu(event) {
    autocomplete.innerHTML = '';
    if (!event.target.value.trim()) return;
    const station = stationList.data.filter(item => item.station_nm.includes(input.value));
    station.forEach(e => createItem(e));
}

// 오름차순 정리
stationList.data.sort(function (a, b) {
    return a.station_nm < b.station_nm ? -1 : a.station_nm > b.station_nm ? 1 : 0;
})

// 검색값 출력
input.addEventListener("keydown", inputAction)
// Bt.addEventListener("click", btAction)


let timeData = [];
timeList.data.forEach(e => { timeData.push(e) })

// 엔터키 검색어 출력
function inputAction(event) {
    // console.log(event.keyCode);
    station = stationList.data.filter(item => item.station_nm.includes(input.value));
    if (event.keyCode == 13) {
        resultTag.textContent = null;
        station.forEach(e => {
            if (e.line_num == 'k') {
                lineNum = '경의중앙선';
            } else if (e.line_num == 'a') {
                lineNum = '공항철도';
            } else if (e.line_num == 'b') {
                lineNum = '분당선';
            } else if (e.line_num == 'g') {
                lineNum = '경춘선';
            } else if (e.line_num == 's') {
                lineNum = '신분당선';
            } else if (e.line_num == 'su') {
                lineNum = '수인선';
            } else if (e.line_num == 'i') {
                lineNum = '인천 1호선';
            } else if (e.line_num == 'e') {
                lineNum = '용인경전철';
            } else if (e.line_num == 'u') {
                lineNum = '의정부경전철';
            } else {
                lineNum = e.line_num + '호선';
            }
            const fuck = timeData.filter(ee => ee.station_cd.includes(e.station_cd))
            const div = document.createElement('div');
            if (!fuck[0]) {
                div.innerHTML = `${e.station_nm}역
                ${lineNum}`;
            } else {
                div.innerHTML = `${e.station_nm}역
                ${lineNum}
                첫차: ${fuck[0].first_time}
                막차: ${fuck[0].last_time}`;
            }
            resultTag.append(div);
        });
        if (!input.value) {
            resultTag.textContent = null;
        }
    // 방향키 하이라이트&검색출력
    }else if(event.keyCode == 40){
        idx++;
        const li = [...autocomplete.children]
        li.forEach(v =>{
            v.classList.remove("active_li")
        })
        if(idx >= li.length){
            idx = 0;
        }
        li[idx].classList.add("active_li")
        input.value = li[idx].textContent.split(' ')[0];
    }else if(event.keyCode == 38){
        idx--;
        const li = [...autocomplete.children]
        li.forEach(v =>{
            v.classList.remove("active_li")
        })
        if(idx <= -1){
            idx = li.length-1;
        }
        li[idx].classList.add("active_li")
        input.value = li[idx].textContent.split(' ')[0]
    }
}



// forEach, map, filter, reduce, every, some == 자주 쓰이것들
// const add2 = (num1, num2) => num1 + num2




