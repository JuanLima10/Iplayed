'use client'
import { getFullDate } from "@/utils/unixTimeStampToDate";
import { useState } from "react";

export function TimeCounter({ date }: { date: number }) {
  const [day, setDay] = useState(0)
  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)
  const [second, setSecond] = useState(0)

  const countDown = () => {
    const initialDate = new Date(getFullDate(date)).getTime()
    const now = new Date().getTime()
    const interval = initialDate - now

    setDay(Math.floor(interval / (1000 * 60 * 60 * 24)))
    setHour(Math.floor((interval % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
    setMin(Math.floor(interval % (1000 * 60 * 60) / (1000 * 60)))
    setSecond(Math.floor(interval % (1000 * 60) / (1000)))
  }
  setInterval(countDown, 1000)

  return (
    <div className="w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-0 flex flex-col items-center responsive:top-[30%]">
      <span className="font-bold text-xl text-white-100 small-screen:text-lg ml-2">
        {day < 10 ? '0' + day : day} : {' '}
        {hour < 10 ? '0' + hour : hour} : {' '}
        {min < 10 ? '0' + min : min}
        <b className="text-xs ml-1">
          {second < 10 ? '0' + second : second}
        </b>
      </span>
      <p className="flex items-center justify-center gap-6 font-bold text-sm text-white-100 px-2 small-screen:hidden">
        <b>days</b>
        <b>hours</b>
        <b>min</b>
      </p>
    </div>
  )
}