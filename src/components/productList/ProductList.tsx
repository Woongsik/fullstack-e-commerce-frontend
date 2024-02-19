import Product from '../../misc/types/Product';

type Props = {
  products: Product[]
}

export default function ProductList(props: Props) {
  const { products } = props;

  return (
    <div>
      <ol>
        {products.map((product: Product) => 
          <li key={product.id}>{product.title}</li>
        )}
      </ol>
    </div>
  )
}
