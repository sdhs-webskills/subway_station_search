let search = document.querySelector('.search') //버튼 태그를 가져와서 변수로 저장
let button = search.querySelector('button')
button.addEventListener('click', nameSearch)

function nameSearch() {
    let value = search.querySelector('input').value
    console.log(value)
}