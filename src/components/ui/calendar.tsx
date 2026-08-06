"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, UI, DayFlag, SelectionState } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        [UI.Root]: "relative",
        [UI.Months]: "flex flex-col sm:flex-row gap-4",
        [UI.Month]: "space-y-4",
        [UI.MonthCaption]: "flex justify-center pt-1 relative items-center",
        [UI.CaptionLabel]: "text-sm font-medium text-charcoal",
        [UI.Nav]: "flex items-center gap-1",
        [UI.PreviousMonthButton]: cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-1 size-8 bg-transparent p-0 opacity-70 hover:opacity-100"
        ),
        [UI.NextMonthButton]: cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-1 size-8 bg-transparent p-0 opacity-70 hover:opacity-100"
        ),
        [UI.MonthGrid]: "w-full border-collapse",
        [UI.Weekdays]: "flex",
        [UI.Weekday]:
          "text-slate rounded-md w-9 font-normal text-[0.8rem]",
        [UI.Week]: "flex w-full mt-2",
        [UI.Day]: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        [UI.DayButton]: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 p-0 font-normal text-charcoal/80 aria-selected:opacity-100 hover:text-charcoal"
        ),
        [SelectionState.selected]:
          "bg-pink-light text-pink-primary hover:bg-pink-medium/40 hover:text-pink-primary focus:bg-pink-light focus:text-pink-primary",
        [SelectionState.range_start]: "rounded-l-md",
        [SelectionState.range_end]: "rounded-r-md",
        [SelectionState.range_middle]:
          "rounded-none bg-pink-soft text-pink-primary",
        [DayFlag.today]: "bg-pink-light text-charcoal font-medium",
        [DayFlag.outside]:
          "text-slate/40 aria-selected:bg-blush/50 aria-selected:text-slate",
        [DayFlag.disabled]: "text-slate/30 opacity-50",
        [DayFlag.hidden]: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="size-4" />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
