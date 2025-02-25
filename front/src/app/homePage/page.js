import Image from 'next/image';




async function fetchData() {
  const res = await fetch(`http://strapi:1337/api/homepage?populate=*`);
  const data = await res.json();
  return data.data;
}

export default async function HomePage() {
  const { titulo, descricao, imagem, servico } = await fetchData();

  return (
    <div className="p-6 max-w-7xl mx-auto">
       
      {/* Título e Descrição */}
      <h1 className="text-4xl font-semibold text-center text-gray-800">{titulo}</h1>
      <p className="mt-4 text-lg text-gray-600">{descricao[0].children[0].text}</p>

      {/* Imagem Principal */}
      {imagem && imagem.formats && imagem.formats.medium && (
        <div className="mt-6">
          <Image
            src={`http://strapi:1337${imagem.formats.medium.url}`}
            alt={titulo}
            width={750}
            height={419}
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {/* Seção de Serviço */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Nosso Serviço</h2>
        
        {/* Exibindo o Serviço */}
        {servico ? (
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-800 text-center">{servico.title}</h3>
            <p className="mt-2 text-gray-600 text-center">{servico.description[0].children[0].text}</p>
          </div>
        ) : (
          <p className="text-center text-gray-600">Nenhum serviço disponível no momento.</p>
        )}
      </div>
    </div>
  );
}
