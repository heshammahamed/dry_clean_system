export type retutnFromValidate = {
    admin : boolean ,
    shopId : string ,
}

export type order = {
    id : string,
    total_price : number,
    prepaid : number,
    done  : boolean,
    deliver_at : string,
    customerId : string,
    shopID : string,
    delevired : boolean
}

export type orderAndcustomerData = {
    id : string,
    total_price : number,
    prepaid : number,
    done  : boolean,
    deliver_at : string,
    customerId : string,
    shopID : string,
    delevired : boolean,
    name : string,
    phonenumber : string
}
export type services = {
    id : string,
    name : string,
    price : number,
    catego  : number,
}

type cursor = {
    delivery_at: String,
    id: string
}