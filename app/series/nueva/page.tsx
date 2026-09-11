import PageTitle from "@/components/PageTitle";
import SeriesForm from "@/components/SeriesForm";

export default function NuevaSeriePage() {
  return (
    <>
      <PageTitle titulo="Nueva serie" texto="Completa los datos básicos." />
      <SeriesForm modo="crear" />
    </>
  );
}
