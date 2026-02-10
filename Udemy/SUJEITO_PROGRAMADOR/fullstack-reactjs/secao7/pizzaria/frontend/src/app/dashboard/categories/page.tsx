import { getToken } from "@/lib/auth";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus, Tags } from "lucide-react";
import { CategoryType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Categories() {
    const token = await getToken();
    const categories = await apiClient<CategoryType[]>("/category", {
        token: token!,
    })

    console.log(categories)
    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">Categorias</h1>
                    <p className="text-gray-400 text-sm sm:text-base mt-1">Gerencie suas categorias de produtos</p>
                </div>

                <Button>
                    <Plus className="size-5" />
                    Nova Categoria
                </Button>
            </div>

            {categories.length !== 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 ">
                    {categories.map(category => (
                        <Card key={category.id} className="p-4 bg-app-card border-app-border transition-shadow hover:shadow-md text-white">
                            <CardHeader>
                                <CardTitle className="flex items-center items-center text-base gap-2 text-white">
                                    <Tags className="size-5" />
                                    {category.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-sm">ID: {category.id}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div >
    )
}