import Nav from "./Nav";
import Providers from "@/pages/Providers";

export default function Layout({ children }) {
  return (
    <>
      <Providers>
        <Nav />
        <div className="mx-6 md:max-w-2xl md:mx-auto font-poppins">
          <main>
            {children}
          </main>
        </div>
      </Providers>
    </>
  );
}