import { listOfZones } from './listOfZones';

export const dateAndTime = {
    getHtmlDate(value) {
        if (typeof (value) !== 'string') {
            return
        }
        return (!value) ? undefined : value.substring(0, 10);
    },

    getHtmlTime(value) {
        if (!value) {
            return '';
        }

        const myTime = value.substring(11, 16);

        return (myTime === '00:00') ? '' : myTime;
    },

    getHtmlZone(value) {
        if (!value) {
            return 0;
        }

        return value.substring(19);
    },

    getDateFromHtml(htmlDate, htmlTime, htmlZone) {
        if (!htmlDate) {
            return '';
        }

        return `${htmlDate}T${htmlTime || '00:00'}:00${htmlZone}`;
    },

    getDateTimeInternalFormatFromElements(elements) {
        const yearStr = elements.year.toString();
        const monthStr = elements.month.toString().padStart(2, '0');
        const dayStr = elements.day.toString().padStart(2, '0');
        const hourStr = elements.hour.toString().padStart(2, '0');
        const minuteStr = elements.minute.toString().padStart(2, '0');
        const secondStr = elements.second.toString().padStart(2, '0');
        const offsetTimeStr = elements.offsetTime;

        return `${yearStr}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}:${secondStr}${offsetTimeStr}`
    },

    getDateDbFormat(dateInternalFormat) {
        return (dateInternalFormat) ? `${dateInternalFormat}T00:00:00.000+00:00` : undefined;
    },

    getDateInternalFormat(dateDbFormat) {
        return (dateDbFormat) ? dateDbFormat.substring(0, 10) : '';
    },

    getDateTimeInternalFormat(dateTimeDbFormat, zone) {
        if (!dateTimeDbFormat) {
            return '';
        }

        const zoneDef = listOfZones.find(cZone => {
            return (cZone.offsetTime === zone)
        })

        if (!zoneDef) {
            return dateTimeDbFormat.substring(0, 19) + '+00:00';
        }

        const vDate = (new Date(dateTimeDbFormat))
        vDate.setMinutes(vDate.getMinutes() - zoneDef.offset);
        return this.getDateTimeInternalFormatFromElements({
            year: vDate.getUTCFullYear(),
            month: vDate.getUTCMonth() + 1,
            day: vDate.getUTCDate(),
            hour: vDate.getUTCHours(),
            minute: vDate.getUTCMinutes(),
            second: vDate.getUTCSeconds(),
            offsetTime: zone,
        })
    },

    getDateTimeString(fp, document, nameOfDateTimeField) {
        const result = {
            date: '',
            time: '',
            zone: '',
            full: '',
        }
        result.date = fp.getField(nameOfDateTimeField)?.reference?.current?.value || '';
        if (!result.date) {
            return result;
        }

        const timeField = document.getElementById(`${nameOfDateTimeField}-time`);
        result.time = timeField?.value || '';
        if (!result.time) {
            result.full = result.date;
            return result;
        }

        const zoneField = document.getElementById(`${nameOfDateTimeField}-zone`);
        if (zoneField) {
            result.zone = zoneField?.options[zoneField.selectedIndex]?.text || '';
        }

        result.full = `${result.date} ${result.time} ${result.zone}`;
        return result;
    },

    getDateTimeStringFromTo(fp, document, params) {
        const dateFrom = this.getDateTimeString(fp, document, params.fieldATA).full || this.getDateTimeString(fp, document, params.fieldETA).full;
        const dateTo = this.getDateTimeString(fp, document, params.fieldATD).full || this.getDateTimeString(fp, document, params.fieldETD).full;

        return (dateFrom && dateTo) ? `${dateFrom} - ${dateTo}` : dateFrom || dateTo;
    },
}
