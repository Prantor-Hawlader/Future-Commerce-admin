"use client";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import React from "react";
import ApiAlert from "./api-alert";
interface ApiListProps {
  enntityName: string;
  entityIdName: string;
}
const ApiList = ({ enntityName, entityIdName }: ApiListProps) => {
  const origin = useOrigin();
  const params = useParams();

  return (
    <>
      <ApiAlert
        description={`${origin}/api/${params.storeId}/${enntityName}`}
        title="GET"
        variant="public"
      />
      <ApiAlert
        description={`${origin}/api/${params.storeId}/${enntityName}/{${entityIdName}}`}
        title="GET"
        variant="public"
      />
      <ApiAlert
        description={`${origin}/api/${params.storeId}/${enntityName}`}
        title="POST"
        variant="admin"
      />
      <ApiAlert
        description={`${origin}/api/${params.storeId}/${enntityName}/{${entityIdName}}`}
        title="PATCH"
        variant="admin"
      />
      <ApiAlert
        description={`${origin}/api/${params.storeId}/${enntityName}/{${entityIdName}}`}
        title="DELETE"
        variant="admin"
      />
    </>
  );
};

export default ApiList;
