import { NextFunction } from "express"

export type DecodedTokenType={
    userId:string,
    iat:Number,
    exp:Number
}