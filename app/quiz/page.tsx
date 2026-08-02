import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import QuizClient from "./QuizClient";

export const metadata = {
  title: "Free Career Quiz — TradeMatch",
};

export default function QuizPage() {
  return (
    <>
      <NavBar />
      <section className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-center text-3xl font-extrabold text-ink">
          Which trade fits you?
        </h1>
        <p className="mt-2 text-center text-gray-600">
          5 quick questions. No email required to see your result.
        </p>
        <div className="mt-10">
          <QuizClient />
        </div>
      </section>
      <Footer />
    </>
  );
}
