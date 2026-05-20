import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import CargoSimulator from "../components/CargoSimulator";
import ProductRegistration from "../components/ProductRegistration";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";


export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
    const [products, setProducts] = useState([]);

  const API_URL = "http://localhost:5500/produtos";
  const handleProductAdded = async () => {
    await carregarProdutos();
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {

    try {

      const response = await fetch(API_URL);

      const data = await response.json();

      const produtosFormatados = data.map((produto) => ({

        id: produto.SKU,
        sku: produto.SKU,
        nome: produto.pNome,
        volume: produto.pVolume,
        descricao: produto.pDescricao,

        //dataRegistro: new Date().toLocaleDateString("pt-BR"),
        data:produto.Data
      }));

      setProducts(produtosFormatados);

    } catch (error) {

      console.error("Erro ao carregar produtos:", error);
    }
  }
  const handleDeleteProduct = async (sku) => {

    try {

      const response = await fetch(
        `http://localhost:5500/produtos/${sku}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao remover produto");
      }

      await onProductAdded();

      setMessage({
        type: "success",
        text: "Produto removido com sucesso!",
      });

    } catch (error) {

      console.error(error);

      setMessage({
        type: "error",
        text: "Erro ao remover produto",
      });
    }
  };

  return (
    <div className="home-container">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="main-content">
        {/* Tab 0: Cargo Simulator */}
        {activeTab === 0 && (
          <div className="tab-content">
            <CargoSimulator products={products} />
          </div>
        )}

        {/* Tab 1: Product Registration */}
        {activeTab === 1 && (
          <div className="tab-content">
            <ProductRegistration
              onProductAdded={handleProductAdded}
              products={products}
              setProducts={setProducts}
            />
          </div>
        )}

        {/* Tab 2: Products List */}
        {activeTab === 2 && (
          <div className="tab-content">
            <div className="products-view">
              <div className="view-header">
                <h2>📦 Todos os Produtos</h2>
                <p>Visualize todos os produtos cadastrados no sistema</p>
              </div>

              {products.length === 0 ? (
                <div className="empty-view">
                  <p>Nenhum produto cadastrado ainda</p>
                  <button
                    className="btn-navigate"
                    onClick={() => setActiveTab(1)}
                  >
                    Ir para Cadastro
                  </button>
                </div>
              ) : (
                <div className="products-table-container">
                  <div className="products-grid">
              {products.map((product) => (
                <Card key={product.id} className="product-card">
                  <div className="product-header">
                    <div>
                      <h4>{product.nome}</h4>
                      <p className="product-registro">Nº: {product.registro}</p>
                    </div>
                    <span className="product-date">{product.dataRegistro}</span>
                  </div>

                  <div className="product-details">
                    {product.volume !== undefined && (
                      <div className="detail-item">
                        <span className="label">Volume:</span>
                        <span className="value">{product.volume.toFixed(3)} m³</span>
                      </div>
                    )}

                    {product.comprimento !== undefined && (
                      <div className="detail-item">
                        <span className="label">Dimensões:</span>
                        <span className="value">
                          {product.comprimento} × {product.largura} × {product.altura} cm
                        </span>
                      </div>
                    )}

                    {product.descricao && (
                      <div className="detail-item full-width">
                        <span className="label">Descrição:</span>
                        <p className="value">{product.descricao}</p>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.registro)}
                    className="btn-delete"
                  >
                    Remover
                  </Button> 
                </Card>
              ))}
            </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
