const joi = require("joi");
const {CustomResponse} = require('../../utils/response')
    // validasyonlar : 
    // min : minimum karakter
    // required zorunlu olması
    // max : maksimum karakter
    // trim : sağ ve solda ki boşlukları siler.

class AuthValidation {
    constructor(){}
    static register = async (req,res,next) => {
        try {
            await joi.object({
                CompanyName: joi.string().trim().min(1).required().messages({
                    "string.base": "İsim alanı normal metin olmalıdır.",
                    "string.empty": "isim alanı boş olamaz",
                    "string.min": "isim alanı en az 1 karakter olmalıdır.",
                    "string.required": "isim alanı zorunludur.",
                }),
                Mail: joi.string().email().trim().min(3).max(50).required().messages({
                    "string.base": "Email alanı normal metin olmalıdır.",
                    "string.empty": "Email alanı boş olamaz",
                    "string.email": "Lütfen geçerli bir email giriniz.",
                    "string.min": "Email alanı en az üç karakter olmalıdır.",
                    "string.max": "Email alanı en fazla 100 karakterden oluşabilir.",
                    "string.required": "Email alanı zorunludur.",
                }),
                Password: joi.string()
                .trim()
                .min(6)
                .max(36)
                .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>\\-]).*$"))
                .required()
                .messages({
                    "string.base": "Şifre alanı normal metin olmalıdır.",
                    "string.empty": "Şifre alanı boş olamaz",
                    "string.min": "Şifre alanı en az 6 karakter olmalıdır.",
                    "string.max": "Şifre alanı en fazla 36 karakterden oluşabilir.",
                    "string.pattern.base": "Şifre en az bir büyük harf ve bir özel karakter (örn: !, -, $, vs.) içermelidir.",
                    "string.required": "Şifre alanı zorunludur.",
                }),
                Role: joi.number().integer().required().messages({
                    "number.base": "Rol alanı sayı olmalıdır.",
                    "number.integer": "Rol alanı tam sayı (integer) olmalıdır.",
                    "any.required": "Rol alanı zorunludur.",
                })
            }).unknown(true).validateAsync(req.body);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        next()
    }


    static login = async (req,res,next) => {
        try {
            await joi.object({
                Mail: joi.string().email().trim().min(3).max(50).required().messages({
                    "string.base": "Email alanı normal metin olmalıdır.",
                    "string.empty": "Email alanı boş olamaz",
                    "string.email": "Lütfen geçerli bir email giriniz.",
                    "string.min": "Email alanı en az üç karakter olmalıdır.",
                    "string.max": "Email alanı en fazla 100 karakterden oluşabilir.",
                    "string.required": "Email alanı zorunludur.",
                }), 
                Password: joi.string()
                .trim()
                .min(6)
                .max(36)
                .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>\\-]).*$"))
                .required()
                .messages({
                    "string.base": "Şifre alanı normal metin olmalıdır.",
                    "string.empty": "Şifre alanı boş olamaz",
                    "string.min": "Şifre alanı en az 6 karakter olmalıdır.",
                    "string.max": "Şifre alanı en fazla 36 karakterden oluşabilir.",
                    "string.pattern.base": "Şifre en az bir büyük harf ve bir özel karakter (örn: !, -, $, vs.) içermelidir.",
                    "string.required": "Şifre alanı zorunludur.",
                })
            }).unknown(true).validateAsync(req.body)
            next()
        } catch (error) {
             return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

     static update = async (req,res,next) => {
        try {
            await joi.object({
                 Mail: joi.string().email().trim().min(3).max(50).required().messages({
                    "string.base": "Email alanı normal metin olmalıdır.",
                    "string.empty": "Email alanı boş olamaz",
                    "string.email": "Lütfen geçerli bir email giriniz.",
                    "string.min": "Email alanı en az üç karakter olmalıdır.",
                    "string.max": "Email alanı en fazla 100 karakterden oluşabilir.",
                    "string.required": "Email alanı zorunludur.",
                }), 
                Password: joi.string()
                .required()
                .messages({
                    "string.empty": "Şifre alanı boş olamaz",
                    "string.required": "Şifre alanı zorunludur.",
                }),
                NewPassword: joi.string()
                .trim()
                .min(6)
                .max(36)
                .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>\\-]).*$"))
                .required()
                .messages({
                    "string.base": "Şifre alanı normal metin olmalıdır.",
                    "string.empty": "Şifre alanı boş olamaz",
                    "string.min": "Şifre alanı en az 6 karakter olmalıdır.",
                    "string.max": "Şifre alanı en fazla 36 karakterden oluşabilir.",
                    "string.pattern.base": "Şifre en az bir büyük harf ve bir özel karakter (örn: !, -, $, vs.) içermelidir.",
                    "string.required": "Şifre alanı zorunludur.",
                })
            }).unknown(true).validateAsync(req.body)
        } catch (error) {
             return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        next()
    }
}

module.exports = { AuthValidation };