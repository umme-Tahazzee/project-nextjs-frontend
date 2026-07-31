"use client";

import { Input } from "@/components/ui/input";
import debounce from "debounce";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef } from "react";

export function NewsSearchBar() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const params = new URLSearchParams();
  const router = useRouter();

  const handleChange = (value: string) => {
    if (value) {
      params.set("searchTerm", value);
    } else {
      params.delete("searchTerm");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };

  const debouncedHandleChange = useMemo(
    () => debounce((value: string) => handleChange(value), 500),
    [],
  );
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        onChange={(e) => debouncedHandleChange(e.target.value)}
        placeholder="Search news..."
        className="pl-9"
      />
    </div>
  );
}
