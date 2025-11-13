import SideNavigation from "./_components/SideNavigation";

const AccountLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid h-[69vh] grid-cols-[16rem_1fr] gap-12">
      <SideNavigation />
      <div className="hide-scroll overflow-y-auto py-1">{children}</div>
    </div>
  );
};

export default AccountLayout;
