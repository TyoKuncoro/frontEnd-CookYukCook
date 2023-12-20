"use client"

import React, { useState } from 'react';
import { DatePicker } from 'antd';

const { MonthPicker } = DatePicker;

const MonthPickerComponent: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<any>(null);

  const handleMonthChange = (date: any) => {
    setSelectedMonth(date);
  };

  return (
    <MonthPicker onChange={handleMonthChange} placeholder="Select Month" />
  );
};

export default MonthPickerComponent;