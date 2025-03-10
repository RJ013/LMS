import mongoose,{Document,Model,Schema} from "mongoose";

export interface INotification extends Document{
    title:string;
    message:string;
    status:string;
    userId:string;
}

const notificationSchema = new Schema<INotification>({
    title:{
        type:String,
        required:false
    },
    message:{
        type:String,
        required:false,
    },
    status:{
        type:String,
        required:true,
        default:"unread"
    },

},{timestamps:true});

const notificationModel : Model<INotification> = mongoose.model('Notification',notificationSchema);
export default notificationModel;