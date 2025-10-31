import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked Out" },
          { value: "checked-in", label: "Checked In" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by Date (recent-earlier)" },
          { value: "startDate-asc", label: "Sort by Date (earlier-recent)" },
          {
            value: "totalPrice-desc",
            label: "Sort by Amount (high-low)",
          },
          { value: "totalPrice-asc", label: "Sort by Amount (low-high)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
