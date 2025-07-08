"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { parseAsJson, useQueryState } from "nuqs";
import { z } from "zod";
import { displayDate } from "~/lib/date";

const schema = z
  .object({
    from: z.date(),
    to: z.date().optional(),
  })
  .optional();

const useDateRange = () => {
  return useQueryState("dateRange", parseAsJson(schema.parse));
};

export function DatePicker() {
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = useDateRange();

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {!!range
              ? `${displayDate(range.from)} - ${!!range.to ? displayDate(range.to) : "present"}`
              : "Select Date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={range ?? { from: new Date(1970, 1, 1) }}
            captionLayout="dropdown"
            numberOfMonths={2}
            onSelect={async (date) => {
              if (!date) return;

              await setRange({
                from: date.from ?? new Date(1970, 1, 1),
                to: date.to,
              });
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
