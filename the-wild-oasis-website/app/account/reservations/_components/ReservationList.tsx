"use client";

import { deleteBookingAction } from "@/lib/actions";
import { BookingWithCabin } from "@/lib/types";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";

const ReservationList = ({ bookings }: { bookings: BookingWithCabin[] }) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currBookings, bookingId: number) => {
      return currBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  const handleDelete = async (bookingId: number) => {
    optimisticDelete(bookingId);
    await deleteBookingAction(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
