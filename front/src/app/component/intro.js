export default async function Intro() {
    const data = await fetch("http://strapi:1337/api/introducaos?populate=*"); // Corrigido o nome do host para 'strapi'
    const result = await data.json();
    const post = result.data[0];
    const imageUrl = post.image[0]?.formats.medium.url || post.image[0]?.url;
  
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <img className="w-full rounded-md mb-4" src={imageUrl} alt={post.image[0]?.name || "Imagem"} width={750} height={420} />
        <p className="text-gray-600">{post.descricao[0].children[0].text}</p>
      </div>
    );
  }
