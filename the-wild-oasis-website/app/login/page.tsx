import SignInButton from "./_components/SignInButton";

export const metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-10">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>

      <SignInButton />
    </div>
  );
};
export default LoginPage;
