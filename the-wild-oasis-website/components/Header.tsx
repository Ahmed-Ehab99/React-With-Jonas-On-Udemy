import { Suspense } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SpinnerMini from "./SpinnerMini";

const Header = () => {
  return (
    <header className="border-primary-900 border-b px-8 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <Suspense fallback={<SpinnerMini />}>
          <Navigation />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
