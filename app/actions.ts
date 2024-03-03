"use server"

import { redirect } from "next/navigation"
import prisma from "./lib/db"

export async function createAirbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId
      }
    })
    // console.log("shoudld be redirecting")
    return redirect(`/create/${data.id}/structure`)
  } else if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
    return redirect(`/create/${data.id}/structure`)
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`)
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string
  const homeId = formData.get("homeId") as string
  const data = await prisma.home.update({
    where: {
      id: homeId
    },
    data: {
      categoryName: categoryName,
      addedCategory: true
    }
  })
  return redirect(`/create/${homeId}/description`)
}

