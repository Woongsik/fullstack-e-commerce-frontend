import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { Category, CategoryBase } from "../../misc/types/Category";
import { baseUrl } from "./ServerUtil";

export const mockCategories: Category[] = [
  {
    _id: 'category_1',
    title: 'Category1',
    image: 'http://category_1.png'
  },
  {
    _id: 'category_2',
    title: 'Category2',
    image: 'http://category_2.png'
  },
  {
    _id: 'category_3',
    title: 'Category3',
    image: 'http://category_3.png'
  },
] 

export const handler = [
  http.get(`${baseUrl}/api/v1/categories`, async () => {   
    return HttpResponse.json(mockCategories, { status: 200 });  
  }),
  http.post(`${baseUrl}/api/v1/categories`, async ({ request }) => {
    const categoryInfo = await request.json() as CategoryBase;
    const newCategory: Category = {
      ...categoryInfo,
      _id: `category_${mockCategories.length}`
    }

    return HttpResponse.json(newCategory, { status: 200 });  
  }),
  http.put(`${baseUrl}/api/v1/categories/:categoryId`, async ({ request, params }) => {   
    const categoryId: string = params.categoryId as string;
    const categoryInfo: CategoryBase = await request.json() as CategoryBase;

    const updatedCategory: Category = {
      ...categoryInfo,
      _id: categoryId
    }

    return HttpResponse.json(updatedCategory, { status: 201 });  
  }),
  http.delete(`${baseUrl}/api/v1/categories/:categoryId`, async ({ params }) => {   
    const categoryId: string = params.categoryId as string;
    const index: number = mockCategories.findIndex((c: Category) => c._id === categoryId);
    mockCategories.splice(index, 1);

    return HttpResponse.json({}, { status: 204 });  
  }),
];

export const categoryServer = setupServer(...handler);