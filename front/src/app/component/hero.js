export default async function Hero() {
    const res = await fetch('http://strapi:1337/api/Home-page?populate=*');
    const { data } = await res.json();
  
    console.log(data); // Verifique o que é retornado aqui
    
    return (
      <div className="container mx-auto p-4">
        {data?.Blocks?.map((block) => {
          if (block.__component === 'layout.hero-section') {
            return (
              <section key={block.id} className="text-center py-16 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{block.Heading}</h1>
                <p className="text-lg text-gray-600 mb-6">{block.subheading}</p>
                {block.image && (
                  <img src={`http://strapi:1337${block.image.url}`} alt={block.Heading} className="mx-auto rounded-lg shadow-lg" />
                )}
                {block.url && (
                  <a href={block.url} target={block.isExternal ? '_blank' : '_self'} className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition">
                    {block.text}
                  </a>
                )}
              </section>
            );
          }
          if (block.__component === 'layout.feature-section') {
            return (
              <section key={block.id} className="text-center py-16 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">{block.Title}</h2>
                <p className="text-lg text-gray-600">{block.Description}</p>
              </section>
            );
          }
          return null;
        })}
      </div>
    );
  }
  