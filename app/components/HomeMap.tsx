import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const HomeMap = ({ locationValue }: { locationValue: string }) => {
  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  return <LazyMap locationValue={locationValue} />;
};

export default HomeMap;
