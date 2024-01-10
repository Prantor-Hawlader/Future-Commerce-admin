import React from "react";
import BillboardsClient from "./components/client";

const BillboardsPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-4">
        <BillboardsClient />
      </div>
    </div>
  );
};

export default BillboardsPage;
