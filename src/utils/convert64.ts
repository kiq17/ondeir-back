
interface LoginPayload{
    id: string;
}

export function authToLoginPayload(authorization: string): LoginPayload{
    const tokenSplited = authorization.split(".");

    if(tokenSplited.length < 3 || !tokenSplited[1]){
        throw new Error("Erro interno")
    }

    return JSON.parse(Buffer.from(tokenSplited[1],"base64").toString());
}