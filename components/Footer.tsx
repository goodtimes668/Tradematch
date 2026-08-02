export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-10 text-center text-sm text-gray-500">
      <p>TradeMatch &mdash; connecting future tradespeople with schools that want them.</p>
      <p className="mt-1">
        Have a program that&apos;s hiring students?{" "}
        <a href="mailto:hello@tradematch.com" className="text-brand-600 hover:underline">
          hello@tradematch.com
        </a>
      </p>
    </footer>
  );
}
