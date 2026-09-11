import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded border bg-white p-6 text-center">
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <Link href="/series" className="mt-4 inline-block text-blue-700 underline">
        Volver a las series
      </Link>
    </div>
  );
}
