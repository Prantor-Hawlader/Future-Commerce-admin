"use client";

import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Store } from "@prisma/client";
import useStoreModal from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { CommandList, CommandSeparator } from "cmdk";
import { useState } from "react";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;
interface StoreSwticherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwticher = ({ className, items = [] }: StoreSwticherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );
  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] "
        >
          <StoreIcon className="mr-2 w-5 h-5" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Store..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {formattedItems.map((store) => (
              <CommandItem
                key={store.value}
                value={store.value}
                onSelect={() => onStoreSelect(store)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentStore?.value === store.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {store.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwticher;
