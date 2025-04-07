import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getStockOverview } from "@/lib/db"
import ProductsTable from "@/components/products-table"
import StockChart from "@/components/stock-chart"
import RevenueChart from "@/components/revenue-chart"
import { Header } from "@/components/layout/header"
import { MobileNav } from "@/components/layout/mobile-nav"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileNav />
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Link href="/products/add">
            <Button className="btn-animated">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
        <Suspense fallback={<div>Loading overview...</div>}>
          <OverviewCards />
        </Suspense>
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="products" className="space-y-4">
            <Suspense fallback={<div>Loading products...</div>}>
              <ProductsTable />
            </Suspense>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Stock Distribution</CardTitle>
                  <CardDescription>Current stock levels by category</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <StockChart />
                </CardContent>
              </Card>
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                  <CardDescription>Total revenue distribution</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <RevenueChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

async function OverviewCards() {
  const { totalProducts, totalStock, totalSold, totalRevenue } = await getStockOverview()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
          <p className="text-xs text-muted-foreground">Unique products in inventory</p>
        </CardContent>
      </Card>
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Items in Stock</CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStock}</div>
          <p className="text-xs text-muted-foreground">Total quantity of all products</p>
        </CardContent>
      </Card>
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSold}</div>
          <p className="text-xs text-muted-foreground">Total quantity sold to date</p>
        </CardContent>
      </Card>
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <div className="h-4 w-4 text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Revenue from all sales</p>
        </CardContent>
      </Card>
    </div>
  )
}

