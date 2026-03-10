import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-light text-[#D6E3F0] mb-4">404</div>
      <h1 className="text-2xl font-light text-[#0C1929] mb-3">Сторінку не знайдено</h1>
      <p className="text-[#4A6180] font-light mb-8 text-sm">
        На жаль, запитана сторінка не існує або була переміщена.
      </p>
      <Link
        href="/uk"
        className="inline-flex items-center justify-center h-11 px-6 bg-[#0D3A7E] text-white text-sm font-medium rounded-[6px] hover:bg-[#0A2E63] transition-colors"
      >
        Повернутись на головну
      </Link>
    </div>
  );
}
