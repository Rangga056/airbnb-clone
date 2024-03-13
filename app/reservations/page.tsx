import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import NoItem from "../components/NoItem";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import ListingCard from "../components/ListingCard";

import { unstable_noStore as noStore } from "next/cache";
async function getData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          description: true,
          price: true,
          country: true,
          Reservation: true,
          userId: true,
          id: true,
          Favourite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });
  return data;
}

const ReservationsPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);
  if (!user?.id) return redirect("/");

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h1>

      {data.length === 0 ? (
        <NoItem
          title="Hey you don't have anu Reservations"
          description="Please add Reservations to see them right herre..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              pathname="/favourites"
              homeId={item.Home?.id as string}
              imagePath={item.Home?.photo as string}
              price={item.Home?.price as number}
              userId={user.id}
              favouriteId={item.Home?.Favourite[0]?.id as string}
              isInFavourite={
                (item.Home?.Favourite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReservationsPage;
