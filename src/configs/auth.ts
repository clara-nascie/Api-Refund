export const authConfig = {
    jwt: {
        secret: "minha-senha-secreta-para-gerar-tokens",
        expiresIn: '1d',
    }
} as const;