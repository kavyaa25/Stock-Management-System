// This is a mock database implementation
// In a real application, you would use a real database like MongoDB or PostgreSQL

export type Product = {
  id: string
  name: string
  category: string
  price: number
  quantityInStock: number
  itemsSold: number
  description: string
  createdAt: Date
}

export type Transaction = {
  id: string
  productId: string
  quantitySold: number
  totalPrice: number
  date: Date
}

// Initial mock data
let products: Product[] = [
  {
    id: "1",
    name: "Laptop",
    category: "Electronics",
    price: 999.99,
    quantityInStock: 15,
    itemsSold: 7,
    description: "High-performance laptop with 16GB RAM and 512GB SSD",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Smartphone",
    category: "Electronics",
    price: 699.99,
    quantityInStock: 25,
    itemsSold: 12,
    description: "Latest smartphone with 128GB storage and 5G capability",
    createdAt: new Date("2023-02-10"),
  },
  {
    id: "3",
    name: "Office Chair",
    category: "Furniture",
    price: 199.99,
    quantityInStock: 8,
    itemsSold: 3,
    description: "Ergonomic office chair with lumbar support",
    createdAt: new Date("2023-03-05"),
  },
  {
    id: "4",
    name: "Coffee Maker",
    category: "Appliances",
    price: 89.99,
    quantityInStock: 12,
    itemsSold: 9,
    description: "Programmable coffee maker with 12-cup capacity",
    createdAt: new Date("2023-03-15"),
  },
  {
    id: "5",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 149.99,
    quantityInStock: 20,
    itemsSold: 15,
    description: "Noise-cancelling wireless headphones with 30-hour battery life",
    createdAt: new Date("2023-04-01"),
  },
  {
    id: "6",
    name: "Desk Lamp",
    category: "Furniture",
    price: 49.99,
    quantityInStock: 18,
    itemsSold: 7,
    description: "LED desk lamp with adjustable brightness",
    createdAt: new Date("2023-04-10"),
  },
]

const transactions: Transaction[] = [
  {
    id: "1",
    productId: "1",
    quantitySold: 2,
    totalPrice: 1999.98,
    date: new Date("2023-05-15"),
  },
  {
    id: "2",
    productId: "2",
    quantitySold: 3,
    totalPrice: 2099.97,
    date: new Date("2023-05-16"),
  },
  {
    id: "3",
    productId: "3",
    quantitySold: 1,
    totalPrice: 199.99,
    date: new Date("2023-05-17"),
  },
]

// Simulate delay for async operations
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Product CRUD operations
export async function getProducts(): Promise<Product[]> {
  await delay(500) // Simulate network delay
  return [...products]
}

export async function getProduct(id: string): Promise<Product | null> {
  await delay(300)
  return products.find((p) => p.id === id) || null
}

export async function addProduct(product: Omit<Product, "id" | "itemsSold" | "createdAt">): Promise<Product> {
  await delay(500)
  const newProduct: Product = {
    ...product,
    id: (products.length + 1).toString(),
    itemsSold: 0,
    createdAt: new Date(),
  }
  products.push(newProduct)
  return newProduct
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id" | "createdAt">>,
): Promise<Product | null> {
  await delay(500)
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null

  products[index] = {
    ...products[index],
    ...updates,
  }

  return products[index]
}

export async function deleteProduct(id: string): Promise<boolean> {
  await delay(500)
  const initialLength = products.length
  products = products.filter((p) => p.id !== id)
  return products.length < initialLength
}

// Transaction operations
export async function addTransaction(transaction: Omit<Transaction, "id" | "date">): Promise<Transaction> {
  await delay(500)

  // Update product stock and sales
  const productIndex = products.findIndex((p) => p.id === transaction.productId)
  if (productIndex !== -1) {
    products[productIndex].quantityInStock -= transaction.quantitySold
    products[productIndex].itemsSold += transaction.quantitySold
  }

  const newTransaction: Transaction = {
    ...transaction,
    id: (transactions.length + 1).toString(),
    date: new Date(),
  }

  transactions.push(newTransaction)
  return newTransaction
}

// Analytics and overview
export async function getStockOverview() {
  await delay(300)

  const totalProducts = products.length
  const totalStock = products.reduce((sum, product) => sum + product.quantityInStock, 0)
  const totalSold = products.reduce((sum, product) => sum + product.itemsSold, 0)
  const totalRevenue = products.reduce((sum, product) => sum + product.itemsSold * product.price, 0)

  return {
    totalProducts,
    totalStock,
    totalSold,
    totalRevenue,
  }
}

export async function getCategoryData() {
  await delay(300)

  const categories = [...new Set(products.map((p) => p.category))]

  const stockByCategory = categories.map((category) => {
    const categoryProducts = products.filter((p) => p.category === category)
    const stockCount = categoryProducts.reduce((sum, p) => sum + p.quantityInStock, 0)
    return { category, count: stockCount }
  })

  const revenueByCategory = categories.map((category) => {
    const categoryProducts = products.filter((p) => p.category === category)
    const revenue = categoryProducts.reduce((sum, p) => sum + p.itemsSold * p.price, 0)
    return { category, revenue }
  })

  return {
    stockByCategory,
    revenueByCategory,
  }
}

// Search and filter
export async function searchProducts(query: string): Promise<Product[]> {
  await delay(300)
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.category.toLowerCase().includes(lowercaseQuery),
  )
}

export async function filterProductsByCategory(category: string): Promise<Product[]> {
  await delay(300)
  return products.filter((p) => p.category === category)
}

