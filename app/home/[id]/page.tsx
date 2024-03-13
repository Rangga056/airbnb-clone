import Image from "next/image";
import prisma from "../../lib/db";
import { useCountries } from "@/app/lib/getCountry";
import { Separator } from "@/components/ui/separator";
import CategoryShowcase from "@/app/components/CategoryShowcase";
import HomeMap from "@/app/components/HomeMap";
import SelectCalendar from "@/app/components/SelectCalendar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreateReservation } from "@/app/actions";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";

import { unstable_noStore as noStore } from "next/cache";
async function getData(homeId: string) {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      createdAt: true,
      Reservation: {
        where: {
          homeId: homeId,
        },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}

const HomeRoute = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  const yearDate = data?.createdAt.toISOString().substring(0, 4);

  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[300px] md:h-[500px]">
        <Image
          src={`https://jdlsedqvzhcpxxzkkgxo.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          alt="Image of home"
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>

      <div className="flex md:flex-row flex-col justify-between gap-y-6 md:gap-x-24 mt-8">
        <div className="md:w-2/3 w-full">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guest</p> * <p>{data?.bedrooms} Bedrooms</p> *{" "}
            <p>{data?.bathrooms} Bathrooms</p>
          </div>

          <div className="flex items-center mt-6">
            <Image
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="user profile image"
              width={44}
              height={44}
              className="rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              <p className="text-sm text-muted-foreground">
                Host since {yearDate}
              </p>
            </div>
          </div>

          <Separator className="my-7" />
          <CategoryShowcase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />

          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-7" />
          <HomeMap locationValue={country?.value as string} />
        </div>

        <form action={CreateReservation} className="flex flex-col gap-y-4">
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalendar reservation={data?.Reservation} />

          {user?.id && (
            <>
              {user?.id ? (
                <ReservationSubmitButton />
              ) : (
                <Button className="w-full" asChild>
                  <Link href="/api/auth/login">Make a Reservation</Link>
                </Button>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default HomeRoute;
