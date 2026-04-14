import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import "./CargoSimulator.css";

export default function CargoSimulator({ products = [] }) {
  const [nome, setNome] = useState("");
  const [registro, setRegistro] = useState("");
  const [volume, setVolume] = useState("");
  const [comprimento, setComprimento] = useState("");
  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);
  const [useVolume, setUseVolume] = useState(true);
  const [message, setMessage] = useState(null);

  const capacidadeVan = 13; // m³

  const calcular = () => {
    let volumeCalculado = parseFloat(volume);

    const comp = parseFloat(comprimento);
    const larg = parseFloat(largura);
    const alt = parseFloat(altura);

    // Se não informar volume, calcula pelas dimensões
    if (isNaN(volumeCalculado) && comp && larg && alt) {
      volumeCalculado = (comp * larg * alt) / 1000000;
    }

    if (!nome || !registro || isNaN(volumeCalculado) || volumeCalculado <= 0) {
      setMessage({
        type: "error",
        text: "Preencha o nome, SKU e informe o volume ou as dimensões.",
      });
      setResultado(null);
      return;
    }

    const quantidadeCaixas = Math.floor(capacidadeVan / volumeCalculado);
    const ocupado = quantidadeCaixas * volumeCalculado;
    const sobra = capacidadeVan - ocupado;

    const mensagem = (
      <div className="resultado-content">
        <div className="resultado-item">
          <span className="label">Mercadoria:</span>
          <span className="value">{nome}</span>
        </div>
        <div className="resultado-item">
          <span className="label">SKU:</span>
          <span className="value">{registro}</span>
        </div>
        <div className="resultado-item">
          <span className="label">Volume de cada caixa:</span>
          <span className="value">{volumeCalculado.toFixed(3)} m³</span>
        </div>
        <div className="resultado-item highlight">
          <span className="label">Quantidade que cabe na van:</span>
          <span className="value">{quantidadeCaixas} caixas</span>
        </div>
        <div className="resultado-item">
          <span className="label">Espaço ocupado:</span>
          <span className="value">{ocupado.toFixed(2)} m³</span>
        </div>
        <div className="resultado-item">
          <span className="label">Espaço restante:</span>
          <span className="value">{sobra.toFixed(2)} m³</span>
        </div>
      </div>
    );

    setResultado(mensagem);
    setMessage({ type: "success", text: "Cálculo realizado com sucesso!" });
    setTimeout(() => setMessage(null), 2000);
  };

  const handleLoadProduct = (product) => {
    setNome(product.nome);
    setRegistro(product.registro);

    if (product.volume) {
      setUseVolume(true);
      setVolume(product.volume.toString());
      setComprimento("");
      setLargura("");
      setAltura("");
    } else {
      setUseVolume(false);
      setVolume("");
      setComprimento(product.comprimento?.toString() || "");
      setLargura(product.largura?.toString() || "");
      setAltura(product.altura?.toString() || "");
    }

    setResultado(null);
  };

  return (
    <div className="cargo-simulator">
      <div className="simulator-header">
        <h2>🚐 Simulador de Carga da Van</h2>
        <p>Calcule quantas caixas cabem na sua van com capacidade de {capacidadeVan} m³</p>
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

      <div className="simulator-container">
        <Card className="simulator-card">
          <h3>📋 Calcular Volume</h3>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="nome">Nome da Mercadoria *</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Caixas de Eletrônicos"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="registro">SKU *</label>
              <input
                id="registro"
                type="text"
                value={registro}
                onChange={(e) => setRegistro(e.target.value)}
                placeholder="Ex: REG-2024-001"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-section">
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
                <label htmlFor="volume">Volume de cada caixa (m³) *</label>
                <input
                  id="volume"
                  type="number"
                  step="0.001"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="Ex: 0.125"
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
                    value={comprimento}
                    onChange={(e) => setComprimento(e.target.value)}
                    placeholder="Ex: 50"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="largura">Largura (cm) *</label>
                  <input
                    id="largura"
                    type="number"
                    value={largura}
                    onChange={(e) => setLargura(e.target.value)}
                    placeholder="Ex: 50"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="altura">Altura (cm) *</label>
                  <input
                    id="altura"
                    type="number"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    placeholder="Ex: 50"
                    className="form-input"
                  />
                </div>
              </div>
            )}
          </div>

          <Button onClick={calcular} className="btn-calcular">
            Calcular
          </Button>
        </Card>

        {resultado && (
          <Card className="resultado-card">
            <h3>📊 Resultado do Cálculo</h3>
            {resultado}
          </Card>
        )}
      </div>

      {products && products.length > 0 && (
        <Card className="products-quick-access">
          <h3>📦 Produtos Cadastrados</h3>
          <p className="subtitle">Clique para carregar os dados do produto</p>
          <div className="products-list">
            {products.map((product, index) => (
              <button
                key={index}
                className="product-button"
                onClick={() => handleLoadProduct(product)}
              >
                <div className="product-info">
                  <span className="product-name">{product.nome}</span>
                  <span className="product-registro">{product.registro}</span>
                </div>
                <span className="product-volume">
                  {product.volume
                    ? `${product.volume.toFixed(3)} m³`
                    : `${product.comprimento}×${product.largura}×${product.altura}cm`}
                </span>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
