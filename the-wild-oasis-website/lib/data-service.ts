import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";
import { supabase } from "./supabase";
import {
  Country,
  NewBooking,
  NewGuest,
  UpdateBooking,
  UpdateGuest,
} from "./types";

//////////////////// GET ////////////////////

export async function getCabin(id: string) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getCabinPrice(id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(guestId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)",
    )
    .eq("guestId", Number(guestId))
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId: number) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${todayISO},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = (data || [])
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(Number(booking.startDate)),
        end: new Date(Number(booking.endDate)),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );

    if (!res.ok) {
      throw new Error("Failed to fetch countries");
    }

    const countries: Country[] = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

//////////////////// CREATE ////////////////////

export async function createGuest(newGuest: NewGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  if (!data) {
    throw new Error("Guest could not be created (no data returned)");
  }

  return data;
}

export async function createBooking(newBooking: NewBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

//////////////////// UPDATE ////////////////////

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id: number, updatedFields: UpdateGuest) {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(id: number, updatedFields: UpdateBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

//////////////////// DELETE ////////////////////

export async function deleteBooking(id: number) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
