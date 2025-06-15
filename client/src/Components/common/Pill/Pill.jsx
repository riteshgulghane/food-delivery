import './Pill.css';

const Pill = ({ text, className, icon }) => {
  return (
    <div className={`pill flex gap-2 items-center py-1 px-2 rounded-full ${className}`}>
      {icon && <img className="w-2 h-2" src={icon} alt={text} />}
      <span>{text}</span>
    </div>
  );
};

export default Pill;
