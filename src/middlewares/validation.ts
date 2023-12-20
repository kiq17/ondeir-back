import { RequestHandler } from "express";
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup";

type Property = "body" | "query" | "params" | "header"

type getSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;

type getAllSchemas = (getSchema: getSchema) => Partial<AllSchemas>

type AllSchemas = Record<Property, ObjectSchema<any>>

type Validation = (getAllSchemas: getAllSchemas) => RequestHandler

export const validation: Validation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas(schema => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.validateSync(req[key as Property], { abortEarly: false });
          
        } catch (error) {
            const yupError = error as ValidationError;
            const objectErros: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if (!error.path) return;

                objectErros[error.path + "Error"] = error.message;
            });

            errorsResult[key] = objectErros;
        }
    });

    if(Object.entries(errorsResult).length === 0){
        return next();
    } else{
        res.status(400).json({
            error: errorsResult
        });
    }
};