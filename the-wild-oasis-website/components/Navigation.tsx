import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

const Navigation = async () => {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 flex items-center gap-4 transition-colors"
            >
              <span>Guest area</span>
              <Image
                src={session.user.image}
                alt={session.user.name || "User Logo"}
                className="size-8 rounded-full"
                width={20}
                height={20}
              />
            </Link>
          ) : (
            <Link href="/account" className="hover:text-accent-400">
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
