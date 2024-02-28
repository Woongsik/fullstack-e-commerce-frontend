import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProductList from '../../components/productList/ProductList';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { Product } from '../../misc/types/Product';

// const wrapper = ({children}: PropsWithChildren) => 
//   <Provider store={store}>{children}</Provider>

// describe('test ProductList component', () => {
//   test('Should render all products from the api', async () => {
//     const products: Product[] = [];
//     render(<ProductList products={products}/>, { wrapper: wrapper }) // --> HTML document in the test screen
//     /*
//       findBy: return a promise
//       getBy: sync -> return component if found & raise error if not
//       queryBy: sync -> return component if found / return null if not
//     */

//     // let's say, it has 10 products and delete button
//     expect(await screen.queryAllByText('delete')).toHavelength(10)
//   })

  // test('Should delete 1 product on button click', async () => {
  //   const products: Product[] = [];
  //   render(<ProductList products={products} />, { wrapper: wrapper });
  //   const deleteBtns = await screen.findAllByText('delete');
  //   fireEvent.click(deleteBtns[0]);
  //   await waitFor(async () => expect(await screen.findAllByText("text")).toHaveLength(1));
    
  // });
// })

export const productQuery = {} // Remove this later

