import './CategoryCard.css';

const CategoryCard = ({ title, image, className, selected, isLoading, ...props }) => {
  if (isLoading) {
    return (
      <div className={`category-card ${className} shimmer-card`} {...props}>
        <div className="shimmer-image"></div>
        <div className="shimmer-title"></div>
      </div>
    );
  }

  return (
    <div className={`category-card ${className} ${selected ? 'selected' : ''}`} {...props}>
      <img src={image} alt={title} />
      <h2 className="category-card-title">{title}</h2>
    </div>
  );
};

export default CategoryCard;
