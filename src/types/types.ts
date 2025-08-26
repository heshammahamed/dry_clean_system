export type retutnFromValidate = {
    admin : boolean ,
    shopId : string ,
}

export type order = {
    id : string,
    total_price : number,
    prepaid : number,
    status_  : boolean,
    day_receive : string,
    hour_receive  : string,
    customerId : string,
    shopID : string,
    delevired : boolean
}