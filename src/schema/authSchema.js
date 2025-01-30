import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

export const forgotPassSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" }),
});

export const otpSchema = z.object({
  otp: z
    .string({ required_error: "OTP is required" })
    .min(1, { message: "OTP is required" }),
});

export const resetPassSchema = z.object({
  newPassword: z
    .string({ required_error: "New password is required" })
    .min(1, { message: "New password is required" }),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .min(1, { message: "Confirm Password is required" }),
});

export const addFreeAccessSchema = z.object({
  expired_date: z
    .string({ required_error: "expired date is required" })
    .min(1, { message: "expired date is required" }),
  max_list: z
    .string({ required_error: "max list is required" })
    .min(1, { message: "max list is required" }),
});

export const addPackageSchema = z.object({
  name: z
    .string({ required_error: "package name is required" })
    .min(1, { message: "package name is required" }),
  price: z
    .string({ required_error: "price is required" })
    .min(1, { message: "price is required" }),
  description: z
    .string({ required_error: "description is required" })
    .min(1, { message: "description is required" }),
  limit: z
    .string({ required_error: "limit is required" })
    .min(1, { message: "limit is required" }),
  duration: z
    .string({ required_error: "duration is required" })
    .min(1, { message: "duration is required" }),
});

export const addAprovalSchema = z.object({
  vat_type: z
    .string({ required_error: "vat_type is required" })
});


export const addBrandSchema = z.object({
  brand_name: z
    .string({ required_error: "brand name is required" })
    .min(1, { message: "brand name is required" }),
  isHome: z.boolean().optional(),
});

export const addModelSchema = z.object({
  brand: z
    .string({ required_error: "brand is required" })
    .min(1, { message: "brand is required" }),

  model_name: z
    .string({ required_error: "model name is required" })
    .min(1, { message: "model name is required" }),

});

export const addMostWantedSchema = z.object({
  description: z
    .string({ required_error: "description is required" })
    .min(10, { message: "description min 10 character required" }),
});

export const printAllPaymentsSchema = z.object({
  date: z
    .string({ required_error: "year & month is required" }),
});
