/* eslint-disable */
"use client";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import NextLink from "next/link";

import { Logo } from "@/components/icons";
import { authUtils } from "@/utils/auth";
import { User } from "@heroui/user";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    authUtils.removeToken();
    router.push("/login");
  };

  const isAuthenticated = authUtils.isAuthenticated();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">AI Task Manager</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <ul className="hidden lg:flex gap-4 justify-start">
        <NavbarItem key={"/login"}>
          {!isAuthenticated ? (
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href={"/login"}
            >
              Login
            </NextLink>
          ) : (
            <div className="flex gap-[18px] items-center">
              <Button onPress={handleLogout} variant="ghost">
                Logout
              </Button>
              <User name="User" description="Default User" />
            </div>
          )}
        </NavbarItem>
      </ul>
    </HeroUINavbar>
  );
};
