import "./Footer.css";
export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>À propos de cette visualisation</h3>
          <p>
            Cette bar chart race a été créée avec React et D3.js pour démontrer
            les capacités de visualisation de données interactives. Les données
            montrent l'évolution des marques les plus valorisées sur une période
            de 20 ans.
          </p>
        </div>

        <div className="footer-section">
          <h3>Source des données</h3>
          <div className="data-source">
            <div className="source-actions">
              <a
                href="https://github.com/d3/d3/wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="download-link secondary"
              >
                📚 Documentation D3.js
              </a>
              <a
                href="/data/category-brands.csv"
                className="download-link primary"
                download
              >
                📥 Télécharger le dataset complet (CSV)
              </a>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Technologies utilisées</h3>
          <div className="tech-stack">
            <span className="tech-badge">
              <span className="tech-icon">⚛️</span>React
            </span>
            <span className="tech-badge">
              <span className="tech-icon">📊</span>D3.js
            </span>
            <span className="tech-badge">
              <span className="tech-icon">⚡</span>Vite
            </span>
            <span className="tech-badge">
              <span className="tech-icon">🎨</span>CSS3
            </span>
          </div>
        </div>

        <div className="footer-section">
          <h3>Comment utiliser</h3>
          <ul className="usage-list">
            <li>Utilisez le slider pour naviguer entre les années</li>
            <li>Cliquez sur "Lecture" pour lancer l'animation automatique</li>
            <li>Survolez les barres pour voir les détails</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
