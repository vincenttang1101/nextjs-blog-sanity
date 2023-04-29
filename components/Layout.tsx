import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: JSX.Element;
}
export default function Layout({ children }: Props) {
  return (
    <div className="content">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
