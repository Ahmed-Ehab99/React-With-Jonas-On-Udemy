"use client";

import { Spinner } from "@/components/ui/spinner";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

const DeleteReservation = ({
  bookingId,
  onDelete,
}: {
  bookingId: number;
  onDelete: (bookingId: number) => Promise<void>;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    // TOAST HERE
    startTransition(async () => {
      await onDelete(bookingId);
    });
  };

  return (
    <button
      onClick={handleDelete}
      className="group text-primary-300 hover:bg-accent-600 hover:text-primary-900 flex grow items-center gap-2 px-3 text-xs font-bold uppercase transition-colors"
    >
      {!isPending ? (
        <>
          <Trash2 className="text-primary-600 group-hover:text-primary-800 h-5 w-5 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <Spinner className="mx-auto size-7" />
      )}
    </button>
  );
};

export default DeleteReservation;
