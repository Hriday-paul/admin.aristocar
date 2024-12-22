"use client";

import CountUp from "react-countup";

export default function CustomCountUp({ start, end, duration }) {
  return (
    <CountUp
      start={start || 0}
      end={end}
      duration={duration || 3}
      separator=" "
      enableScrollSpy={true}
    />
  );
}
