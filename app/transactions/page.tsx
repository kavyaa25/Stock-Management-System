"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProducts, addTransaction, type Product } from "@/lib/db"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TransactionsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("1")
  const [error, setError] = useState<string>("")
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Failed to load products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleProductChange = (value: string) => {
    setSelectedProduct(value)
    setError("")
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value)
    setError("")
  }

  const handleAddTransaction = async () => {
    // Validate inputs
    if (!selectedProduct) {
      setError("Please select a product")
      return
    }

    const quantityNum = Number.parseInt(quantity)
    if (isNaN(quantityNum) || quantityNum <= 0) {
      setError("Quantity must be a positive number")
      return
    }

    const product = products.find((p) => p.id === selectedProduct)
    if (!product) {
      setError("Selected product not found")
      return
    }

    if (quantityNum > product.quantityInStock) {
      setError(`Not enough stock. Only ${product.quantityInStock} available.`)
      return
    }

    setProcessing(true)
    try {
      await addTransaction({
        productId: selectedProduct,
        quantitySold: quantityNum,
        totalPrice: product.price * quantityNum,
      })

      // Refresh product list to update stock quantities
      const updatedProducts = await getProducts()
      setProducts(updatedProducts)

      // Reset form
      setSelectedProduct("")
      setQuantity("1")
    } catch (error) {
      console.error("Failed to add transaction:", error)
      setError("Failed to process transaction. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex flex-1 items-center gap-2">
          <h1 className="text-xl font-semibold">Stock Management System</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Record Sale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select value={selectedProduct} onValueChange={handleProductChange} disabled={loading || processing}>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id} disabled={product.quantityInStock === 0}>
                        {product.name} - ${product.price.toFixed(2)} ({product.quantityInStock} in stock)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  disabled={processing}
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button
                onClick={handleAddTransaction}
                disabled={loading || processing || !selectedProduct}
                className="w-full"
              >
                {processing ? (
                  "Processing..."
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Record Sale
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Stock Products</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading products...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">In Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products
                      .filter((p) => p.quantityInStock < 10)
                      .sort((a, b) => a.quantityInStock - b.quantityInStock)
                      .map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell className="text-right">
                            <span
                              className={
                                product.quantityInStock === 0
                                  ? "text-destructive font-bold"
                                  : product.quantityInStock < 5
                                    ? "text-destructive"
                                    : ""
                              }
                            >
                              {product.quantityInStock}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    {products.filter((p) => p.quantityInStock < 10).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center">
                          No low stock products
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

