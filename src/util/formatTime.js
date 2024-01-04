import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

function fDateMonth(date) {
    return format(new Date(date), 'MMMM yyyy');
}

function fDate(date) {
    // MM = month number
    // MMM = 3 char month
    // MMMM = full month name
    //
    return format(new Date(date), 'dd MMMM yyyy');
}

function fDateTime(date) {
    return format(new Date(date), 'dd MMM yyyy HH:mm');
}

function fTimestamp(date) {
    return getTime(new Date(date));
}

function fDateTimeSuffix(date) {
    return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

function fToNow(date) {
    return formatDistanceToNow(new Date(date), {
        addSuffix: true,
    });
}

export const formatTime = {
    fDate,
    fDateTime,
    fTimestamp,
    fDateTimeSuffix,
    fDateMonth,
    fToNow,
};
