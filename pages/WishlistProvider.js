import { WishProvider } from "@/context/WishlistContext";

export function WishlistProvider({ children }) {
  return <WishProvider>{children}</WishProvider>;
}
