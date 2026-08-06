"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, Lock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Route = {
  id: string;
  name: string;
  cadence: string;
  slotsLeft: number;
  status: "available" | "limited" | "full";
};

type TimeWindow = {
  id: string;
  label: string;
  hours: string;
  availability: "available" | "limited";
};

const routes: Route[] = [
  {
    id: "north-redondo",
    name: "North Redondo",
    cadence: "Every 2 Weeks · Tuesdays",
    slotsLeft: 2,
    status: "limited",
  },
  {
    id: "hermosa-manhattan",
    name: "Hermosa / Manhattan",
    cadence: "Every 2 Weeks · Wednesdays",
    slotsLeft: 1,
    status: "limited",
  },
  {
    id: "palos-verdes",
    name: "Palos Verdes",
    cadence: "Every 2 Weeks · Thursdays",
    slotsLeft: 0,
    status: "full",
  },
];

const timeWindows: TimeWindow[] = [
  {
    id: "morning",
    label: "Morning Window",
    hours: "8:00 AM - 12:00 PM",
    availability: "limited",
  },
  {
    id: "afternoon",
    label: "Afternoon Window",
    hours: "1:00 PM - 5:00 PM",
    availability: "available",
  },
];

export function RouteCalendar() {
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0].id);
  const [selectedWindowId, setSelectedWindowId] = useState(timeWindows[0].id);

  const selectedRoute = routes.find((r) => r.id === selectedRouteId)!;
  const selectedWindow = timeWindows.find((w) => w.id === selectedWindowId)!;
  const routeIsFull = selectedRoute.status === "full";

  return (
    <section id="route-schedule" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            <CalendarDays className="mr-1.5 size-3.5" />
            Route Availability
          </Badge>
          <h2 className="font-serif text-3xl tracking-tight text-charcoal sm:text-4xl">
            Reserve Your Bi-Weekly Slot
          </h2>
          <p className="mt-4 text-slate">
            Pick your neighborhood day and time. We&apos;ll handle the rest.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <Card className="border-border bg-white">
            <CardContent className="space-y-8 p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate/75">
                  simple 2-step reservation
                </p>
                <Badge variant="warning">
                  Only 3 recurring route slots remaining
                </Badge>
              </div>

              <div className="space-y-3">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <MapPin className="size-5 text-pink-primary" />
                  1. Select Your Neighborhood
                </CardTitle>
                <div className="grid gap-3 sm:grid-cols-3">
                  {routes.map((route) => (
                    <button
                      key={route.id}
                      type="button"
                      onClick={() => {
                        if (route.status !== "full") setSelectedRouteId(route.id);
                      }}
                      className={cn(
                        "rounded-xl border px-4 py-4 text-left transition-colors",
                        route.status === "full" && "cursor-not-allowed opacity-70",
                        selectedRouteId === route.id
                          ? "border-pink-primary bg-pink-light ring-1 ring-pink-primary/20"
                          : "border-pink-medium/40 bg-white hover:bg-pink-soft"
                      )}
                    >
                      <p className="text-sm font-semibold text-charcoal">
                        {route.name}
                      </p>
                      <p className="mt-1 text-xs text-slate">{route.cadence}</p>
                      <div className="mt-3">
                        {route.status === "full" ? (
                          <Badge variant="destructive">Full</Badge>
                        ) : (
                          <Badge variant="warning" className="gap-1.5">
                            <Zap className="size-3.5" />
                            {route.slotsLeft} slot{route.slotsLeft > 1 ? "s" : ""} left
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/70 pt-7">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Clock className="size-5 text-pink-primary" />
                  2. Select a Time
                </CardTitle>
                <p className="mt-1.5 text-sm text-slate">
                  {selectedRoute.name} · {selectedRoute.cadence}
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {timeWindows.map((window) => (
                    <button
                      key={window.id}
                      type="button"
                      onClick={() => setSelectedWindowId(window.id)}
                      disabled={routeIsFull}
                      className={cn(
                        "flex items-center justify-between rounded-xl border px-4 py-4 text-left transition-colors",
                        routeIsFull && "cursor-not-allowed opacity-60",
                        selectedWindowId === window.id
                          ? "border-pink-primary bg-pink-light ring-1 ring-pink-primary/20"
                          : "border-pink-medium/40 bg-white hover:bg-pink-soft"
                      )}
                    >
                      <div>
                        <p className="text-sm font-semibold text-charcoal">
                          {window.label}
                        </p>
                        <p className="text-xs text-slate">{window.hours}</p>
                      </div>
                      <Badge
                        variant={
                          window.availability === "available" ? "success" : "warning"
                        }
                      >
                        {window.availability === "available" ? "Available" : "Limited"}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/70 pt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full gap-1.5 px-3 text-sm sm:text-base"
                      disabled={routeIsFull}
                    >
                      <Lock className="size-4" />
                      {routeIsFull
                        ? "Route Currently Full"
                        : (
                            <>
                              <span className="sm:hidden">Lock In Slot — $100/visit</span>
                              <span className="hidden sm:inline">
                                Lock In Recurring Slot — $100/visit
                              </span>
                            </>
                          )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Lock In Your Recurring Slot</DialogTitle>
                      <DialogDescription>
                        You selected {selectedRoute.name} ({selectedRoute.cadence})
                        in the {selectedWindow.label.toLowerCase()} ({selectedWindow.hours}).
                        We&apos;ll confirm your bi-weekly start via text within 24
                        hours.
                      </DialogDescription>
                    </DialogHeader>
                    <Button className="w-full">Confirm Reservation</Button>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
