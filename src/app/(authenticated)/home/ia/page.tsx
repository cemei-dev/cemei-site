"use client";

import { Suspense } from "react";

import dynamic from "next/dynamic";

import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/loadingSpinner";

// Dynamically import the IA component with SSR disabled
const IAComponent = dynamic(() => import("./iacomp"), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

export default function IA() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <IAComponent />
    </Suspense>
  );
}
