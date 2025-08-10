import { h } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";

export default function CountdownBogota() {
  const workerRef = useRef<Worker | null>(null);
  const [countdown, setCountdown] = useState<string>("Loading...");
  const [error, setError] = useState<string | null>(null);

  // Target date in Bogotá time (UTC-5)
  const targetDate = new Date("2026-02-27T00:00:00-05:00");

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/countdown.worker.ts", import.meta.url),
      { type: "module" },
    );

    workerRef.current.onmessage = (e: MessageEvent<CountdownMessage>) => {
      if (e.data.countdown) {
        setCountdown(e.data.countdown);
      } else if (e.data.error) {
        setError(e.data.error);
      }
    };

    workerRef.current.postMessage({ start: true });

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const saveToCalendar = (format: "google" | "ics" | "outlook") => {
    const event = {
      title: "Nos Casamos - Sofía & Cristhian",
      description: "No Olvides en apartar la Fecha, te esperamos!",
      location: "Inírida, Guainía",
      start: targetDate,
      end: new Date(targetDate.getTime() + 2 * 60 * 60 * 1000), // +2 hours
    };

    switch (format) {
      case "google":
        // Generate Google Calendar URL
        const googleUrl = new URL(
          "https://calendar.google.com/calendar/render",
        );
        googleUrl.searchParams.set("action", "TEMPLATE");
        googleUrl.searchParams.set("text", event.title);
        googleUrl.searchParams.set("details", event.description);
        googleUrl.searchParams.set("location", event.location);
        googleUrl.searchParams.set(
          "dates",
          `${event.start.toISOString().replace(/[-:]/g, "").split(".")[0]}Z` +
            `/${event.end.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
        );
        window.open(googleUrl.href, "_blank");
        break;

      case "outlook":
        // Generate Outlook Calendar URL
        const outlookUrl = new URL(
          "https://outlook.live.com/calendar/0/deeplink/compose",
        );
        outlookUrl.searchParams.set("path", "/calendar/action/compose");
        outlookUrl.searchParams.set("rru", "addevent");
        outlookUrl.searchParams.set("subject", event.title);
        outlookUrl.searchParams.set("body", event.description);
        outlookUrl.searchParams.set("location", event.location);
        outlookUrl.searchParams.set("startdt", event.start.toISOString());
        outlookUrl.searchParams.set("enddt", event.end.toISOString());
        window.open(outlookUrl.href, "_blank");
        break;

      case "ics":
        // Generate and download ICS file
        const icsContent = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//Kyonax//Countdown Event//EN",
          "BEGIN:VEVENT",
          `UID:${Date.now()}@kyonax`,
          `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
          `DTSTART:${event.start.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
          `DTEND:${event.end.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
          `SUMMARY:${event.title}`,
          `DESCRIPTION:${event.description}`,
          `LOCATION:${event.location}`,
          "END:VEVENT",
          "END:VCALENDAR",
        ].join("\n");

        const blob = new Blob([icsContent], {
          type: "text/calendar;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "Nos-Casamos-Sofia-Cristhian.ics";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        break;
    }
  };

  if (error) {
    return <div class="countdown-error">Error: {error}</div>;
  }

  return (
    <div class="countdown-container">
      <h1 class="countdown-display">{countdown}</h1>
      <h6>Febrero 27, 2026</h6>

      <div class="calendar-actions">
        <button
          class="calendar-button"
          onClick={() => saveToCalendar("google")}
        >
          <i class="icon-google"></i> Google
        </button>

        <button
          class="calendar-button"
          onClick={() => saveToCalendar("outlook")}
        >
          <i class="icon-outlook"></i> Outlook
        </button>

        <button class="calendar-button" onClick={() => saveToCalendar("ics")}>
          <i class="icon-download"></i> iOS
        </button>
      </div>
    </div>
  );
}

// Types
interface CountdownMessage {
  countdown?: string;
  error?: string;
}
