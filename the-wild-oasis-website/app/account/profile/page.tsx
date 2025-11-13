import { auth } from "@/lib/auth";
import SelectCountry from "./_components/SelectCountry";
import UpdateProfileForm from "./_components/UpdateProfileForm";
import { getGuest } from "@/lib/data-service";

export const metadata = {
  title: "Update profile",
};

const ProfilePage = async () => {
  const session = await auth();
  const guest = await getGuest(session?.user?.email as string);

  return (
    <div>
      <h2 className="text-accent-400 mb-4 text-2xl font-semibold">
        Update your guest profile
      </h2>

      <p className="text-primary-200 mb-8 text-lg">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          key={guest?.nationality ?? ""}
          name="nationality"
          id="nationality"
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          defaultCountry={guest?.nationality ?? ""}
        />
      </UpdateProfileForm>
    </div>
  );
};

export default ProfilePage;
