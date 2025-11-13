import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";

const FullPageSpinner = ({ className }: { className?: string }) => {
  return (
    <div className="mt-40 flex items-center justify-center">
      <Spinner className={cn(className, "size-20")} />
    </div>
  );
};

export default FullPageSpinner;
