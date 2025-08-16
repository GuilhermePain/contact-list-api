import { z } from 'zod'

export const contactSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'Nome inválido'),
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido.'),
    phone: z.string().min(1, 'Telefone é obrigatório.').regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, 'Telefone inválido')
});

export const updateContactSchema = z.object({
    name: z.string().regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'Nome inválido').optional(),
    email: z.string().email('E-mail inválido.').optional(),
    phone: z.string().min(1, 'Telefone é obrigatório').regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, 'Telefone inválido').optional()
}).refine((data) => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser informado.'
});