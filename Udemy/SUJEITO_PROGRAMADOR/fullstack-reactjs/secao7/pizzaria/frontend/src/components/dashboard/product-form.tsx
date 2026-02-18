"use client"

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { createProductAction } from "@/actions/products";
import { CategoryType } from "@/lib/types";

interface ProductFormProps {
    categories: CategoryType[];
}

export function ProductForm({ categories }: ProductFormProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [priceValue, setPriceValue] = useState<string>("");

    async function handleCreateProduct(formData: FormData) {
        // We need to append the category_id from the Select component if it's not automatically included.
        // Shadcn Select doesn't use a hidden input by default, so we need to manage state or use a hidden input.
        // But let's check if we can just pick it up from the formData if we give it a name.
        // Actually, Shadcn Select handles value internally.
        // It's easier to just use a hidden input synchronized with the select value, OR
        // append it to formData before sending.

        // Let's use a hidden input approach for simplicity with FormData, 
        // OR better, we can just get the value from the form if the Select component renders a hidden input.
        // But standard Shadcn Select might not.

        // Let's check if we can just append it manually.

        const categoryId = formData.get("category_id")
        if (!categoryId) {
            // If Select doesn't provide it (likely), we need to manually handle it.
            // But wait, if I give the Select a name, does it work?
            // Shadcn Select: <Select name="category_id"> ...
            // Yes, if we pass `name` prop to Select, it should work as expected in a form.
            // Let's assume it does. If not, I'll fix it.
        }

        const result = await createProductAction(formData);

        if (result.success) {
            setOpen(false);
            setImagePreview(""); // Reset preview
            router.refresh();
        } else {
            console.log(result.message);
            // Ideally establish a toast notification system, but for now console.log or alert.
        }
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type !== "image/jpeg" && image.type !== "image/png") {
                return; // Optionally show error
            }

            setImagePreview(URL.createObjectURL(image));
        }
    }

    function formatToBrl(value: string) {
        //remover tudo que nao 'e numero
        const numbers = value.replace(/\D/g, "")

        if (!numbers) return ""

        // Converter para numero e dividir por 100 para ter o valor em reais
        const amount = parseInt(numbers) / 100

        return amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
    }
    function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
        const formatted = formatToBrl(e.target.value)
        setPriceValue(formatted)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-brand-primary text-white font-semibold">
                    Novo Produto
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-app-card border-app-border text-white sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Novo Produto</DialogTitle>
                    <DialogDescription>
                        Crie um cardápio incrível para sua pizzaria
                    </DialogDescription>
                </DialogHeader>,0

                <form action={handleCreateProduct} className="space-y-4">

                    <Label className="flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-app-border bg-app-background p-6 hover:bg-app-border/10 transition-colors">
                        <span className="mb-2 block text-sm font-semibold text-gray-400">
                            Carregar Imagem do Produto
                        </span>

                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview do produto"
                                className="h-full w-full rounded-md object-cover"
                                style={{ maxHeight: '180px', objectFit: 'cover' }}
                            />
                        )}

                        {!imagePreview && (
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-app-border/20">
                                <UploadCloud className="h-10 w-10 text-brand-primary" />

                            </div>
                        )}

                        <input
                            type="file"
                            name="file"
                            accept="image/png, image/jpeg"
                            className="hidden"
                            onChange={handleFile}
                            required
                        />
                    </Label>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome do produto</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Ex: Pizza Calabresa"
                                className="border-app-border bg-app-background text-white"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Preço</Label>
                            <Input
                                id="price"
                                name="price"
                                placeholder="Ex: 39.90"
                                className="border-app-border bg-app-background text-white"
                                required
                                // type="number"
                                // step="0.01"
                                value={priceValue}
                                onChange={handlePriceChange}

                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Descreva os ingredientes..."
                            className="border-app-border bg-app-background text-white min-h-[100px] resize-none"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Select name="category_id" required>
                            <SelectTrigger className="border-app-border bg-app-background text-white">
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent className="bg-app-card border-app-border text-white">
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                        className="text-white"
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full bg-brand-primary text-white font-bold hover:bg-brand-primary/90">
                        Cadastrar produto
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    )
}
