import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import NoItem from "../components/NoItem";
import ListingCard from "../components/ListingCard";

async function getData(userId: string) {
  const data = await prisma.favourite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          Favourite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });
  return data;
}

const FavouritePage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h1 className="text-3xl font-semibold tracking-tight">Your Favourites</h1>

      {data.length === 0 ? (
        <NoItem
          title="Hey you don't have any favourites"
          description="Please add favourites to see them right herre..."
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
              favouriteId={item.Home?.Favourite[0].id as string}
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

export default FavouritePage;
