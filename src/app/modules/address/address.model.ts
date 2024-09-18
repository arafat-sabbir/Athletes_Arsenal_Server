import { model, Schema } from 'mongoose';
import { TAddress } from './address.interface';

const addressSchema = new Schema<TAddress>({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  area: { type: String, required: true },
  buildingNo: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  region: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const AddressModel = model<TAddress>('Address', addressSchema);
export default AddressModel;