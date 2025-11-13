import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account",
};

const AccountPage = async () => {
  redirect("/account/reservations");
};

export default AccountPage;
