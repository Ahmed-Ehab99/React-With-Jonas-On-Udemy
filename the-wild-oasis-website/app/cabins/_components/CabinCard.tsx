import { CabinPreview } from "@/lib/types";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CabinCard = ({ cabin }: { cabin: CabinPreview }) => {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="border-primary-800 flex border">
      <div className="relative flex-1">
        <Image
          src={image || "/no-image.jpg"}
          alt={`Cabin ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="border-primary-800 flex-1 border-r object-cover"
        />
      </div>

      <div className="grow">
        <div className="bg-primary-950 px-7 pt-5 pb-4">
          <h3 className="text-accent-500 mb-3 text-2xl font-semibold">
            Cabin {name}
          </h3>

          <div className="mb-2 flex items-center gap-3">
            <User className="text-primary-600 h-5 w-5" />
            <p className="text-primary-200 text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline justify-end gap-3">
            {discount && discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice || 0 - discount}
                </span>
                <span className="text-primary-600 font-semibold line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t-primary-800 border-t text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-primary-800 hover:bg-accent-600 hover:text-primary-900 inline-block border-l px-6 py-4 transition-all"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CabinCard;
