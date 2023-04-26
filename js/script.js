// write...

const $input = document.getElementsByName("search_key")[0];
const $autocomplete = document.querySelector('.autocomplete ul');
const $btn = document.querySelector('button');
const $result = document.querySelector('.result');
let stationData = [];
let timeData = [];
let index = 0;

stationList.data.forEach(element => {
    stationData.push(element);
});
timeList.data.forEach(element => {
    timeData.push(element);
});

stationData.sort((a,b) => {
    if(a.station_nm > b.station_nm) return 1;
    if(a.station_nm < b.station_nm) return -1;
    return 0;
});

$input.addEventListener('input', () => {
    $autocomplete.textContent = "";

    const autocomplete = stationData.filter(element => element.station_nm.includes($input.value));
    
    autocomplete.forEach(element => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const station = element.station_nm;
        const replacespan = station.replace($input.value,`<span class="active">${$input.value}</span>`)
        let lineNum;

        if(element.line_num == "k" || element.line_num == "a") {
            lineNum = "공항철도";
        } else if(element.line_num == "b") {
            lineNum = "분당선";
        } else if(element.line_num == "g") {
            lineNum = "경춘선";
        } else if(element.line_num == "s") {
            lineNum = "신분당선";
        } else if(element.line_num == "su") {
            lineNum = "수인선";
        } else if(element.line_num == "i") {
            lineNum = "인천 1호선";
        } else if(element.line_num == "e") {
            lineNum = "용인경전철";
        } else if(element.line_num == "u") {
            lineNum = "의정부경전철";
        } else {
            lineNum = `${element.line_num}호선`;
        }

        span.innerHTML = `${replacespan} ${lineNum}`;
        li.append(span);
        $autocomplete.append(li);
    });
    if(!$input.value) {
        $autocomplete.textContent = "";
    }

    index = 0;
});

$btn.addEventListener('click', () => {
    $result.textContent = "";
    
    const q = stationData.filter(element => element.station_nm.includes($input.value));

    q.forEach(element => {
        const qq = timeData.filter(element2 => element2.station_cd.includes(element.station_cd));
        const $div = document.createElement('div');
        let lineNum;

        if(element.line_num == "k" || element.line_num == "a") {
            lineNum = "공항철도";
        } else if(element.line_num == "b") {
            lineNum = "분당선";
        } else if(element.line_num == "g") {
            lineNum = "경춘선";
        } else if(element.line_num == "s") {
            lineNum = "신분당선";
        } else if(element.line_num == "su") {
            lineNum = "수인선";
        } else if(element.line_num == "i") {
            lineNum = "인천 1호선";
        } else if(element.line_num == "e") {
            lineNum = "용인경전철";
        } else if(element.line_num == "u") {
            lineNum = "의정부경전철";
        } else {
            lineNum = `${element.line_num}호선`;
        }
        
        if(!qq[0]) {
            $div.innerHTML = `
                ${element.station_nm}역
                ${lineNum}
            `;
        }else{
            $div.innerHTML = `
                ${element.station_nm}역
                ${lineNum}
                첫차: ${qq[0].first_time}
                막차: ${qq[0].last_time}
            `;
        }
        $result.append($div);
    });
});

window.addEventListener('keydown', (e) => {
    if(e.keyCode === 40 && $autocomplete.children.length > 0) {
        if(index < $autocomplete.childNodes.length) {
            $autocomplete.childNodes[index].classList.add('select');
            if($autocomplete.childNodes[index].classList.contains('select')) {
                let inputAuto = $autocomplete.childNodes[index].querySelector('span').textContent.split(" ");
                $input.value = inputAuto[0];
            }
            if(index >= 1) {
                $autocomplete.childNodes[index].previousSibling.classList.remove('select');
            }
            index++;
        }else {
            $autocomplete.lastChild.classList.remove('select');
            $autocomplete.firstChild.classList.add('select');
            let inputAuto = $autocomplete.firstChild.querySelector('span').textContent.split(" ");
            $input.value = inputAuto[0];
            index = 1;
        }
    }
});
