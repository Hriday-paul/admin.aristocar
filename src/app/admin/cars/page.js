import ProductsContainer from "./_components/ProductsContainer"; 

export const metadata = {
  title: "All cars",
  description:
    "Add or delete categories and see details about existing categories",
};

export default function page() {
  return <ProductsContainer />;
}
