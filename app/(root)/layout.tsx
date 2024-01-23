import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SetupLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const store = await prismadb.store.findFirst({
    where: {
      userId: userId!,
    },
  });

  if (!userId) {
    redirect("/sign-in");
  }

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
};

export default SetupLayout;
