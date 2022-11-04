import mongoose from "mongoose";
import md5 from 'md5';

export interface EmployeeI {
    avatar: String,
    name: String,
    email: String,
    surname: String,
    password: String
}

const employeeSchema = new mongoose.Schema<EmployeeI>({    
    avatar: {
        type: String,
        default: "https://www.gravatar.com/avatar/" + md5("default") + "?d=mp"
    },

    name: {
        type: String,
        required: true,
        min: 2,
        max: 64
    },

    surname: {
        type: String,
        required: true,
        min: 2,
        max: 64
    },

    password: {
        type: String,
        required: true,
        max: 1024
    },

    email: {
        type: String,
        required: true,
        max: 512
    }
});

employeeSchema.pre("save", function() {
    this.avatar = `https://avatars.dicebear.com/api/initials/${this.email.slice(0, 2)}${md5(this.email.toString())}.svg`;
});

employeeSchema.pre("updateOne", function() {
    this.avatar = `https://avatars.dicebear.com/api/initials/${this.email.slice(0, 2)}${md5(this.email.toString())}.svg`;
});

export const Employee = mongoose.model<EmployeeI>(
    "Employee", 
    employeeSchema
);