import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // It just passes the page right through!
  return <>{children}</>;
}
