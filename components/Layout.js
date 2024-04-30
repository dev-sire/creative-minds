import Nav from "./Nav";
import Providers from "@/pages/Providers";

export default function Layout({ children }) {
  return (
    <div className="mx-6 md:max-w-2xl md:mx-auto font-poppins">
      <Providers>
        <Nav />
        <main>
          {children}
        </main>
      </Providers>
    </div>
  );
}