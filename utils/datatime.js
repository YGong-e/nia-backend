/** 현재 날짜와 시간을 반환하는 함수*/
function datetime () {
// 현재 날짜와 시간 가져오기
const currentDate = new Date();

// 년, 월, 일, 시, 분, 초 추출
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const hour = String(currentDate.getHours()).padStart(2, '0');
const minute = String(currentDate.getMinutes()).padStart(2, '0');
const second = String(currentDate.getSeconds()).padStart(2, '0');

// 초를 소수점 첫째 자리까지 계산하여 추출
const secondsWithDecimal = (currentDate.getMilliseconds() / 1000).toFixed(1);

// 년월일시분초 출력 (소수점 첫째 자리는 포함하지 않음)
const formattedDateTime = `${year}${month}${day}${hour}${minute}${second}`;

// 소수점 첫째 자리를 출력하기 위해 소수점(.)과 뒤의 0을 제거
const formattedSeconds = secondsWithDecimal.replace('.', '');
const timeResult = formattedDateTime + formattedSeconds
console.log(timeResult);
 return timeResult;
}

module.exports = datetime;