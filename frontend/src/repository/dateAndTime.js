export const dateAndTime = {
    getHtmlDate(value) {
        if (!value) {
            return undefined;
        }

        const myDate = new Date(value);

        return `${myDate.getFullYear()}-${String(myDate.getMonth() + 1).padStart(2, '0')}-${myDate.getDate()}`
    },

    getHtmlTime(value) {
        if (!value) {
            return '';
        }

        const myTime = new Date(value);
        const hours = String(myTime.getHours()).padStart(2, '0');
        const minutes = String(myTime.getMinutes()).padStart(2, '0');

        if (hours === '00' && minutes === '00') {
            return ''
        }
        
        return `${hours}:${minutes}`;
    },

    getDateFromHtml(htmlDate, htmlTime) {
        if (!htmlDate) {
            return '';
        }

        if (!htmlTime) {
            return new Date(htmlDate);
        }

        return new Date(htmlDate + ' ' + htmlTime);
    },
}
