import { z } from 'zod'

// Customer schemas
export const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email').optional().nullable(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().optional().nullable()
})

// Order schemas
export const orderItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
  price: z.number().int().positive('Price must be positive')
})

export const orderSchema = z.object({
  customerId: z.number().int().positive(),
  employeeId: z.number().int().positive().optional().nullable(),
  dueDate: z.string().datetime().optional().nullable(),
  status: z.enum(['PENDING', 'PAID']).default('PENDING'),
  totalAmount: z.number().int().positive(),
  notes: z.string().optional().nullable(),
  items: z.array(orderItemSchema),
  images: z.array(z.instanceof(Uint8Array)).optional()
})

// Employee schemas
export const employeeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  role: z.enum(['ADMIN', 'EMPLOYEE']).default('EMPLOYEE')
})
