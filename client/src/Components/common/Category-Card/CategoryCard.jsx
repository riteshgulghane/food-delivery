import "./CategoryCard.css";

const CategoryCard = ({ title, image, className, selected, ...props }) => {
  return (
    <div className={`category-card ${className} ${selected ? "selected" : ""}`} {...props}>
      <img src={image} alt={title} />
      <h2 className="category-card-title">{title}</h2>
    </div>
  );
};

export default CategoryCard;
