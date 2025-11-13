import FullPageSpinner from "@/components/FullPageSpinner";
import { Metadata } from "next";
import { Suspense } from "react";
import ReservationReminder from "./_components/ReservationReminder";
import CabinList from "./_components/CabinList";
import Filter from "./_components/Filter";

export const metadata: Metadata = {
  title: "Cabins",
};

// ISR
// export const revalidate = 3600;

const CabinPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { capacity } = await searchParams;
  const filter = capacity ?? "all";

  return (
    <div>
      <h1 className="text-accent-400 mb-5 text-4xl font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 mb-10 text-lg">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="mb-8 flex justify-end">
        <Filter />
      </div>

      <Suspense fallback={<FullPageSpinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
};

export default CabinPage;
