"use cache";

import { getCabins } from "@/lib/data-service";
import CabinCard from "./CabinCard";

const CabinList = async ({ filter }: { filter: string }) => {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity != null && cabin.maxCapacity <= 3,
    );
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) =>
        cabin.maxCapacity != null &&
        cabin.maxCapacity >= 4 &&
        cabin.maxCapacity <= 7,
    );
  if (filter === "large")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity != null && cabin.maxCapacity >= 8,
    );

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
