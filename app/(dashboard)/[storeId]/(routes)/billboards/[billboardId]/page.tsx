import prismadb from "@/lib/prismadb";
import React from "react";
import BillboardForm from "./components/BillboardForm";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-4">
        <BillboardForm billboard={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
