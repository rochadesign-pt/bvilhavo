"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNav, ctaPrimary, ctaSecondary } from "@/lib/nav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40">
      <div className="container-wide grid h-24 grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        {/* Left: desktop nav / mobile toggle */}
        <div className="flex items-center">
          <nav className="hidden lg:flex items-center gap-9">
            {mainNav.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 text-base font-medium text-text-subtle transition-colors hover:text-text"
                >
                  {item.label}
                  {item.children && (
                    <span className="text-[11px] text-text-subtlest transition-transform group-hover:rotate-180">
                      ▾
                    </span>
                  )}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full z-10 min-w-[22rem] pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-2xl border border-stroke bg-surface p-2 shadow-xl shadow-black/5">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block rounded-xl px-4 py-3 transition-colors hover:bg-surface-muted"
                        >
                          <div className="font-medium text-text">{child.label}</div>
                          {child.description && (
                            <div className="mt-0.5 text-sm text-text-subtlest">
                              {child.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full border border-stroke"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-text" />
              <span className="block h-0.5 w-5 bg-text" />
              <span className="block h-0.5 w-5 bg-text" />
            </div>
          </button>
        </div>

        {/* Center: crest */}
        <Link
          href="/"
          className="flex items-center justify-center"
          aria-label="Bombeiros Voluntários de Ílhavo — início"
        >
          <img
            src="/brand/crest.svg"
            alt="Bombeiros Voluntários de Ílhavo"
            width={56}
            height={56}
            className="h-14 w-14"
          />
        </Link>

        {/* Right: CTAs */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href={ctaSecondary.href}
            className="hidden md:inline-flex items-center rounded-full border border-stroke bg-surface px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-surface-muted"
          >
            {ctaSecondary.label}
          </Link>
          <Link
            href={ctaPrimary.href}
            className="hidden sm:inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-dark"
          >
            {ctaPrimary.label}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="lg:hidden bg-surface">
          <div className="container-wide flex flex-col py-4">
            {mainNav.map((item) => (
              <div key={item.label} className="py-1">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-lg font-medium text-text"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-3 flex flex-col gap-1 border-l border-stroke pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="py-1.5"
                      >
                        <span className="block text-base text-text">{child.label}</span>
                        {child.description && (
                          <span className="block text-sm text-text-subtlest">
                            {child.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href={ctaSecondary.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-stroke px-4 py-2.5 text-sm font-semibold text-text"
              >
                {ctaSecondary.label}
              </Link>
              <Link
                href={ctaPrimary.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-on-brand"
              >
                {ctaPrimary.label}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
