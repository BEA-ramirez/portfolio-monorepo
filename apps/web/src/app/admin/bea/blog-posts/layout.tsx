import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
