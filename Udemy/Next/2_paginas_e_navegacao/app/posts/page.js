import Link from "next/link";

export default function PostsPage() {
    const postsIds = [1, 2, 3]
  return (
   
    <div>
         <h1>Blog</h1>
         <ul>
            {postsIds.map((id) => (
                <li key={id}>
                    <Link href={`/posts/${id}`}>Ver post {id}</Link>
                </li>
            ))}
         </ul>
        PostsPage
    </div>
  );
}