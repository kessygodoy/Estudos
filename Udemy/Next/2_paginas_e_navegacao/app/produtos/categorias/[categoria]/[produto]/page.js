

export default function ProductPage(
    { params }
) {
    const produto = params.produto;
    console.log(produto);

    return (
        <>
            <h1>Exibindo detalhes do produto: {produto}</h1>
        </>
    );
}