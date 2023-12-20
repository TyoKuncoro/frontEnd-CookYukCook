"use client"

import React, { useState } from 'react';
import { DatePicker } from 'antd';

const { WeekPicker } = DatePicker;

const WeekPickerComponent: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<any>(null);

  const handleWeekChange = (date: any) => {
    setSelectedWeek(date);
  };

  return (
    <WeekPicker onChange={handleWeekChange} placeholder="Select Week" />
  );
};

export default WeekPickerComponent;