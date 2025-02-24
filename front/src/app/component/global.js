export async function fetchSiteData() {
    const response = await fetch("http://strapi:1337/api/global?populate=*");
    const data = await response.json();
    return data.data;
}

export default async function Global() {
    const site = await fetchSiteData();
   
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{site.siteName}</h1>
        <p className="text-gray-600 mb-6">{site.siteDescription}</p>
  
        {site.favicon && (
          <div className="my-6">
            <img 
              src={site.favicon.url} 
              alt={site.favicon.alternativeText || "Favicon"} 
              className="w-16 h-16 rounded-full shadow-md"
            />
          </div>
        )}
  
        {site.defaultSeo && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">{site.defaultSeo.metaTitle}</h2>
            <p className="text-gray-600">{site.defaultSeo.metaDescription}</p>
          </div>
        )}
      </div>
    );
}