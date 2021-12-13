export interface User {
    _id: string;
    name: string;
    userName: string;
    email: string;
    pswd: string;
    pswdRepeat?: string;
    dateOfBirth: string;
    paymentMethodId: string;
    subModelId: string;
    country: string;
}