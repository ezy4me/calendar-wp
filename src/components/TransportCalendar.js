import React from "react";
import BookingCell from "./BookingCell";
import { generateDateRange, getMinMaxDates, calculateColSpan } from "../utils/dateUtils";

const TransportCalendar = ({ bookings }) => {
    const { minDate, maxDate } = getMinMaxDates(bookings);
    const dates = generateDateRange(minDate, maxDate);

    const groupedBookings = bookings.reduce((acc, booking) => {
        if (!acc[booking.transportName]) {
            acc[booking.transportName] = [];
        }
        acc[booking.transportName].push(booking);
        return acc;
    }, {});

    const createBookingMatrix = () => {
        const matrix = [];
        Object.keys(groupedBookings).forEach(transportName => {
            const row = [];
            const relevantBookings = groupedBookings[transportName];
            let colIndex = 0; // текущий индекс колонки

            relevantBookings.forEach((booking, index) => {
                const startDate = booking.start.split('T')[0];
                const endDate = booking.end.split('T')[0];
                const colSpan = calculateColSpan(startDate, endDate, dates);
                const startCol = dates.indexOf(startDate);

                // Проверяем и добавляем пустые ячейки, если необходимо
                while (colIndex < startCol) {
                    row[colIndex] = <td key={`empty-${transportName}-${colIndex}`} />;
                    colIndex++;
                }

                // Проверяем, совпадает ли дата конца аренды с началом новой
                const previousBooking = relevantBookings[index - 1];
                const isContinuous = previousBooking && previousBooking.end.split('T')[0] === startDate;

                row[startCol] = (
                    <BookingCell
                        key={`cell-${transportName}-${startCol}`}
                        booking={booking}
                        colSpan={colSpan}
                        index={index}
                        isContinuous={isContinuous} // Передаем флаг "непрерывности"
                    />
                );

                colIndex = startCol + colSpan;
            });

            // Добавляем пустые ячейки до конца строки
            while (colIndex < dates.length) {
                row[colIndex] = <td key={`empty-${transportName}-${colIndex}`} className='cell' />;
                colIndex++;
            }

            matrix.push({ transportName, cells: row });
        });
        return matrix;
    };

    const bookingMatrix = createBookingMatrix();

    return (
        <table className="transport-calendar">
            <thead>
                <tr>
                    <th>Транспорт</th>
                    {dates.map((date, index) => (
                        <th key={index}>{new Date(date).toLocaleDateString('ru-RU').substring(0, 5)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {bookingMatrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>{row.transportName}</td>
                        {row.cells}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransportCalendar;
