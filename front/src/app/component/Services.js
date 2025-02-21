export default async function Services() {
    const response = await fetch("http://strapi:1337/api/servicos?populate=*");
    const result = await response.json();
    const services = result.data;
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {services.map((service) => {
          const imageUrl = service.image[0]?.formats.medium.url || service.image[0]?.url;
          return (
            <div key={service.id} className="bg-white rounded-2xl shadow-lg p-4">
              <h2 className="text-xl font-bold mb-2">{service.title}</h2>
              <img src={imageUrl} alt={service.image[0]?.name || "Imagem"} className="w-full h-auto rounded-xl" />
              <p className="mt-2 text-gray-700">{service.descricao[0].children[0].text}</p>
            </div>
          );
        })}
      </div>
    );
}
