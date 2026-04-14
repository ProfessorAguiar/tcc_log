import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import "./ProductRegistration.css";

export default function ProductRegistration({ onProductAdded }) {
  const [formData, setFormData] = useState({
    nome: "",
    registro: "",
    volume: "",
    comprimento: "",
    largura: "",
    altura: "",
    descricao: "",
  });

  const [useVolume, setUseVolume] = useState(true);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.nome.trim()) {
      setMessage({ type: "error", text: "Nome da mercadoria é obrigatório" });
      return false;
    }
    if (!formData.registro.trim()) {
      setMessage({ type: "error", text: "Nº de Registro é obrigatório" });
      return false;
    }

    if (useVolume) {
      if (!formData.volume || parseFloat(formData.volume) <= 0) {
        setMessage({ type: "error", text: "Volume deve ser maior que 0" });
        return false;
      }
    } else {
      const comp = parseFloat(formData.comprimento);
      const larg = parseFloat(formData.largura);
      const alt = parseFloat(formData.altura);

      if (!comp || !larg || !alt || comp <= 0 || larg <= 0 || alt <= 0) {
        setMessage({ type: "error", text: "Todas as dimensões são obrigatórias e devem ser maiores que 0" });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let calculatedVolume = useVolume ? parseFloat(formData.volume) : null;

    if (!useVolume) {
      const comp = parseFloat(formData.comprimento);
      const larg = parseFloat(formData.largura);
      const alt = parseFloat(formData.altura);
      calculatedVolume = (comp * larg * alt) / 1000000; // Converter cm³ para m³
    }

    const newProduct = {
      id: Date.now().toString(),
      nome: formData.nome,
      registro: formData.registro,
      volume: calculatedVolume || undefined,
      comprimento: !useVolume ? parseFloat(formData.comprimento) : undefined,
      largura: !useVolume ? parseFloat(formData.largura) : undefined,
      altura: !useVolume ? parseFloat(formData.altura) : undefined,
      descricao: formData.descricao,
      dataRegistro: new Date().toLocaleDateString("pt-BR"),
    };

    setProducts((prev) => [newProduct, ...prev]);
    setMessage({ type: "success", text: "Produto cadastrado com sucesso!" });

    if (onProductAdded) {
      onProductAdded(newProduct);
    }

    // Reset form
    setFormData({
      nome: "",
      registro: "",
      volume: "",
      comprimento: "",
      largura: "",
      altura: "",
      descricao: "",
    });

    setTimeout(() => setMessage(null), 3000);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setMessage({ type: "success", text: "Produto removido com sucesso!" });
    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <div className="product-registration">
      <div className="registration-header">
        <h2>📦 Cadastro de Produtos</h2>
        <p>Registre os produtos para calcular a capacidade da van</p>
      </div>

      {message && (
        <div className={`message-alert ${message.type}`}>
          {message.type === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {showForm && (
        <Card className="registration-form-card">
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-section">
              <h3>Informações Básicas</h3>

              <div className="form-group">
                <label htmlFor="nome">Nome da Mercadoria *</label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Ex: Caixas de Eletrônicos"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="registro">SKU *</label>
                <input
                  id="registro"
                  type="text"
                  name="registro"
                  value={formData.registro}
                  onChange={handleInputChange}
                  placeholder="Ex: REG-2024-001"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Dimensões do Produto</h3>

              <div className="toggle-section">
                <label className="toggle-label">
                  <input
                    type="radio"
                    checked={useVolume}
                    onChange={() => setUseVolume(true)}
                  />
                  <span>Informar Volume (m³)</span>
                </label>
                <label className="toggle-label">
                  <input
                    type="radio"
                    checked={!useVolume}
                    onChange={() => setUseVolume(false)}
                  />
                  <span>Informar Dimensões (cm)</span>
                </label>
              </div>

              {useVolume ? (
                <div className="form-group">
                  <label htmlFor="volume">Volume da Caixa (m³) *</label>
                  <input
                    id="volume"
                    type="number"
                    name="volume"
                    value={formData.volume}
                    onChange={handleInputChange}
                    placeholder="Ex: 0.125"
                    step="0.001"
                    className="form-input"
                  />
                </div>
              ) : (
                <div className="dimensions-grid">
                  <div className="form-group">
                    <label htmlFor="comprimento">Comprimento (cm) *</label>
                    <input
                      id="comprimento"
                      type="number"
                      name="comprimento"
                      value={formData.comprimento}
                      onChange={handleInputChange}
                      placeholder="Ex: 50"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="largura">Largura (cm) *</label>
                    <input
                      id="largura"
                      type="number"
                      name="largura"
                      value={formData.largura}
                      onChange={handleInputChange}
                      placeholder="Ex: 50"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="altura">Altura (cm) *</label>
                    <input
                      id="altura"
                      type="number"
                      name="altura"
                      value={formData.altura}
                      onChange={handleInputChange}
                      placeholder="Ex: 50"
                      className="form-input"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="form-section">
              <h3>Informações Adicionais</h3>

              <div className="form-group">
                <label htmlFor="descricao">Descrição do Produto</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Informações importantes sobre o produto..."
                  className="form-input textarea"
                  rows={3}
                />
              </div>
            </div>

            <div className="form-actions">
              <Button type="submit" className="btn-submit">
                Cadastrar Produto
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Visualizar Cadastros
              </Button>
            </div>
          </form>
        </Card>
      )}

      {!showForm && (
        <div className="products-list-section">
          <div className="list-header">
            <h3>Produtos Cadastrados ({products.length})</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowForm(true)}
            >
              Novo Cadastro
            </Button>
          </div>

          {products.length === 0 ? (
            <Card className="empty-state">
              <p>Nenhum produto cadastrado ainda</p>
              <Button onClick={() => setShowForm(true)}>
                Cadastrar Primeiro Produto
              </Button>
            </Card>
          ) : (
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
                    onClick={() => handleDeleteProduct(product.id)}
                    className="btn-delete"
                  >
                    Remover
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
