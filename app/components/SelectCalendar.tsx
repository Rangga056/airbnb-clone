"use client";

import { Calendar } from "@/components/ui/calendar";
import { addDays, eachDayOfInterval } from "date-fns";
import React, { useState } from "react";

import { DateRange } from "react-day-picker";

const today = new Date();

const SelectCalendar = ({
  reservation,
}: {
  reservation:
    | {
        startDate: Date;
        endDate: Date;
      }[]
    | undefined;
}) => {
  const defaultRange: DateRange = {
    from: today,
    to: addDays(today, 3),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultRange);

  let disabledDates: Date[] = [];
  reservation?.forEach((reservationItem) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate),
    });

    disabledDates = [...disabledDates, ...dateRange];
  });

  let footer = <p>Please pick the first day.</p>;
  return (
    <div className="h-fit flex items-center justify-center text-center text-sm">
      <input
        type="hidden"
        name="startDate"
        value={range?.from?.toISOString() as string}
      />
      <input
        type="hidden"
        name="endDate"
        value={range?.to?.toISOString() as string}
      />
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        footer={footer}
        className="rounded-md border"
        fromDate={today}
        disabled={disabledDates}
      />
    </div>
  );
};

export default SelectCalendar;
