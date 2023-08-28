import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import Client from '@/core/Client';

interface ICalendarItemProps {
  children: React.ReactNode
  disabled: boolean
}

interface ICalendarProps {
  clients: Client[]
}

export default function Calendar({ clients }: ICalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  function CalendarItem({ children, disabled }: ICalendarItemProps) {
    return (
      <p className={`${disabled ? 'text-gray-600' : 'text-tuna'} z-10 text-xs font-bold text-center`}>{children}</p>
    )
  }

  const renderCalendar = () => {
    const calendarDays = [];

    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();

    const lastDaysOfPrevMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      0
    ).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = lastDaysOfPrevMonth - i;
      calendarDays.push(
        <CalendarItem disabled={true} key={`prev-${day}`}>
          {day}
        </CalendarItem>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );

      const formattedDay = day.toString().padStart(2, '0')

      calendarDays.push(
        <CalendarItem key={day} disabled={false}>
          {formattedDay}
        </CalendarItem>
      );
    }

    return calendarDays;
  }

  return (
    <div className="bg-white w-full md:w-56 h-80 md:h-64 shadow-xl rounded-2xl p-8 md:p-4 mb-4">
      <header className="flex justify-between mb-4">
        <p className="text-tuna capitalize font-bold">{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</p>
        <div className="flex">
          <button type="button" onClick={() => handleDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
            <ChevronLeftIcon width="w-8" height="h-8" className="text-tuna hover:text-white hover:bg-tuna rounded-full p-1 cursor-pointer" />
          </button>
          <button type="button" onClick={() => handleDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
            <ChevronRightIcon width="w-8" height="h-8" className="text-tuna hover:text-white hover:bg-tuna rounded-full p-1 cursor-pointer" />
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 gap-4 md:gap-2 md:mb-2 mb-4">
        <p className="text-red-400 text-xs text-center font-bold">D</p>
        <p className="text-tuna text-xs text-center font-bold">S</p>
        <p className="text-tuna text-xs text-center font-bold">T</p>
        <p className="text-tuna text-xs text-center font-bold">Q</p>
        <p className="text-tuna text-xs text-center font-bold">Q</p>
        <p className="text-tuna text-xs text-center font-bold">S</p>
        <p className="text-red-400 text-xs text-center font-bold">S</p>
      </div>
      <div className="grid grid-cols-7 gap-4 md:gap-2">
        {renderCalendar()}
      </div>
    </div>
  )
}

