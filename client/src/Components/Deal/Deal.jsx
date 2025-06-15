import DealCard from '../common/Deal-card/DealCard';

const Deal = () => {
  return (
    <>
      <div className="flex w-full gap-8 justify-between items-center">
        <DealCard
          className="flex-1"
          title="All deserts"
          description="Deserty"
          image="/asset/images/ice-cream.svg"
          backgroundColor="var(--primary-light)"
          offer="20% OFF"
          dealColor="var(--primary-default)"
        />
        <DealCard
          className="flex-1"
          title="Big Burgers"
          description="Fooddies"
          offer="50% OFF"
          image="/asset/images/burger-deal.svg"
          backgroundColor="var(--secondary-light)"
          dealColor="var(--secondary-default)"
        />
      </div>
    </>
  );
};

export default Deal;
