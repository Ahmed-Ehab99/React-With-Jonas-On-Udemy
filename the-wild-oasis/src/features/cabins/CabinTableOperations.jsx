import React from "react";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by Name (A-Z)" },
          { value: "name-desc", label: "Sort by Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (low-high)" },
          { value: "regularPrice-desc", label: "Sort by Price (high-low)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (low-high)" },
          { value: "maxCapacity-desc", label: "Sort by Capacity (high-low)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
