import prismadb from "@/lib/prismadb";
import React from "react";
import SizeForm from "./components/SizeForm";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-4">
        <SizeForm size={size} />
      </div>
    </div>
  );
};

export default SizePage;
