import './Category.css';
import CategoryCard from '../common/Category-Card/CategoryCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../../Store/Category.store';
import { API_CALL_STATUS } from '../../constants/constant'; // Import API_CALL_STATUS

const Category = () => {
  const dispatch = useDispatch();
  const categoryData = useSelector(state => state.category.category);
  const categoryStatus = useSelector(state => state.category.status); // Get category loading status

  // Number of shimmer cards to display while loading
  const shimmerCount = 6;

  if (categoryStatus === API_CALL_STATUS.LOADING) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-8 mt-8">
        {Array.from({ length: shimmerCount }).map((_, index) => (
          <CategoryCard
            className="flex-1"
            key={`shimmer-category-${index}`}
            isLoading={true} // Pass isLoading prop
          />
        ))}
      </div>
    );
  }

  // TODO: Handle API_CALL_STATUS.FAILED state, e.g., show an error message

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-8 mt-8">
      {categoryData.map(category => (
        <CategoryCard
          className="flex-1"
          key={category.title}
          title={category.title}
          image={category.image}
          selected={category.select}
          onClick={() => dispatch(selectCategory(category))}
          isLoading={false} // Explicitly set isLoading to false for loaded cards
        />
      ))}
    </div>
  );
};
export default Category;
