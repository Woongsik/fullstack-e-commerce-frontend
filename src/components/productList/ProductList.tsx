import Product from '../../misc/types/Product';

type Props = {
  products: Product[];
}

export default function ProductList(props: Props) {
  const { products } = props;

  return (
    <div>
    { products.length === 0 ? 
      <h1>No data! Please check all the criteria...</h1>
      :
      <ol>
        {products.map((product: Product) => 
          <li key={product.id}>{product.title}/{product.price}</li>
        )}
      </ol>
    }
    </div>
  )
}
