"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { parseAsJson, useQueryState } from "nuqs";
import { z } from "zod";
import { displayDate } from "~/lib/date";
import { api } from "~/trpc/react";

const schema = z
  .object({
    from: z.date(),
    to: z.date().optional(),
  })
  .optional();

export const useDateRange = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return useQueryState("dateRange", parseAsJson(schema.parse));
};

export function DatePicker() {
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = useDateRange();

  const { data: defautDate, isLoading } =
    api.posts.getFirstPublishedPost.useQuery(undefined, {
      initialData: new Date(),
    });

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={isLoading}
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {!!range
              ? `${displayDate(range.from, true)} - ${!!range.to ? displayDate(range.to, true) : "present"}`
              : "Select Date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={range ?? { from: defautDate }}
            disabled={(d) => {
              return d < defautDate;
            }}
            captionLayout="dropdown"
            numberOfMonths={2}
            onSelect={async (date) => {
              if (!date) return;

              await setRange({
                from: date.from ?? defautDate,
                to: date.to,
              });
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
