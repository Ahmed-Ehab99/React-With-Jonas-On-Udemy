import { auth } from "@/lib/auth";
import ActiveLink from "./ActiveLink";

const Navigation = async () => {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <ActiveLink href="/cabins">Cabins</ActiveLink>
        </li>
        <li>
          <ActiveLink href="/about">About</ActiveLink>
        </li>
        <li>
          <ActiveLink href="/account/reservations" session={session} isUserArea>
            Guest area
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
