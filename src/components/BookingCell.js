import React from "react";

// Функция для конвертации HEX в RGB
const hexToRgb = (hex) => {
    // Удаляем знак "#" если он присутствует
    hex = hex.replace(/^#/, '');

    // Расширяем сокращенные HEX коды, например #03F в #0033FF
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
};

// Функция для определения цвета фона ячейки с увеличением синего компонента
const getBookingStyle = (booking, index) => {
    const initialColor = hexToRgb(booking.backgroundColor); // Конвертируем HEX в RGB
    const colorDecrement = 20; // Уменьшение значений красного и зеленого

    // Уменьшаем красный и зеленый компоненты, чтобы сделать цвет более синим
    const rValue = Math.max(0, initialColor.r - index * colorDecrement);
    const gValue = Math.max(0, initialColor.g - index * colorDecrement);
    const bValue = initialColor.b; // Синий компонент остается неизменным

    return {
        background: `rgb(${rValue}, ${gValue}, ${bValue})`,
        color: booking.textColor,
    };
};

const BookingCell = ({ booking, colSpan, index, isStart, isEnd, isContinuous }) => {
    const style = booking ? getBookingStyle(booking, index) : {};

    const rentRange = booking
        ? `${new Date(booking.start).toLocaleDateString('ru-RU')} - ${new Date(booking.end).toLocaleDateString('ru-RU')}`
        : "";

    return (
        <td
            className="booking-cell"
            style={style}
            colSpan={colSpan}
        >
            {/* Наложение для начала и конца бронирования */}
            {isContinuous && <div className="is-continuous" style={{ backgroundColor: getBookingStyle(booking, index).background }} />}

            {/* Основное содержимое ячейки */}
            <div className="content">
                {rentRange}
            </div>
        </td>
    );
};

export default BookingCell;
