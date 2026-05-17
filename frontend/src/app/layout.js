import "./globals.css";

export const metadata = {
  title: "StackNest",
  description: "A simple social community frontend for StackNest.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
