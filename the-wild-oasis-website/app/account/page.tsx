import { auth } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

const AccountPage = async () => {
  const session = await auth();

  return (
    <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
      Welcome, {session?.user?.name}
    </h2>
  );
};

export default AccountPage;
