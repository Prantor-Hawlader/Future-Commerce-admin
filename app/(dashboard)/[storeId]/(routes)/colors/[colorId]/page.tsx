import prismadb from "@/lib/prismadb";
import React from "react";
import ColorForm from "./components/ColorForm";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-4">
        <ColorForm color={color} />
      </div>
    </div>
  );
};

export default ColorPage;
