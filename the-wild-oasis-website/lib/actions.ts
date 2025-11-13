"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { BookingFormData, UpdateBooking } from "./types";

// Auth Actions
export async function signInAction() {
  await signIn("google", { redirectTo: "/account/reservations" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// Profile Action
export async function updateProfileAction(formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const nationalID = formData.get("nationalID") as string;
  const nationalityField = formData.get("nationality") as string | null;

  if (!nationalityField) {
    throw new Error("Nationality is required");
  }

  const [nationality, countryFlag] = nationalityField.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", Number(session.user?.id));

 if (error) {
   return { error: "Guest could not be updated" };
 }

 revalidatePath("/account/profile");
 return { success: true };
}

// Bookings Actions
export async function createBookingAction(
  bookingData: BookingFormData,
  formData: FormData,
) {
  const session = await auth();
  if (!session) redirect("/login");

  const obsValue = formData.get("observations");
  const observations =
    typeof obsValue === "string" && obsValue.trim() !== ""
      ? obsValue.slice(0, 1000)
      : null;

  const newBooking = {
    startDate: bookingData.startDate
      ? bookingData.startDate.toISOString()
      : null,
    endDate: bookingData.endDate ? bookingData.endDate.toISOString() : null,
    numNights: bookingData.numNights,
    cabinPrice: bookingData.cabinPrice,
    cabinId: bookingData.cabinId,
    guestId: Number(session?.user?.id),
    numGuests: Number(formData.get("numGuests")),
    observations,
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function updateBookingAction(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();
  if (!session) redirect("/login");

  const guestBookings = await getBookings(session?.user?.id as string);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const rawObs = formData.get("observations");
  const observations: string | null =
    typeof rawObs === "string" ? rawObs.slice(0, 1000) : null;

  const numGuests = Number(formData.get("numGuests") ?? 1);

  const updateData: UpdateBooking = {
    numGuests,
    observations,
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function deleteBookingAction(bookingId: number) {
  const session = await auth();
  if (!session) redirect("/login");

  const guestBookings = await getBookings(session?.user?.id as string);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}
