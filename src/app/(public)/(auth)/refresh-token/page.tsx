"use client";
import {
  checkAndRefreshToken,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function RefreshToken() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshToken = searchParams.get("refreshToken");
  const redirectUrl = searchParams.get("redirectUrl");
  useEffect(() => {
    if (refreshToken === getRefreshTokenFromLocalStorage()) {
      checkAndRefreshToken({
        onSuccess: () => {
          router.push(redirectUrl ?? "/");
        },
      });
    }
  }, [refreshToken, redirectUrl, router]);
  return <div>RefreshToken</div>;
}
