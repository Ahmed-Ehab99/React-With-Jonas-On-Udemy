"use client";

import { updateProfileAction } from "@/lib/actions";
import { GuestT } from "@/lib/types";
import Image from "next/image";
import { useTransition } from "react";
import toast from "react-hot-toast";
import SubmitBtn from "../../_components/SubmitBtn";

const UpdateProfileForm = ({
  children,
  guest,
}: {
  children: React.ReactNode;
  guest: GuestT | null;
}) => {
  const { fullName, email, nationalID, countryFlag } = guest ?? {};
  const [, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await updateProfileAction(formData);

      if (result?.error) {
        toast.error(result.error, {
          duration: 4000,
        });
      } else if (result?.success) {
        toast.success("Profile updated successfully!", {
          duration: 3000,
        });
      }
    });
  };

  return (
    <form
      action={handleSubmit}
      className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          readOnly
          name="fullName"
          defaultValue={fullName as string}
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          readOnly
          name="email"
          defaultValue={email as string}
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag && (
            <Image
              src={countryFlag as string}
              alt="Country flag"
              className="h-5 rounded-sm"
              width={20}
              height={20}
            />
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID as string}
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <SubmitBtn pendingLabel="Updating...">Update profile</SubmitBtn>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
