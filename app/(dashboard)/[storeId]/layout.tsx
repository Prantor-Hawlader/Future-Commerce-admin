import Navbar from "@/components/Navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId!,
    },
  });
  if (!userId) {
    redirect("/sign-in");
  }

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      {children}
    </>
  );
};

export default DashboardLayout;
