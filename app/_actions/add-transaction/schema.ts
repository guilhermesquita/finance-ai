import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { z } from "zod";

export const upsertTransactionSchema = z.object({
  name: z.string().min(1).trim(),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType, {
    required_error: "O Tipo é obrigatório",
  }),
  category: z.nativeEnum(TransactionCategory),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  date: z.date(),
});
