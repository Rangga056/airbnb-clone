import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCountries } from "../lib/getCountry";
import {
  AddToFavouriteButton,
  DeleteFromFavouriteButton,
} from "./SubmitButtons";
import { AddToFavourite, DeleteFromFavourite } from "../actions";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavourite: boolean;
  favouriteId: string;
  homeId: string;
  pathname: string;
}

const ListingCard = ({
  description,
  imagePath,
  location,
  price,
  userId,
  homeId,
  isInFavourite,
  pathname,
  favouriteId,
}: iAppProps) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://jdlsedqvzhcpxxzkkgxo.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of Home"
          fill
          className="rounded-lg h-full object-cover"
        />
        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavourite ? (
              <form action={DeleteFromFavourite}>
                <input type="hidden" name="favouriteId" value={favouriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathname" value={pathname} />
                <DeleteFromFavouriteButton />
              </form>
            ) : (
              <form action={AddToFavourite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathname" value={pathname} />
                <AddToFavouriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={"/"} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> night
        </p>
      </Link>
    </div>
  );
};

export default ListingCard;
