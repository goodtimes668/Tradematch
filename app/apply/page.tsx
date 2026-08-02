import { Suspense } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ApplyForm from "./ApplyForm";

export const metadata = {
  title: "Apply — TradeMatch",
};

export default function ApplyPage() {
  return (
    <>
      <NavBar />
      <section className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-3xl font-extrabold text-ink">
          Tell us about you
        </h1>
        <p className="mt-2 text-gray-600">
          Takes about 60 seconds. We&apos;ll match you with schools looking
          for students right now.
        </p>
        <div className="mt-10">
          <Suspense fallback={null}>
            <ApplyForm />
          </Suspense>
        </div>
      </section>
      <Footer />
    </>
  );
}
