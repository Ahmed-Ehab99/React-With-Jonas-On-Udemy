import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getBooking } from "../../services/apiBookings";

export const useBooking = () => {
  const { bookingId } = useParams();

  const { data: booking, isPending } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { booking, isPending };
};
