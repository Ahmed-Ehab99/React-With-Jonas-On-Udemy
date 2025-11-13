import Link from "next/link";

const ThankYouPage = () => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center space-y-6 text-center">
      <h1 className="text-3xl font-semibold">
        Thank you for your reservation!
      </h1>
      <Link
        href="/account/reservations"
        className="text-accent-500 inline-block text-xl underline"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
};
export default ThankYouPage;
