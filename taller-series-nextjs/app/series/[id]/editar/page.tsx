import PageTitle from "@/components/PageTitle";
import SeriesForm from "@/components/SeriesForm";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;

  return (
    <>
      <PageTitle titulo="Editar serie" texto="Modifica los datos y guarda." />
      <SeriesForm modo="editar" id={id} />
    </>
  );
}
