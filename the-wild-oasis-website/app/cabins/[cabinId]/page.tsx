import FullPageSpinner from "@/components/FullPageSpinner";
import { getCabin, getCabins } from "@/lib/data-service";
import { Suspense } from "react";
import Cabin from "./_components/Cabin";
import Reservation from "./_components/Reservation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

const CabinDetailsPage = async ({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) => {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-accent-400 mb-10 text-center text-5xl font-semibold">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<FullPageSpinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
};

export default CabinDetailsPage;
