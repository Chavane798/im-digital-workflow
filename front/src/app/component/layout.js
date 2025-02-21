interface HeroSection {
    __component: "layout.hero-section";
    id: number;
    Heading: string;
    subheading: string;
  }
  
  interface LayoutData {
    data?: {
      Blocks: HeroSection[];
    };
  }
  
  async function fetchLayoutData(): Promise<LayoutData | null> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://strapi:1337";
    
    try {
      const response = await fetch(`${baseUrl}/api/layout`, { cache: "no-store" }); // Evita cache no SSR
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: Falha ao buscar layout`);
      }
      return response.json();
    } catch (error) {
      console.error("Erro ao buscar layout:", error);
      return null;
    }
  }
  
  export default async function Layout() {
    const layoutData = await fetchLayoutData();
  
    if (!layoutData) {
      return <p className="text-center py-10">Erro ao carregar layout.</p>;
    }
  
    return (
      <div className="container mx-auto">
        {layoutData.data?.Blocks.map((block) => {
          if (block.__component === "layout.hero-section") {
            return (
              <section key={block.id} className="text-center py-16">
                <h1 className="text-5xl font-bold">{block.Heading}</h1>
                <p className="text-xl mt-4">{block.subheading}</p>
              </section>
            );
          }
          return null;
        })}
      </div>
    );
  }
  