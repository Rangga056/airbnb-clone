import React from "react";
import SkeletonCard from "../components/SkeletonCard";

const MyHomesLoading = () => {
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h1 className="text-3xl font-semibold tracking-tight">Your Homes</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </section>
  );
};

export default MyHomesLoading;
