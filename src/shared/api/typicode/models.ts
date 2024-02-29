export type Auth = {
    email: string, password: string, token?:string
};
export type Registration = {
    email: string;
    password: string;
    firstName:string;
    lastName:string;
    remember?: string;
    middleName?:string;
};
export type User = {
    id:number,
    firstName: string;
    lastName: string;
    middleName?:string;
    email:string;
    registrationDate?:string
    admin: boolean
    experience?:string
    programmingLanguages?:string
    frameworks?:string
    additionalInfo?:string
};

