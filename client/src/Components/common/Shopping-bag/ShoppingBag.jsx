import './ShoppingBag.css';

export const ShoppingBagVariant = {
  DEFAULT: 'default',
  CART: 'cart',
  RESTAURANT: 'restaurant',
  LOADING: 'loading',
};

const ShoppingBagVariantStyles = {
  [ShoppingBagVariant.DEFAULT]: '',
  [ShoppingBagVariant.CART]: 'cart',
  [ShoppingBagVariant.RESTAURANT]: 'restaurant',
};

const ShoppingBag = ({ count, variant = ShoppingBagVariant.CART }) => {
  return (
    <div className={`relative shopping-bag ${ShoppingBagVariantStyles[variant]}`}>
      <img
        src={
          variant === ShoppingBagVariant.LOADING || count === 0
            ? '/asset/icons/shopping_bag_disabled.svg'
            : '/asset/icons/shopping bag.svg'
        }
        alt="Shopping Bag"
      />
      {count > 0 && (
        <span
          className={`shopping-bag-badge absolute  bg-primary-default flex justify-center items-center  ${ShoppingBagVariantStyles[variant]}`}
        >
          {count}
        </span>
      )}
    </div>
  );
};

export default ShoppingBag;
