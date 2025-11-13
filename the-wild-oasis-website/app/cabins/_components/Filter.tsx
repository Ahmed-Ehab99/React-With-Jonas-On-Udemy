"use client";

import { filters } from "@/lib/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("capacity", filter);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="border-primary-800 inline-flex border">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleFilter(filter.value)}
          disabled={isPending}
          className={`border-primary-800 hover:bg-primary-700 border-l px-5 py-2 transition-colors first:border-l-0 disabled:cursor-wait disabled:opacity-50 ${activeFilter === filter.value ? "bg-primary-700" : ""} `}
          aria-pressed={activeFilter === filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
