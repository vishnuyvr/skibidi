import Navbar from "./components/Navbar";
import AppDrawer from "./components/AppDrawer";
import SpotlightSearch from "./components/SpotlightSearch";

export default function Home() {
  return (
    <main className="page-root">
      <Navbar />
      <AppDrawer />
      <SpotlightSearch />
    </main>
  );
}
