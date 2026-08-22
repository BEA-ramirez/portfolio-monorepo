"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // wait 300ms after the user stops typing before updating the url
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`); // updates the url without reloading the page
  }, 300);

  return (
    <input
      type="search"
      placeholder="Search projects..."
      className="text-small text-foreground w-full focus:outline-none"
      onChange={(e) => handleSearch(e.target.value)}
      // Keep the input in sync if they share the url with someone
      defaultValue={searchParams.get("query")?.toString()}
    />
  );
}
