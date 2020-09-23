import * as mongoose from 'mongoose';

import { Model, Document } from 'mongoose';

export const UserSchema =  new mongoose.Schema({
    username: {type: String, require:true},
    firstName: {type: String,require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true},
    password :{type: String,require: true},
}, {collection: 'User'});

export interface User extends mongoose.Document {
    username: string,
    firstName: string,
    lastName:string,
    email:string,
    password: string,
}

