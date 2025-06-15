import Header from './common/Header/Header';
import Deal from './Deal/Deal';
import Category from './Category/Category';
import Restaurants from './Restaurants/Restaurants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { API_CALL_STATUS } from '../constants/constant';
import { fetchCategories } from '../Store/Category.store';

const Home = () => {
  const categoryStatus = useSelector(state => state.category.status);
  const categoryError = useSelector(state => state.category.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryStatus === API_CALL_STATUS.IDLE) {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  if (categoryStatus === API_CALL_STATUS.FAILED) {
    return (
      <div className="App">
        <header className="App-header">
          <p style={{ color: 'red' }}>Error: {categoryError}</p>
          <button onClick={() => dispatch(fetchCategories())}>Retry</button>
        </header>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container max-w-screen-lg w-full mx-auto px-4 pb-6 pt-[104px]">
        <Deal />
        <Category />
        <Restaurants />
      </div>
    </>
  );
};

export default Home;
