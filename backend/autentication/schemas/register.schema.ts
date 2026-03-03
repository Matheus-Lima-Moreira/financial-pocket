import { MESSAGE } from "@/backend/shared/enum/messages";
import { z } from "zod";

const userSchema = z.object({
  name: z
    .string()
    .min(2, MESSAGE.authentication.NAME_MIN)
    .max(100, MESSAGE.authentication.NAME_MAX),
  
  email: z
    .string()
    .email(MESSAGE.authentication.EMAIL_INVALID),
  
  password: z
    .string()
    .min(6, MESSAGE.authentication.PASSWORD_MIN)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      MESSAGE.authentication.PASSWORD_PATTERN
    ),
});

const organizationSchema = z.object({
  name: z
    .string()
    .min(2, MESSAGE.authentication.ORGANIZATION_NAME_MIN)
    .max(200, MESSAGE.authentication.ORGANIZATION_NAME_MAX),
  cellphone: z
    .string()
    .regex(
      /^[1-9]{2}9[0-9]{8}$/,
      MESSAGE.authentication.CELLPHONE_FORMAT
    )
    .length(11, MESSAGE.authentication.CELLPHONE_LENGTH),
});

export const registerSchema = z.object({
  organization: organizationSchema,
  
  user: userSchema,
  
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: MESSAGE.authentication.TERMS_REQUIRED,
    }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

