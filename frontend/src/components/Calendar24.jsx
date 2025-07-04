"use client";
import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Calendar24({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState("10:30");

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setDate(d);
      setTime(d.toTimeString().slice(0, 5)); // HH:MM:SS
    }
  }, [value]);

  useEffect(() => {
    if (date && time) {
      // Combine date + time into a local datetime string like 2025-07-01T10:30:00
      const [h, m] = time.split(":");
      const localDate = new Date(date);
      localDate.setHours(h, m, 0, 0);

      // Format without timezone — like 2025-07-01T10:30:00
      const formatted = localDate.toLocaleString("sv-SE").replace(" ", "T");
      onChange(formatted); // Pass to parent
    }
  }, [date, time, onChange]);

  return (
    <div className="flex flex-row ml-2 justify-between gap-8">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">Date</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-40 justify-between font-normal hover:cursor-pointer text-neutral-800 dark:bg-neutral-200 dark:hover:bg-neutral-200 dark:hover:text-neutral-800"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">Time</Label>
        <Input
          type="time"
          id="time-picker"
          step="60"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-background w-40 cursor-pointer text-neutral-800 dark:bg-neutral-200"
        />
      </div>
    </div>
  );
}
