import { getEmployeeById } from '@/lib/data/employees'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { notFound } from 'next/navigation'
import { use } from 'react'

export default function EmployeePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const employee = use(getEmployeeById(parseInt(id)))

  if (!employee) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{employee.name}</h1>
          <p className="text-sm text-gray-500">{employee.role}</p>
        </div>
        <div className="space-x-4">
          <Button variant="outline" asChild>
            <Link href={`/employees/${employee.id}/edit`}>Edit Employee</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1">{employee.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1">{employee.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1">{employee.role}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Joined</dt>
                <dd className="mt-1">
                  {formatDistanceToNow(new Date(employee.createdAt), { addSuffix: true })}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee.orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        #{order.id}
                      </Link>
                    </TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>₹{order.totalAmount}</TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(order.orderDate), { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                ))}
                {employee.orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                      No orders yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
