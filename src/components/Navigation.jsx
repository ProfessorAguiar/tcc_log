import { Package, Plus, BarChart3 } from "lucide-react";
import { useState } from "react";
import "./Navigation.css";

export default function Navigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 0, label: "Simulador", icon: BarChart3 },
    { id: 1, label: "Cadastro", icon: Plus },
    { id: 2, label: "Produtos", icon: Package },
  ];

  return (
    <nav className="instagram-nav">
      <div className="nav-container">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => onTabChange(tab.id)}
              title={tab.label}
            >
              <Icon size={24} />
              <span className="nav-label">{tab.label}</span>
              {activeTab === tab.id && <div className="nav-indicator" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
