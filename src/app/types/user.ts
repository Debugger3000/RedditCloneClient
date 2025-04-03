

export type UserRegister = {
    status: boolean;
}

export type UserRegisterData = Partial<{
    email: String | null;
    password: String | null;
    username: String | null;
}>

export type UserLoginData = Partial<{
    email: String | null;
    password: String | null;
}>