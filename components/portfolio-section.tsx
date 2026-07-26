'use client'

import { useState } from 'react'
import { ExternalLink, Eye, Shield, Code2 } from 'lucide-react'
import { portfolioData } from '@/lib/portfolio-data'

export interface ProjectItem {
  title: string
  category: string
  image?: string
  description: string
  tech: string[]
  liveUrl: string
  adminUrl?: string
}

interface PortfolioSectionProps {
  data?: typeof portfolioData
}

export function PortfolioSection({ data = portfolioData }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects: ProjectItem[] =
    activeFilter === 'all' ? data.projects : data.projects.filter((p) => p.category === activeFilter)

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Portfolio</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {data.categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium capitalize transition-all ${activeFilter === category
                ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="group relative bg-secondary rounded-xl border border-border overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 flex flex-col justify-between isolate"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-[11px] bg-background border-b border-border/50">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top rounded-t-[11px] group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent/15 via-background to-secondary/80 p-3.5 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground/80 font-mono text-xs z-10 my-auto">
                      <Code2 className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="truncate font-semibold text-foreground/90">
                        {project.title.split('–')[0].trim().toLowerCase().replace(/[^a-z0-9]/g, '')}.app
                      </span>
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-background/90 backdrop-blur-sm border border-border rounded-md text-[11px] font-medium text-accent capitalize z-10">
                  {project.category}
                </div>

                {/* Hover Overlay with Live Demo Buttons */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4 z-20 rounded-t-[11px]">
                  <div className="flex flex-wrap gap-2.5 justify-center transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Live Demo
                    </a>

                    {project.adminUrl && (
                      <a
                        href={project.adminUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 bg-secondary border border-border text-foreground rounded-lg text-xs font-medium hover:border-accent hover:text-accent transition-colors shadow-md"
                      >
                        <Shield className="w-3.5 h-3.5 text-accent" />
                        Admin Portal
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3.5 md:p-4">
                <h3 className="text-sm md:text-base font-bold text-foreground mb-1.5 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                {project.tech && (
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 bg-background border border-border/60 rounded text-muted-foreground font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
