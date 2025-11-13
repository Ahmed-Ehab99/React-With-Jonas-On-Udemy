import { CabinT } from "@/lib/types";
import { EyeOff, MapPin, Users } from "lucide-react";
import Image from "next/image";
import TextExpander from "./TextExpander";

const Cabin = ({ cabin }: { cabin: CabinT }) => {
  const { name, maxCapacity, image, description } =
    cabin;

  return (
    <div className="border-primary-800 mb-24 grid grid-cols-2 gap-20 border px-10 py-3">
      <div className="relative">
        <Image
          src={image || "/no-image.jpg"}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          alt={`Cabin ${name}`}
          loading="eager"
        />
      </div>

      <div>
        <h3 className="text-accent-100 bg-primary-950 mb-5 p-6 pb-1 text-7xl font-black">
          Cabin {name}
        </h3>

        <p className="text-primary-300 mb-10 text-lg">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="mb-7 flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <Users className="text-primary-600 h-5 w-5" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPin className="text-primary-600 h-5 w-5" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <EyeOff className="text-primary-600 h-5 w-5" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cabin;
