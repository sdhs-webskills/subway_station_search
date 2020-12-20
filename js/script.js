const staitionData = stationList.data
const timedata = timeList.data
let search = document.querySelector('.search') //search 태그를 가져와서 변수로 저장 
let button = search.querySelector('button') //button 태그를 가져와서 변수로 저장
let input = document.querySelector('input') //input태그를 가져와서 변수 선언
input.addEventListener('keyup', recommend) //input에 keyup 되었을때 recommend함수 실행
button.addEventListener('click', nameSearch) //button에 클릭할때 nameSearch를 실행


//자동완성
function recommend() {

    let value = search.querySelector('input').value //value에 input
    value = value.replace(" ", ""); //value 튀어쓰기를 공백으러 바꾸기
    if (value != "") { //input받은 값이 공백이 아니면 if문 실행
        let autoSearch = staitionData.filter((rc) => { //staitionData 배열의 값들을 순차적으로 함수에 인자로 전달하고 실행하는것
            // console.log(rc.station_nm.indexOf(value))
            if (rc.station_nm.indexOf(value) != -1) { //rc에 필터된 station_nm의 input에 친 값이 없으면 -1이 나오는데 -1아 아니면 if 실헹
                return rc
            }
        })
        let autoSearchResult = autoSearch.map((obj) => {
            return obj.station_nm
        });

        let autocomplete = document.querySelector('.autocomplete ul')

        autocomplete.innerHTML = ""
        autoSearchResult.sort();


        for (let i = 0; i < autoSearchResult.length && i < 10; i++) {
            let autocompleteLi = document.createElement('li')
            autocompleteLi.innerHTML = autoSearchResult[i].replaceAll(value, `<span class="text-red">${value}</span>`)
            autocomplete.appendChild(autocompleteLi)
        }
    }
}




//검색
function nameSearch() {
    let result = document.querySelector('.result') //result에 result클래스를 가져옴 
    result.innerHTML = "" //result의 값 초기화
    let value = search.querySelector('input').value //변수search의 input 태그의 값을 value를 넣어준다 
    staitionData.filter(({
        station_nm
    }) => station_nm == value).forEach(({
        station_nm,
        line_num
    }) => {
        const st_nm = station_nm
        const li_num = line_num
        let node = document.createElement('div')
        result.appendChild(node)
        node.classList.add('res')
        node.innerHTML = `<div> ${st_nm}역</br> ${li_num}호선</div>`
    });
}