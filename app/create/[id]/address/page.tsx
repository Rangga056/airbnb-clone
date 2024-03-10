"use client";

import { useState } from "react";
import CreationBottomBar from "@/app/components/CreationBottomBar";
import { useCountries } from "@/app/lib/getCountry";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { CreateLocation } from "@/app/actions";

const AddressRoute = ({ params }: { params: { id: string } }) => {
  const { getALlCountries } = useCountries();
  const [locationValue, setLocationValue] = useState("");

  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your Home located?
        </h2>
      </div>

      <form action={CreateLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="countryValue" value={locationValue} />
        <div className="w-3/5 mx-auto mb-36">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {getALlCountries().map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="cursor-pointer"
                    >
                      {item.flag} {item.label} / {item.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Map  */}
          <LazyMap locationValue={locationValue} />
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
};

export default AddressRoute;
