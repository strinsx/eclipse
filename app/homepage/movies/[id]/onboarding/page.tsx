export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  return <h1>Movie ID: {id}</h1>;
}