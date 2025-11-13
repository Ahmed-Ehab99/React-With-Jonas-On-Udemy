import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/data-service";
import Link from "next/link";
import ReservationList from "./_components/ReservationList";

export const metadata = {
  title: "Reservations",
};

const ReservationsPage = async () => {
  const session = await auth();
  const bookings = await getBookings(session?.user?.id as string);

  return (
    <div>
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="text-accent-500 underline" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
};

export default ReservationsPage;
