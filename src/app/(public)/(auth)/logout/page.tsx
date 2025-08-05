"use client";

import { useAppContext } from "@/components/app-provider";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
function Logout() {
  const { mutateAsync } = useLogoutMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshTokenFromUrl = searchParams.get("refreshToken");
  const accessTokenFromUrl = searchParams.get("accessToken");
  const { setIsAuth } = useAppContext();
  const ref = useRef<any>(null);
  useEffect(() => {
    if (
      ref.current ||
      (refreshTokenFromUrl &&
        refreshTokenFromUrl !== getRefreshTokenFromLocalStorage()) ||
      (accessTokenFromUrl &&
        accessTokenFromUrl !== getAccessTokenFromLocalStorage())
    ) {
      return;
    }
    ref.current = mutateAsync;
    mutateAsync().then((res) => {
      setTimeout(() => {
        ref.current = null;
      }, 1000);
      setIsAuth(false);
      router.push("/login");
    });
  }, [mutateAsync, router, refreshTokenFromUrl, accessTokenFromUrl, setIsAuth]);
  return <div>Log out....</div>;
}
export default function LogoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Logout />
    </Suspense>
  );
}
