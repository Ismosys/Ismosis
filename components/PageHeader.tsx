import Reveal from './Reveal';

type Crumb = { label: string; href?: string };

type PageHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  crumbs?: Crumb[];
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
}: PageHeaderProps) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="container-page pt-16 md:pt-24 pb-14 md:pb-20">
        {crumbs && crumbs.length > 0 && (
          <Reveal className="mb-10 flex items-center gap-2 text-[12px] uppercase tracking-eyebrow text-ink-muted">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.href ? (
                  <a href={c.href} className="hover:text-ink transition-colors">
                    {c.label}
                  </a>
                ) : (
                  <span>{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-ink-muted/50">/</span>}
              </span>
            ))}
          </Reveal>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="eyebrow eyebrow-line">{eyebrow}</div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 font-display font-medium text-display-xl text-ink text-balance">
                {title}
              </h1>
            </Reveal>
          </div>
          {description && (
            <Reveal delay={0.15} className="lg:col-span-4">
              <p className="text-[15.5px] leading-relaxed text-ink-muted text-pretty">
                {description}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
