
export default function PostPage({ params }) {
    const id = params.id;
  return (
    <div>
      <h1>Titulo: {id}</h1>
      <p>Texto do post...</p>
    </div>
  );
}