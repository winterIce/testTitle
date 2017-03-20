function getDateNumByMonthYear(year, month) {
	if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
		return 31;
	}
	else if(month == 4 || month == 6 || month == 9 || month == 11){
        return 30;
	}
	else if(month == 2) {
	    if((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            return 29;
        }
        else {
        	return 28;
        }
	}
}
function addZero(n) {
    if(n < 10) {
        return '0' + n;
    }
    return n;
}
export {
	getDateNumByMonthYear,
	addZero,
}