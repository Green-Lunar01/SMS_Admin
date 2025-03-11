import React, { useState, useEffect } from 'react';

interface DatePickerProps {
  value: string;
  onChange: (value: string, name?: string) => void;
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  name,
  label = 'Date',
  placeholder = 'MM/DD/YYYY',
  className = ''
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // Get current date for default calendar view
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  // Set the calendar to show the current value's month/year when it changes
  useEffect(() => {
    if (value) {
      const dateValue = new Date(value);
      if (!isNaN(dateValue.getTime())) {
        setCurrentMonth(dateValue.getMonth());
        setCurrentYear(dateValue.getFullYear());
      }
    }
  }, [value]);

  // Toggle calendar visibility
  const toggleCalendar = (): void => {
    setShowCalendar(!showCalendar);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (showCalendar && !target.closest('.date-picker-container')) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  // Format date as MM/DD/YYYY
  const formatDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Parse date string into Date object
  const parseDate = (dateStr: string): Date | null => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime()) ? date : null;
  };

  // Handle date selection
  const handleDateSelect = (day: number): void => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    const formattedDate = formatDate(selectedDate);
    onChange(formattedDate, name);
    setShowCalendar(false);
  };

  // Navigate to previous month
  const prevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const nextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value, name);
  };

  // Generate calendar days
  const generateCalendar = (): JSX.Element => {
    const monthNames: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    const daysInMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth: number = new Date(currentYear, currentMonth, 1).getDay();

    const days: JSX.Element[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Parse current value to check for selected date
    const selectedDate = parseDate(value);

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Check if this day matches the selected date
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;

      days.push(
        <div
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer 
            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-lg p-4 absolute mt-1 w-64 z-10">
        <div className="flex justify-between items-center mb-2">
          <button onClick={prevMonth} className="p-1" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="font-medium">
            {monthNames[currentMonth]} {currentYear}
          </div>
          <button onClick={nextMonth} className="p-1" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div
              key={day}
              className="h-8 w-8 flex items-center justify-center text-gray-500 text-sm"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  return (
    <div className={`relative date-picker-container ${className}`}>
      {label && <label className="block text-gray-500 text-sm mb-2">{label}</label>}
      <div className="relative">
        <input
          type="text"
          value={value || ''}
          onChange={handleInputChange}
          onClick={toggleCalendar}
          placeholder={placeholder}
          name={name}
          className="rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={toggleCalendar}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 2V4M6 2V4"
              stroke="#08190E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 17L9.99999 13.3472C9.99999 13.1555 9.86325 13 9.69458 13H9M13.6297 17L14.9842 13.3492C15.0475 13.1785 14.9128 13 14.7207 13H13"
              stroke="#08190E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z"
              stroke="#08190E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 8H18"
              stroke="#08190E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {showCalendar && generateCalendar()}
    </div>
  );
};

export default DatePicker;
