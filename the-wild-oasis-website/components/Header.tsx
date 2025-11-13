import { Suspense } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { Spinner } from "./ui/spinner";

const Header = () => {
  return (
    <header className="border-primary-900 border-b px-8 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <Suspense fallback={<Spinner className="size-8" />}>
          <Navigation />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
