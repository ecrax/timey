import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimerPage: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") return <div>No id</div>;

  return <TimerPageContent id={id} />;
};

const TimerPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { isLoading, error, data } = trpc.proxy.timer.getById.useQuery({
    id: id,
  });

  const calculateTimeLeft = () => {
    //const x = +data?.createdAt! + data?.duration!;
    //const d = x - +new Date();

    const d = +data?.due! - +new Date();

    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (d > 0) {
      timeLeft = {
        days: Math.floor(d / (1000 * 60 * 60 * 24)),
        hours: Math.floor((d / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((d / 1000 / 60) % 60),
        seconds: Math.floor((d / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: React.ReactNode[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval as keyof typeof timeLeft]} {interval}{" "}
      </span>
    );
  });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
        {data ? (
          <div>
            {timerComponents.length ? (
              timerComponents
            ) : (
              <span>Time&apos;s up!</span>
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </>
  );
};

export default TimerPage;
