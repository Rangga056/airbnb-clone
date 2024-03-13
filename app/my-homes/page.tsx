import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import NoItem from "../components/NoItem";
import ListingCard from "../components/ListingCard";

import { unstable_noStore as noStore } from "next/cache";
async function getData(userId: string) {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      Favourite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

const MyHomePage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");
  const data = await getData(user?.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>

      {data.length === 0 ? (
        <NoItem
          description="Please list a home on airbnb so you can see it here"
          title="You don't have any homes listed"
        />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              imagePath={item.photo as string}
              description={item.description as string}
              price={item.price as number}
              location={item.country as string}
              homeId={item.id}
              userId={user.id}
              pathname="/my-home"
              favouriteId={item.Favourite[0]?.id}
              isInFavourite={item.Favourite.length > 0 ? true : false}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyHomePage;
