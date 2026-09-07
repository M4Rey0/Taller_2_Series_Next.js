interface SearchBarProps {
  valor: string;
  alCambiar: (valor: string) => void;
}

export default function SearchBar({ valor, alCambiar }: SearchBarProps) {
  return (
    <input
      type="search"
      value={valor}
      onChange={(evento) => alCambiar(evento.target.value)}
      placeholder="Buscar por nombre..."
      className="mb-5 w-full rounded border border-gray-300 px-3 py-2"
    />
  );
}
