// utils/dateUtils.js

export const generateDateRange = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        dates.push(`${year}-${month}-${day}`);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};

export const getMinMaxDates = (bookings) => {
    const allDates = bookings.flatMap(booking => [
        new Date(booking.start),
        new Date(booking.end)
    ]);
    const minDate = new Date(Math.min(...allDates));
    const maxDate = new Date(Math.max(...allDates));
    return { minDate, maxDate };
};

export const calculateColSpan = (startDate, endDate, dates) => {
    const startIndex = dates.indexOf(startDate);
    const endIndex = dates.indexOf(endDate);
    return endIndex - startIndex + 1;
};

export const isDateInRange = (date, start, end) => {
    const checkDate = new Date(date);
    return checkDate >= new Date(start) && checkDate <= new Date(end);
};

