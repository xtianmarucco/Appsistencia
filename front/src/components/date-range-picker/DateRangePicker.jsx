import { useState } from "react";
import DatePicker from "react-datepicker";

export default function DateRangePicker({ onDateChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
     onDateChange({ startDate: start, endDate: end });
    }
  };

  return (
    <div className=" flex-col items-center space-x-2">
      <div className="flex-col"> 
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        className="border px-3 py-2"
      /></div>
     
    </div>
  );
}
