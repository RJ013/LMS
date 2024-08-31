import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrder extends Document {
    courseId: string;
    userId: string;
    payment_info: object;
}

const orderSchema = new Schema<IOrder>({
    courseId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    payment_info: {
        type: Object,
    },
}, { timestamps: true });

// Check if the model exists before creating it
const OrderModel: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default OrderModel;
