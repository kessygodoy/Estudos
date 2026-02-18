import { getToken } from "@/lib/auth";
import { apiClient } from "@/lib/api";
import { ProductForm } from "@/components/dashboard/product-form";
import { CategoryType, ProductType } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

export default async function Products() {
    const token = await getToken();

    // Fetch categories and products
    const categories = await apiClient<CategoryType[]>("/category", {
        token: token!,
    });

    let products: ProductType[] = [];
    try {
        products = await apiClient<ProductType[]>("/products", {
            token: token!,
        });
    } catch (err) {
        console.log("Failed to fetch products", err);
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Produtos</h1>
                    <p className="text-gray-400 text-sm sm:text-base mt-1">
                        Gerencie os produtos do seu cardápio
                    </p>
                </div>

                <ProductForm categories={categories} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 && (
                    <div className="flex flex-col items-center justify-center col-span-full text-gray-400 mt-10 p-10 bg-app-card/50 rounded-lg border border-dashed border-app-border">
                        <ShoppingBag className="h-10 w-10 mb-4 opacity-50" />
                        <p>Nenhum produto cadastrado.</p>
                    </div>
                )}

                {products.map((product) => (
                    <Card key={product.id} className="bg-app-card border-app-border text-white overflow-hidden hover:border-brand-primary/50 transition-colors group">
                        <div className="h-40 w-full bg-app-border/10 relative overflow-hidden">
                            {product.banner ? (
                                <img
                                    src={product.banner}
                                    alt={product.name}
                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gray-800">
                                    <ShoppingBag className="h-10 w-10 text-gray-500" />
                                </div>
                            )}
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold truncate">{product.name}</CardTitle>
                            <CardDescription className="text-gray-400 truncate line-clamp-2">
                                {product.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold text-brand-primary text-lg">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product.price))}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}