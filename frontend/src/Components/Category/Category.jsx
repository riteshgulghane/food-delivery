import "./Category.css";
import CategoryCard from "../common/Category-Card/CategoryCard";
import { CategoryCardList } from "../Utils/Categories";
import { useState } from "react";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);

  return (
    <div className="flex gap-8 mt-8">
      {CategoryCardList.map((category) => (
        <CategoryCard
          className="flex-1"
          key={category.title}
          title={category.title}
          image={category.image}
          selected={category.selected}
          onClick={() => setSelectedCategory(category.title)}
        />
      ))}
    </div>
  );
};
export default Category;
