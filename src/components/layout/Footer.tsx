import { Globe, Share2, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/events', label: 'Events' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/judge', label: 'Judge Portal' },
  { to: '/organizer', label: 'Organizer' },
]

const socialLinks: { href: string; icon: LucideIcon; label: string }[] = [
  { href: 'https://github.com', icon: Share2, label: 'GitHub' },
  { href: 'https://twitter.com', icon: Globe, label: 'Twitter' },
  { href: 'https://linkedin.com', icon: X, label: 'LinkedIn' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-text-primary">
            Beetle<span className="text-accent">X</span> Hackathon Hub
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            Production-quality hackathon management for builders.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-lg border border-border p-2 text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-text-secondary sm:px-6">
        © {new Date().getFullYear()} BeetleX. All rights reserved.
      </div>
    </footer>
  )
}
