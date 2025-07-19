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

export function Calendar24({ value, onChange, showTime = true }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState("10:30");

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setDate(d);
      if (showTime) {
        setTime(d.toTimeString().slice(0, 5)); // HH:MM
      }
    }
  }, [value, showTime]);

  useEffect(() => {
    if (!date) return;

    if (showTime) {
      const [h, m] = time.split(":");
      const localDate = new Date(date);
      localDate.setHours(h, m, 0, 0);
      const formatted = localDate.toLocaleString("sv-SE").replace(" ", "T"); // "YYYY-MM-DDTHH:mm:ss"
      onChange(formatted);
    } else {
      const formatted = date.toLocaleDateString("sv-SE"); // "YYYY-MM-DD"
      onChange(formatted);
    }
  }, [date, time, onChange, showTime]);

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
              defaultMonth={date}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      {showTime && (
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
      )}
    </div>
  );
}