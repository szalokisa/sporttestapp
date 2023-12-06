export function isNull(text, valueWhenNull = '', expireDate) {
    return (text === null || text === undefined) ? valueWhenNull : text;
}

export function replaceAll(str, toFind, ReplaceWith) {
    return str.split(toFind).join(ReplaceWith);
}

export function dateAddDays(myDate, days) {
    if (!myDate) {
        return myDate;
    }

    const result = new Date(myDate);
    result.setDate(result.getDate() + days);

    return result;
}