export default async function Page() {
    const data = await fetch("http://localhost:1337/api/about?populate=*");
    const response = await data.json();
    const post = response.data;
  
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-6">
          <strong>Publicado em:</strong> {new Date(post.publishedAt).toLocaleDateString()}
        </p>
  
        {post.blocks.map((block) => {
          if (block.__component === "shared.quote") {
            return (
              <blockquote key={block.id} className="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4">
                <p>{block.body}</p>
                <cite className="block text-right text-blue-500 font-semibold">- {block.title}</cite>
              </blockquote>
            );
          }
          if (block.__component === "shared.rich-text") {
            return (
              <div key={block.id} className="prose prose-lg text-gray-800" dangerouslySetInnerHTML={{ __html: block.body }} />
            );
          }
          if (block.__component === "shared.media" && block.media && block.media.url) {
            return (
              <div key={block.id} className="my-6">
                <img src={block.media.url} alt={block.media.alternativeText || "Imagem"} className="w-full rounded-lg shadow-md" />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
