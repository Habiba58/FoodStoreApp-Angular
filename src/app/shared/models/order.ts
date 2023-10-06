import { cartItem } from "./cartItem";
import {LatLng} from "leaflet"
export class Order{
    id!:number;
    items!: cartItem[];
    totalPrice!:number;
    name!: string;
    address!: string;
    addressLatLong?:LatLng;
    paymentId!: string;
    createdAt!: string;
    status!: string;
}