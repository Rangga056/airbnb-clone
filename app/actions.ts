"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";

export async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;

  // eslint-disable-next-line no-unused-vars
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });
  return redirect(`/create/${homeId}/description`);
}

export async function CreateDescription(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;
  const homeId = formData.get("homeId") as string;

  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomNumber = formData.get("bathroom") as string;

  try {
    const { data: imageData } = await supabase.storage
      .from("images")
      .upload(`${imageFile.name}-${new Date()}`, imageFile, {
        cacheControl: "2592000",
        contentType: "image/png",
      });
    // eslint-disable-next-line no-unused-vars
    const data = await prisma.home.update({
      where: {
        id: homeId,
      },
      data: {
        title: title,
        description: description,
        price: Number(price),
        bedrooms: roomNumber,
        bathrooms: bathroomNumber,
        guests: guestNumber,
        photo: imageData?.path,
        addedDescription: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
  return redirect(`/create/${homeId}/address`);
}

export async function CreateLocation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const countryValue = formData.get("countryValue") as string;

  try {
    // eslint-disable-next-line no-unused-vars
    const data = await prisma.home.update({
      where: {
        id: homeId,
      },
      data: {
        addedLocation: true,
        country: countryValue,
      },
    });
  } catch (error) {
    console.error(error);
  }

  return redirect("/");
}

export async function AddToFavourite(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const userId = formData.get("userId") as string;
  const pathname = formData.get("pathname") as string;

  // eslint-disable-next-line no-unused-vars
  const data = await prisma.favourite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });

  revalidatePath(pathname);
}

export async function DeleteFromFavourite(formData: FormData) {
  const favouriteId = formData.get("favouriteId") as string;
  const pathname = formData.get("pathname") as string;
  const userId = formData.get("userId") as string;

  // eslint-disable-next-line no-unused-vars
  const data = await prisma.favourite.delete({
    where: {
      id: favouriteId,
      userId: userId,
    },
  });
  revalidatePath(pathname);
}
