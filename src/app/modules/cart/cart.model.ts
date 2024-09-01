import { model, Schema } from 'mongoose';
import { TCart } from './cart.interface';

const cartSchema = new Schema<TCart>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const CartModel = model<TCart>('cart', cartSchema);
export default CartModel;
