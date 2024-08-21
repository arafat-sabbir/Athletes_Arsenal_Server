import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  category: { type: String, required: true },
  stockCount: { type: Number, required: true },
});

const ProductModel = model<TProduct>('Product', productSchema);
export default ProductModel;
