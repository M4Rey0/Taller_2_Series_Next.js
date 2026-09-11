interface SearchBarProps {
  valor: string;
  alCambiar: (valor: string) => void;
  placeholder: string;
}

export default function SearchBar({
  valor,
  alCambiar,
  placeholder,
}: SearchBarProps) {
  return (
    <input
      type="search"
      value={valor}
      onChange={(evento) => alCambiar(evento.target.value)}
      placeholder={placeholder}
      className="mb-5 w-full rounded border border-gray-300 px-3 py-2"
    />
  );
}