const staitionData = stationList.data
const timeData = timeList.data
let search = document.querySelector('.search') //search 태그를 가져와서 변수로 저장 
let button = search.querySelector('button') //button 태그를 가져와서 변수로 저장
let input = document.querySelector('input') //input태그를 가져와서 변수 선언
let form = search.getElementsByTagName('form')[0]
let autocomplete = document.querySelector('.autocomplete ul')
input.addEventListener('keyup', recommend) //input에 keyup 되었을때 recommend함수 실행
button.addEventListener('click', nameSearch) //button에 클릭할때 nameSearch를 실행




//자동완성
function recommend() {
    let value = search.querySelector('input').value //value에 input
    value = value.replace(" ", ""); //value 튀어쓰기를 공백으러 바꾸기
    if (value != "") { //input받은 값이 공백이 아니면 if문 실행
        let autoSearch = staitionData.filter((rc) => { //staitionData 배열의 값들을 순차적으로 함수에 인자로 전달하고 실행하는것
            // console.log(rc.station_nm.indexOf(value))
            if (rc.station_nm.indexOf(value) != -1) { return rc }//rc에 필터된 station_nm의 input에 친 값이 없으면 -1이 나오는데 -1아 아니면 if 실헹
        })
        let autoSearchResult = autoSearch.map((obj) => {
            return obj.station_nm
        });
        let autoSearchResultlin = autoSearch.map((obj) => {
            return obj.line_num
        });
        autocomplete.innerHTML = " "
        autoSearchResult.sort();
        for (let i = 0; i < autoSearchResult.length && i < 10; i++) {
            let autocompleteLi = document.createElement('li')
            autocompleteLi.innerHTML = autoSearchResult[i].replaceAll(value, `<span class="text-red">${value}</span>`) + (` ${autoSearchResultlin[i]}호선`)
            autocomplete.appendChild(autocompleteLi)
        }

    }

}
let focuss = true
window.addEventListener('keydown', autoResult)

form.addEventListener('onfocus', () => {
    focuss = true
})

form.addEventListener('onblur', () => {
    focuss = false
})

let liCount = -1
function autoResult(e) {
    if (focuss) {
        let key = e.keyCode

        if (key == 38) {  //상단
            if (liCount > 0) { liCount-- }
            highlight()
        }
        if (key == 40) {  //하단
            if (liCount < autocomplete.children.length - 1) { liCount++ }
            else { liCount = 0 }
            highlight()
        }
    }
}
function highlight() {
    // let autoHi = autocomplete.children[liCount]
    let auto = autocomplete.querySelector('li').
        console.log(auto)
    autocomplete.children[liCount].style.background = "rgba(0, 0, 0, 0.8)"
    if (liCount == autocomplete.children.length) { input.value = autocomplete.querySelector('li').st_nm }

}


//검색
function nameSearch() {
    let result = document.querySelector('.result') //result에 result클래스를 가져옴 
    result.innerHTML = "" //result의 값 초기화
    let value = search.querySelector('input').value //변수search의 input 태그의 값을 value를 넣어준다 
    staitionData.filter(({ station_nm }) => station_nm == value)
        .forEach(({ station_nm, line_num, station_cd }) => {
            let node = document.createElement('div')
            const st_nm = station_nm
            const li_num = line_num
            const st_cd = station_cd
            let str = `${st_nm}역</br> ${li_num}호선 </br>`
            timeData.filter(({ station_cd, line_num }) => station_cd == st_cd && line_num == li_num)
                .forEach(({ first_time, last_time, inout_tag, week_tag }) => {
                    if (week_tag == "1") {
                        if (inout_tag == "1") { str += "상행선</br>" }
                        else if (inout_tag == "2") { str += "하행선</br>" }
                        str += `첫차 ${first_time}  </br>막차 ${last_time}</br>`
                    }
                })

            result.appendChild(node)
            node.classList.add('res')
            node.innerHTML = str

        })

}
