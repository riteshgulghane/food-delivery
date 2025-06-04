import Header from "./common/Header/Header";
import Deal from "./Deal/Deal";
import Category from "./Category/Category";
import Restaurants from "./Restaurants/Restaurants";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container w-full mx-auto px-4 pb-6 pt-[104px] ">
        <Deal />
        <Category />
        <Restaurants />
      </div>
    </>
  );
};

export default Home;
