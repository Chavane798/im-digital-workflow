import Image from 'next/image';

async function fetchData() {
  const res = await fetch(`http://strapi:1337/api/servicos?populate=*`);
  const data = await res.json();
  return data.data;
}

export default async function Servicos() {
  const serviços = await fetchData();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Nossos Serviços</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviços.map((serviço) => {
          const { title, description, image } = serviço;
          const imgUrl = image && image[0] ? `http://strapi:1337${image[0].url}` : '';

          return (
            <div key={serviço.id} className="service-card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              {imgUrl && (
                <div className="relative mb-4">
                  <Image
                    src={imgUrl}
                    alt={title}
                    width={500}
                    height={263}
                    className="rounded-md object-cover w-full h-48"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold text-center mt-4">{title}</h2>
              <p className="mt-2 text-center">{description[0].children[0].text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
