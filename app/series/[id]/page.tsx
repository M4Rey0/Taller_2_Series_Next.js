import SeriesDetail from "@/components/SeriesDetail";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  return <SeriesDetail id={id} />;
}
