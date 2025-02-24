export default async function About() {
  const res = await fetch("http://localhost:1337/api/about?populate[blocks][populate]=*");
  const response = await res.json();
  const post = response.data;

  return (
    <div>
      <h1>{post.title}</h1>
      {post.blocks.map((block, index) => (
        <div key={index}>
          {block.__component === "shared.quote" && (
            <blockquote>
              <h2>{block.title}</h2>
              <p>{block.body}</p>
            </blockquote>
          )}

          {block.__component === "shared.media" && block.image && (
            <img src={`http://localhost:1337${block.image.url}`} alt="Imagem" />
          )}
        </div>
      ))}
    </div>
  );
}
