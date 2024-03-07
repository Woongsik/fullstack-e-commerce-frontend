import React from 'react'
import { Product } from '../../../misc/types/Product'

type Props = {
  product: Product
}
export default function ProductEdit(props: Props) {
  const { product } = props;
  
  return (
    <div>ProductEdit</div>
  )
}
