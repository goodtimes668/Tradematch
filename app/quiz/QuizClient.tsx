"use client";

import { useState } from "react";
import Link from "next/link";
import { QUIZ_QUESTIONS, scoreQuiz } from "./quiz-data";
import { getTrade } from "@/lib/trades";

export default function QuizClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const finished = step >= QUIZ_QUESTIONS.length;

  function selectOption(optionIndex: number) {
    const next = [...answers];
    next[step] = optionIndex;
    setAnswers(next);
    setStep(step + 1);
  }

  if (finished) {
    const tradeId = scoreQuiz(answers);
    const trade = getTrade(tradeId);
    return (
      <div className="rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Your best match
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-ink">
          {trade?.name}
        </h2>
        <p className="mt-4 text-gray-600">{trade?.blurb}</p>
        <p className="mt-4 text-sm font-semibold text-brand-700">
          {trade?.medianPay}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/apply?trade=${tradeId}&quiz=${tradeId}`}
            className="w-full rounded-md bg-brand-600 px-8 py-3 font-semibold text-white hover:bg-brand-700 sm:w-auto"
          >
            Apply for {trade?.name} Programs
          </Link>
          <button
            onClick={() => {
              setStep(0);
              setAnswers([]);
            }}
            className="w-full rounded-md border border-gray-300 px-8 py-3 font-semibold text-ink hover:border-brand-600 sm:w-auto"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[step];

  return (
    <div>
      <div className="mb-6">
        <div className="h-1.5 w-full rounded-full bg-gray-100">
          <div
            className="h-1.5 rounded-full bg-brand-600 transition-all"
            style={{
              width: `${((step + 1) / QUIZ_QUESTIONS.length) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2 text-xs font-medium text-gray-500">
          Question {step + 1} of {QUIZ_QUESTIONS.length}
        </p>
      </div>

      <h2 className="text-xl font-bold text-ink">{question.question}</h2>

      <div className="mt-6 flex flex-col gap-3">
        {question.options.map((option, i) => (
          <button
            key={option.label}
            onClick={() => selectOption(i)}
            className="rounded-md border border-gray-200 px-5 py-4 text-left text-sm font-medium text-ink transition hover:border-brand-500 hover:bg-brand-50"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
