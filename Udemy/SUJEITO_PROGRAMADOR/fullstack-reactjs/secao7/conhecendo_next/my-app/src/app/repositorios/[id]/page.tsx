
interface PageDetailProps {
    params: {
        id: string;
    }
}

export default async function RepositorioId({ params }: PageDetailProps) {
    const { id } = await params;
    return (
        <div>
            <h1>Repositorio</h1>
            <span>Seja bem vindo ao repositorio {id}</span>
        </div>
    )
}