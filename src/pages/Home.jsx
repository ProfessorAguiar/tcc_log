import { useState } from "react";
import Navigation from "../components/Navigation";
import CargoSimulator from "../components/CargoSimulator";
import ProductRegistration from "../components/ProductRegistration";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState([]);

  const handleProductAdded = (product) => {
    setProducts((prev) => [product, ...prev]);
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
            <ProductRegistration onProductAdded={handleProductAdded} />
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
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th>Mercadoria</th>
                        <th>SKU</th>
                        <th>Volume/Dimensões</th>
                        <th>Data de Registro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="product-name">
                            <strong>{product.nome}</strong>
                            {product.descricao && (
                              <p className="product-desc">{product.descricao}</p>
                            )}
                          </td>
                          <td>{product.registro}</td>
                          <td>
                            {product.volume ? (
                              <span>{product.volume.toFixed(3)} m³</span>
                            ) : (
                              <span>
                                {product.comprimento} × {product.largura} ×{" "}
                                {product.altura} cm
                              </span>
                            )}
                          </td>
                          <td>{product.dataRegistro}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
