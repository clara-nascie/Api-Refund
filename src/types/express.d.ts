//esse arquivo serve para tipar o request, todas as rotas que estiverem protegidas
//pelo middleware ensureAuthentication vão ter acesso a essas informações

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}
