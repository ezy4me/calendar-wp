import "./frontend.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import TransportCalendar from "./components/TransportCalendar";
// Данные бронирований
const data = [
  {
    id: "68682_rent_76560",
    title: "Бронирование ID: 76560",
    start: "2023-12-26T20:44:56",
    end: "2024-01-02T20:44:56",
    url: "https://dev2.getmecar.ru/reserv/?reservation_id=76560",
    editable: false,
    backgroundColor: "#E8F3FE",
    borderColor: "#E8F3FE",
    textColor: "#429CF3",
    status: "rent",
    transportName: "Lada Granta"
  },
  {
    id: "68682_rent_76561",
    title: "Бронирование ID: 76561",
    start: "2024-01-05T20:44:56",
    end: "2024-01-08T20:44:56",
    url: "https://dev2.getmecar.ru/reserv/?reservation_id=76561",
    editable: false,
    backgroundColor: "#E8F3FE",
    borderColor: "#E8F3FE",
    textColor: "#429CF3",
    status: "rent",
    transportName: "Lada Granta"
  },
  {
    id: "68682_rent_76561",
    title: "Бронирование ID: 76561",
    start: "2024-01-08T20:44:56",
    end: "2024-01-15T20:44:56",
    url: "https://dev2.getmecar.ru/reserv/?reservation_id=76561",
    editable: false,
    backgroundColor: "#E8F3FE",
    borderColor: "#E8F3FE",
    textColor: "#429CF3",
    status: "rent",
    transportName: "Lada Granta"
  },
  {
    id: "12345_repair_98765",
    title: "На ремонте ID: 98765",
    start: "2023-12-28T08:00:00",
    end: "2023-12-30T18:00:00",
    url: "https://dev2.getmecar.ru/reserv/?reservation_id=98765",
    editable: true,
    backgroundColor: "#FDE8E8",
    borderColor: "#FDE8E8",
    textColor: "#F34242",
    status: "repair",
    transportName: "Toyota Corolla"
  },
  {
    id: "67890_reserved_54321",
    title: "Забронировано ID: 54321",
    start: "2023-12-31T09:00:00",
    end: "2024-01-03T09:00:00",
    url: "https://dev2.getmecar.ru/reserv/?reservation_id=54321",
    editable: true,
    backgroundColor: "#E8FDFE",
    borderColor: "#E8FDFE",
    textColor: "#42F3CF",
    status: "reserved",
    transportName: "BMW X5"
  }
];

const Example = () => {
  return <TransportCalendar bookings={data} />;
};

// Подключение React к DOM
const divsToUpdate = document.querySelectorAll(".boilerplate-update-me");

divsToUpdate.forEach(div => {
  div.classList.add("react-calendar"); 

  const root = ReactDOM.createRoot(div);
  root.render(<Example />);

  div.classList.remove("boilerplate-update-me");
});

export default Example;
