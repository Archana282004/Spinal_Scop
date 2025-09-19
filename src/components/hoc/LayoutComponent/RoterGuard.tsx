'use client';
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { PUBLIC_PATH, ROUTES_PATH } from "@/utils/constant";

export const RouterGuard = ({ children }: { children: React.ReactNode }) => { 
  const { token } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(pathname);
  }, [token, pathname]);

  function authCheck(url: string) {
    const isPublicPath = Object.values(PUBLIC_PATH).includes(url);
    const isLoginPage = url === ROUTES_PATH.LOGIN;

    if (!token && !isPublicPath) {
      router.push(ROUTES_PATH.LOGIN);
      setAuthorized(false);
      return;
    }

    if (token && (isLoginPage || isPublicPath)) {
      router.push(ROUTES_PATH.HOME);
      setAuthorized(false);
      return;
    }

    setAuthorized(true);
  }

  return authorized ? children : <></>;
};