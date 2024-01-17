import React from "react";
import OrdersClient from "./components/client";
import prismadb from "@/lib/prismadb";

import { formatter } from "@/lib/utils";
import { OrderColumn } from "./components/columns";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },

    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedorders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-4">
        <OrdersClient data={formattedorders} />
      </div>
    </div>
  );
};

export default OrdersPage;
