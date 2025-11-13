import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image
        src={logo}
        height={60}
        width={60}
        alt="The Wild Oasis logo"
        loading="eager"
      />
      <span className="text-primary-100 text-xl font-semibold">
        The Wild Oasis
      </span>
    </Link>
  );
};

export default Logo;
