import { z, ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const formattedErrors = z.formatError(error);

            return res.status(400).json(formattedErrors);
        }

        return res.status(500).json({
            message: "Houve um erro interno, tente novamente."
        });
    }
};