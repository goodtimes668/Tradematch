import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { TRADES } from "@/lib/trades";

export default function HomePage() {
  return (
    <>
      <NavBar />

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="mb-4 inline-block rounded-full bg-brand-50 px-4 py-1 text-sm font-semibold text-brand-700">
          Free for students. No experience required.
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          Find your trade. Start a career that pays.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          TradeMatch connects motivated students with trade schools actively
          looking for their next class of electricians, plumbers, welders,
          HVAC techs, and carpenters &mdash; skilled trades that can&apos;t be
          outsourced or automated.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/quiz"
            className="w-full rounded-md bg-brand-600 px-8 py-3 text-base font-semibold text-white hover:bg-brand-700 sm:w-auto"
          >
            Take the Free Career Quiz
          </Link>
          <Link
            href="/apply"
            className="w-full rounded-md border border-gray-300 px-8 py-3 text-base font-semibold text-ink hover:border-brand-600 hover:text-brand-700 sm:w-auto"
          >
            Skip to Application
          </Link>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            <Stat number="2 min" label="To take the quiz" />
            <Stat number="$0" label="Cost to students, always" />
            <Stat number="1" label="Foreman-built, trade-tested" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
          Trades we match students into
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRADES.map((trade) => (
            <div
              key={trade.id}
              className="rounded-lg border border-gray-200 p-6 transition hover:border-brand-400 hover:shadow-sm"
            >
              <h3 className="text-lg font-semibold text-ink">{trade.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{trade.blurb}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-600">
                {trade.medianPay}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Built by someone who&apos;s actually on the job site.
          </h2>
          <p className="mt-4 text-gray-300">
            TradeMatch was started by a working carpenter foreman &mdash; not
            a marketing agency. We know what schools need from students, and
            what students need to hear to take the trades seriously as a
            career, not a fallback.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
          Ready to see what fits?
        </h2>
        <p className="mt-3 text-gray-600">
          Answer a few quick questions and we&apos;ll point you toward a
          trade and a school that&apos;s hiring students like you.
        </p>
        <Link
          href="/quiz"
          className="mt-8 inline-block rounded-md bg-brand-600 px-8 py-3 text-base font-semibold text-white hover:bg-brand-700"
        >
          Start the Quiz
        </Link>
      </section>

      <Footer />
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-extrabold text-brand-600">{number}</div>
      <div className="mt-1 text-sm text-gray-600">{label}</div>
    </div>
  );
}
