const dateForm = document.querySelector('.date')
const inputDate = document.getElementById('add_date')
const timer = document.querySelector('.timer')

window.addEventListener('load', () => {
    const lastTime = getLocaleStorage();
    //   inputDate.value = lastTime;
      // eslint-disable-next-line no-use-before-define
    //   getTimeRemaining(lastTime)
      setClock('.timer',lastTime);
      
  });

function getLocaleStorage(){
    return localStorage.getItem('time');
}
function setLocaleStorage(time){
    localStorage.setItem('time', time);
}

dateForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(inputDate.value == null || inputDate.value == ''){
        alert('Enter date')
    }else{
        let deadLine = inputDate.value;
        getTimeRemaining(deadLine);
        setClock('.timer',deadLine);
        setLocaleStorage(deadLine)
        inputDate.value = '';
    }
    
})
function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor( (t/(1000*60*60*24)) ),
        seconds = Math.floor( (t/1000) % 60 ),
        minutes = Math.floor( (t/1000/60) % 60 ),
        hours = Math.floor( (t/(1000*60*60) % 24) );
        
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
    
}
function getZero(num){
    if (num >= 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
}
let timeInterval;
function setClock(selector,endtime){
    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds")
        updateClock();

        function updateClock() {
            clearTimeout(timeInterval)
            timeInterval = setTimeout(updateClock,1000);
            const t = getTimeRemaining(endtime);
            days.innerHTML =` ${getZero(t.days)} д`;
            hours.innerHTML = `${getZero(t.hours)} ч`;
            minutes.innerHTML = `${getZero(t.minutes)} мин`;
            seconds.innerHTML = `${getZero(t.seconds)} сек`;
            t.total--;
            if (t.total <= 0) {
                clearTimeout(timeInterval);
            }
            
        }
}