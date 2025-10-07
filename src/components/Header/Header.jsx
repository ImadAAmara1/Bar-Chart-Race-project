import "./Header.css";

export function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="main-title">Bar Chart Race - Évolution des Marques</h1>

        <div className="header-description">
          <p>
            Ce graphique animé montre comment les marques les plus valorisées
            ont évolué entre 2000 et 2019. Observez les changements de
            classement au fil des années et découvrez les tendances par
            catégorie.
          </p>
        </div>
      </div>
    </header>
  );
}
