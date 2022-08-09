import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toMiliseconds } from "../utils/time";
import { trpc } from "../utils/trpc";
import { NumberInput } from "../components/Input";

const Home: NextPage = () => {
  const {
    isLoading: createIsLoading,
    error: createError,
    mutateAsync: createTimer,
  } = trpc.proxy.timer.create.useMutation();

  const [duration, setDuration] = useState<Time>({ hours: 0, minutes: 0 });
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
        <label>
          <NumberInput
            placeholder="Hours"
            name="hours"
            min={0}
            step="1"
            onChange={(e) => {
              const num = Number.parseInt(e.target.value);
              if (num < 0) e.target.value = "0";
              if (!Number.isInteger(num))
                e.target.value = Math.round(num).toString();

              const _duration = duration;
              _duration.hours = num;
              setDuration(_duration);
            }}
          />
          <NumberInput
            placeholder="Minutes"
            name="minutes"
            max={59}
            min={0}
            step="1"
            onChange={(e) => {
              const num = Number.parseInt(e.target.value);
              if (num > 59) e.target.value = "59";
              if (!Number.isInteger(num))
                e.target.value = Math.round(num).toString();

              const _duration = duration;
              _duration.minutes = num;
              setDuration(_duration);
            }}
          />
        </label>
        <button
          disabled={createIsLoading}
          onClick={async () => {
            if (duration.hours === 0 && duration.minutes === 0) return;

            const durationMs = toMiliseconds(
              duration.hours,
              duration.minutes,
              0
            );

            const dueTime = +Date.now() + durationMs;

            const { shortId } = await createTimer({ due: new Date(dueTime) });

            router.push("/" + shortId);
          }}
        >
          Create
        </button>
      </main>
    </>
  );
};

export default Home;
