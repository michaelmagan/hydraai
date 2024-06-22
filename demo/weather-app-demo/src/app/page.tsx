"use client";

import WeatherTimeChart, { WeatherData } from "./components/weather-timechart";
import DynamicChatbox from "./dynamic-chatbox/dynamic-chatbox";

const weatherData: WeatherData[] = [
  { time: "1 AM", temperature: 70, condition: "rain" },
  { time: "2 AM", temperature: 72, condition: "snow" },
  { time: "3 AM", temperature: 73, condition: "rain" },
  { time: "4 AM", temperature: 74, condition: "sun" },
  { time: "5 AM", temperature: 75, condition: "rain" },
  { time: "6 AM", temperature: 76, condition: "rain" },
  { time: "7 AM", temperature: 77, condition: "rain" },
  { time: "8 AM", temperature: 78, condition: "rain" },
  { time: "9 AM", temperature: 79, condition: "rain" },
  { time: "10 AM", temperature: 80, condition: "rain" },
  { time: "11 AM", temperature: 81, condition: "rain" },
  { time: "12 PM", temperature: 82, condition: "rain" },
  { time: "1 PM", temperature: 83, condition: "rain" },
  { time: "2 PM", temperature: 84, condition: "rain" },
  { time: "3 PM", temperature: 85, condition: "rain" },
  { time: "4 PM", temperature: 86, condition: "rain" },
  { time: "5 PM", temperature: 87, condition: "rain" },
  { time: "6 PM", temperature: 88, condition: "rain" },
  { time: "7 PM", temperature: 89, condition: "rain" },
  { time: "8 PM", temperature: 90, condition: "rain" },
  { time: "9 PM", temperature: 91, condition: "rain" },
  { time: "10 PM", temperature: 92, condition: "rain" },
  { time: "11 PM", temperature: 93, condition: "rain" },
  { time: "12 AM", temperature: 94, condition: "rain" },
];

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-black text-white p-4 justify-center items-center">
      <div className="flex-grow overflow-y-auto w-full max-w-xl">
        <WeatherTimeChart data={weatherData} />
        <DynamicChatbox />
      </div>
    </div>
  );
}
