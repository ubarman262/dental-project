import Banner from "../../components/Banner/Banner";
import ScrollTop from "../../components/ScrollTop/ScrollTop";

export default function Home(props) {
  return (
    <>
      <Banner />
      <ScrollTop {...props} />
    </>
  );
}
