const staitionData = stationList.data
let search = document.querySelector('.search') //search 태그를 가져와서 변수로 저장 
let button = search.querySelector('button') //button 태그를 가져와서 변수로 저장
let input = document.querySelector('input') //input태그를 가져와서 변수 선언
input.addEventListener('keyup', recommend) //input에 keyup 되었을때 recommend함수 실행
button.addEventListener('click', nameSearch) //button에 클릭할때 nameSearch를 실행

function recommend() {

    let value = search.querySelector('input').value //value에 input
    value = value.replace(" ", ""); //value 튀어쓰기를 공백으러 바꾸기
    if (value != "") { //input받은 값이 공백이 아니면 if문 실행
        let rrr = staitionData.filter((rc) => { //staitionData 배열의 값들을 순차적으로 함수에 인자로 전달하고 실행하는것
            // console.log(rc.station_nm.indexOf(value))
            if (rc.station_nm.indexOf(value) != -1) { //rc에 필터된 station_nm의 input에 친 값이 없으면 -1이 나오는데 -1아 아니면 if 실헹
                let result = rc.station_nm //
                return result
            }
        })
        console.log(rrr)
    }

}

function nameSearch() {
    let value = search.querySelector('input').value //변수search의 input 태그의 값을 value를 넣어준다

    let searched = staitionData.filter((it) => { //filter = staitionData 배열의 값들을 순차적으로 함수에 인자로 전달하고 실행시키는것 
        if (it.station_nm == value) { //it로 넘겨진 깂이 value(input)에 들어온 값과 같냐는 반복문
            return it //같으면 리턴
        }
    })
    let result = document.querySelector('.result') //result에 result클래스를 가져옴
    while (result.firstChild) result.removeChild(result.firstChild) //result의 자식이 없어질때 까지 지운다 firstChild가 지워지면 두번재 자식이 firstChlid가 되서 계속 지워짐
    for (let i = 0; i < searched.length; i++) { // 
        let node = document.createElement('div') //node생성 
        node.classList.add('res') //node생성된 div에 res를 넣어준다 
        let st_nmNode = document.createElement('h1') //node 생성
        let st_nm = document.createTextNode(searched[i].station_nm + '역') //if문 돌아간거에 i번째 배열의 station_nm + 문자열이니까 +'역'을 textnode에 넣어준다
        let line_numNode = document.createElement('h1') //node 생성
        let line_num = document.createTextNode(searched[i].line_num + '호선') ///if문 돌아간거에 i번째 배열의 line_num + 문자열이니까 +'역'을 textnode에 넣어준다
        line_numNode.appendChild(line_num) //line_numNode에 line_num을 자식요소로 넣어준다
        st_nmNode.appendChild(st_nm) //st_nmNnode에 st_nm을 자식요소로 넣어준다
        node.appendChild(st_nmNode)
        node.appendChild(line_numNode)
        result.appendChild(node) //div에 res가 넣어진 node를 .result자식 요소로 넣어준다

    }
}



//value 값이 지하철 리스트 이름과 같은지 돌려봐야지 맞죠?