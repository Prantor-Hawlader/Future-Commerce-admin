import React from "react";
import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";
import CategoryClient from "./components/client";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedcategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    billboardLabel: item.billboard.label,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-4">
        <CategoryClient data={formattedcategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
