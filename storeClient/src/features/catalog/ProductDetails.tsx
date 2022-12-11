import { getProductById } from "../../app/utils/api";

const ProductDetails: React.FC = () => {
  return <div>ProductDetails</div>;
};

export default ProductDetails;

export const loader = ({ params }: any) => {
  const { id } = params;
  return getProductById(id);
};
