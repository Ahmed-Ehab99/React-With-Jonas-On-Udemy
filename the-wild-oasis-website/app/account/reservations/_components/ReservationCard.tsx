import { BookingWithCabin } from "@/lib/types";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

const ReservationCard = ({
  booking,
  onDelete,
}: {
  booking: BookingWithCabin;
  onDelete: (bookingId: number) => Promise<void>;
}) => {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabins,
  } = booking;
  const name = cabins?.name ?? "Unknown Cabin";
  const image = cabins?.image ?? "/no-image.jpg";

  return (
    <div className="border-primary-800 flex border">
      <div className="relative aspect-square h-32">
        <Image
          src={image ?? "/no-image.jpg"}
          alt={`Cabin ${name}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="border-primary-800 border-r object-cover"
        />
      </div>

      <div className="flex grow flex-col px-6 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {startDate && isPast(new Date(startDate)) ? (
            <span className="flex h-7 items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold text-yellow-200 uppercase">
              past
            </span>
          ) : (
            <span className="flex h-7 items-center rounded-sm bg-green-800 px-3 text-xs font-bold text-green-200 uppercase">
              upcoming
            </span>
          )}
        </div>

        <p className="text-primary-300 text-lg">
          {startDate && format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {startDate && isToday(new Date(startDate))
            ? "Today"
            : startDate && formatDistanceFromNow(startDate)}
          ) &mdash; {endDate && format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="mt-auto flex items-baseline gap-5">
          <p className="text-accent-400 text-xl font-semibold">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-primary-300 text-lg">
            {numGuests ?? 0} guest{(numGuests ?? 0) > 1 && "s"}
          </p>
          <p className="text-primary-400 ml-auto text-sm">
            Booked{" "}
            {created_at && format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="border-primary-800 flex w-[100px] flex-col border-l">
        {startDate && !isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group text-primary-300 border-primary-800 hover:bg-accent-600 hover:text-primary-900 flex grow items-center gap-2 border-b px-3 text-xs font-bold uppercase transition-colors"
            >
              <Pencil className="text-primary-600 group-hover:text-primary-800 h-5 w-5 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation onDelete={onDelete} bookingId={id} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ReservationCard;
