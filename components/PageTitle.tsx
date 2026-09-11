import type { ReactNode } from "react";

interface PageTitleProps {
  titulo: string;
  texto?: string;
  accion?: ReactNode;
}

export default function PageTitle({ titulo, texto, accion }: PageTitleProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold">{titulo}</h1>
        {texto && <p className="mt-1 text-gray-600">{texto}</p>}
      </div>
      {accion}
    </div>
  );
}
