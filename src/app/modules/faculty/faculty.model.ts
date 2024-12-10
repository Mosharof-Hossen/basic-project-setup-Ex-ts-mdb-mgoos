import { Schema } from "mongoose";
import { TFaculty } from "./faculty.interface";

const facultySchema = new Schema<TFaculty>({
    id: {
        type:String,
        required: [true,"Id is required"]
    }
})