import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string()
        .min(1, 'Nome é obrigatório.').regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'Nome inválido'),

    email: z.string()
        .min(1, 'E-mail é obrigatório.')
        .email('E-mail inválido.'),

    password: z.string()
        .min(1, 'Senha é obrigatória.')
        .min(8, 'Senha deve ter no mínimo 6 caracteres.')
});

export const updateUserSchema = z.object({
    name: z.string().regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'Nome inválido').optional(),
    email: z.string().email('E-mail inválido.').optional()
}).refine((data) => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser informado.'
});