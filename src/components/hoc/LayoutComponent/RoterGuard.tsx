'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { usePathname, useRouter,  } from "next/navigation";
import { PUBLIC_PATH, ROUTES_PATH } from "@/utils/constant";

export const RouterGuard = ({ children }: { children: React.ReactNode }) => { 
  const { token } = useAppSelector((state: RootState) => state.auth);
debugger
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(pathname);
  }, [token, pathname]);

  function authCheck(url: string) {debugger
    const isPublicPath = Object.values(PUBLIC_PATH).includes(url)

    if (!token &&  !isPublicPath) {
      router.push(ROUTES_PATH.LOGIN);
      return false;
    }
    if (token && isPublicPath) {
      router.push(ROUTES_PATH.HOME);
      return false;
    }

    setAuthorized(true);
  }

  return authorized ? children : <></>;
};