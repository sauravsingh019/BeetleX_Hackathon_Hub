import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer>
      <div className="footer-logo">BeetleX</div>
      <div className="footer-links">
        <Link to="#">Twitter</Link>
        <Link to="#">Discord</Link>
        <Link to="#">GitHub</Link>
        <Link to="#">LinkedIn</Link>
        <Link to="#">Contact</Link>
        <Link to="#">Privacy</Link>
      </div>
      <div className="footer-copy">© 2025 BeetleX. All rights reserved. Built with ☕ and TypeScript.</div>
    </footer>
  )
}
