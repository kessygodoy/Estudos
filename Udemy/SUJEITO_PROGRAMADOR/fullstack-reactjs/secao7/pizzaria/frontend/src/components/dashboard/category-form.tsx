"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { createCategoryAction } from "@/actions/categories";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export function CategoryForm() {
    const router = useRouter()
    const [open, setOpen] = useState(false);

    async function handleCreateCategory(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const result = await createCategoryAction(formData)

        if (result.success) {
            setOpen(false)
            router.refresh()
        } else {
            console.log(result.message)
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-brand-primary text-white font-semibold">
                    <Plus className="size-5" />
                    Nova Categoria
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-app-card border-app-border text-white p-6">
                <DialogHeader>
                    <DialogTitle>Nova Categoria</DialogTitle>
                    <DialogDescription>
                        Adicione uma nova categoria para organizar seus produtos
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleCreateCategory}>
                    <div>
                        <Label htmlFor="name">
                            Nome da categoria
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            className="border-app-border bg-app-background text-white"
                        />
                    </div>

                    <Button type="submit" className="w-full bg-brand-primary text-white" >
                        Salvar
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}