import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import MainNav from "@/components/MainNav";
import StoreSwticher from "@/components/StoreSwticher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId: userId,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwticher items={stores} />
        <MainNav className="mx-4" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
