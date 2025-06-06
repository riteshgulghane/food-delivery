import "./Category.css";
import CategoryCard from "../common/Category-Card/CategoryCard";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../Store/Category.store";

const Category = () => {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.category.category);

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-8 mt-8">
      {categoryData.map((category) => (
        <CategoryCard
          className="flex-1"
          key={category.title}
          title={category.title}
          image={category.image}
          selected={category.select}
          onClick={() => dispatch(selectCategory(category))}
        />
      ))}
    </div>
  );
};
export default Category;
