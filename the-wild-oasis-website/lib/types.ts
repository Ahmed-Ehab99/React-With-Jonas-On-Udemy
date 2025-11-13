import { DateRange } from "react-day-picker";
import { Database } from "./database.types";

export type CabinT = Database["public"]["Tables"]["cabins"]["Row"];
export type GuestT = Database["public"]["Tables"]["guests"]["Row"];
export type BookingT = Database["public"]["Tables"]["bookings"]["Row"];
export type SettingsT = Database["public"]["Tables"]["settings"]["Row"];
export type NewGuest = Database["public"]["Tables"]["guests"]["Insert"];
export type NewBooking = Database["public"]["Tables"]["bookings"]["Insert"];
export type UpdateGuest = Database["public"]["Tables"]["guests"]["Update"];
export type UpdateBooking = Database["public"]["Tables"]["bookings"]["Update"];

export type CabinPreview = Pick<
  CabinT,
  "id" | "name" | "maxCapacity" | "regularPrice" | "discount" | "image"
>;

export type Country = {
  name: string;
  flag: string;
};

export type BookingFormData = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
};

export type BookingWithCabin = {
  id: number;
  created_at: string;
  startDate: string | null;
  endDate: string | null;
  numNights: number | null;
  numGuests: number | null;
  totalPrice: number | null;
  guestId: number | null;
  cabinId: number | null;
  cabins: {
    name: string | null;
    image: string | null;
  } | null;
};

export type ReservationContextType = {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
};
