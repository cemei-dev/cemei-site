"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import FetchAuthState from "@templates/FetchAuth/fetchAuth";

interface Props {
  children: JSX.Element;
}

function AuthenticatedOnlyFeature({ children }: Props): JSX.Element {
  const { userUid } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userUid === "" || userUid === "undefined") {
      router.push(`/login`);
    } else if (userUid && userUid !== "" && userUid !== "undefined") {
      // If userUid is not set, redirect to login
      router.push(`/home`);
    }
  }, [userUid, router]);

  return children;
}

export default function AuthenticatedOnlyFeatureWrapper({
  children
}: Props): JSX.Element {
  return (
    <FetchAuthState>
      <AuthenticatedOnlyFeature>{children}</AuthenticatedOnlyFeature>
    </FetchAuthState>
  );
}
