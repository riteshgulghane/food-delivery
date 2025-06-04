import "./CategoryCard.css";

const CategoryCard = ({ title, image, className, selected }) => {
  return (
    <div className={`category-card ${className} ${selected ? "selected" : ""}`}>
      <img src={image} alt={title} />
      <h2 className="category-card-title">{title}</h2>
    </div>
  );
};

export default CategoryCard;
