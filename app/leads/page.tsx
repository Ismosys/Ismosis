'use client';

import { useState } from 'react';
import type { Lead, SearchResult } from '@/lib/leads/types';
import { downloadExport, previewInBrowser, type ExportFormat } from '@/lib/leads/export';
import { safeHref } from '@/lib/leads/links';

const EXPORTS: Array<{ format: ExportFormat; label: string }> = [
  { format: 'json', label: 'JSON' },
  { format: 'csv', label: 'CSV' },
  { format: 'xlsx', label: 'Excel' },
  { format: 'xml', label: 'XML' },
  { format: 'html', label: 'HTML' },
];

export default function LeadsPage() {
  const [term, setTerm] = useState('');
  const [location, setLocation] = useState('');
  const [source, setSource] = useState<'osm' | 'places' | 'foursquare'>('osm');
  const [limit, setLimit] = useState(60);
  const [onlyNoWebsite, setOnlyNoWebsite] = useState(true);
  const [onlyWithFacebookPage, setOnlyWithFacebookPage] = useState(false);
  const [wide, setWide] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResult | null>(null);

  async function start(e: React.FormEvent) {
    e.preventDefault();
    if (!term.trim() || !location.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term, location, source, limit, onlyNoWebsite, onlyWithFacebookPage, wide }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Search failed.');
      setResult(data as SearchResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  const leads: Lead[] = result?.leads ?? [];
  const baseName = result
    ? `leads-${result.meta.term}-${result.meta.location}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)
    : 'leads';

  return (
    <main className="container-page py-16 md:py-24">
      <header className="max-w-narrow">
        <span className="eyebrow eyebrow-line eyebrow-accent">Internal tool</span>
        <h1 className="mt-4 text-display-lg font-display">Lead Finder</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted max-w-[62ch]">
          Find local businesses with <strong className="text-ink">no website</strong> — your exact
          target. Enter a niche and location, hit Start, then preview or export the results.
          <strong className="text-ink"> Every lead gets a Facebook link</strong> — the listed page
          when there is one, otherwise a Facebook search for that business so you can find and
          message the owner. Emails appear where one is public; phone and map links are included too.
        </p>
      </header>

      {/* Search form */}
      <form onSubmit={start} className="mt-12 border-t border-line pt-10">
        <div className="grid gap-8 md:grid-cols-2 max-w-narrow">
          <div>
            <label className="field-label" htmlFor="term">1 · Search term</label>
            <input
              id="term"
              className="field-input"
              placeholder="e.g. plumber, hair salon, restaurant"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label" htmlFor="location">2 · Location</label>
            <input
              id="location"
              className="field-input"
              placeholder="e.g. Austin, Texas"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Options */}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 max-w-narrow">
          <label className="flex items-center gap-2 text-[13px] text-ink">
            <input type="checkbox" checked={onlyNoWebsite} onChange={(e) => setOnlyNoWebsite(e.target.checked)} className="accent-navy h-4 w-4" />
            Only businesses without a website
          </label>
          <label className="flex items-center gap-2 text-[13px] text-ink">
            <input type="checkbox" checked={onlyWithFacebookPage} onChange={(e) => setOnlyWithFacebookPage(e.target.checked)} className="accent-navy h-4 w-4" />
            Only ones with a real Facebook page
          </label>
          <label className="flex items-center gap-2 text-[13px] text-ink" title="Also search related categories (e.g. salon → barber, beauty, nails) and merge the results">
            <input type="checkbox" checked={wide} onChange={(e) => setWide(e.target.checked)} className="accent-navy h-4 w-4" />
            Widen coverage (related categories)
          </label>
          <label className="flex items-center gap-2 text-[13px] text-ink-muted">
            Source
            <select value={source} onChange={(e) => setSource(e.target.value as 'osm' | 'places' | 'foursquare')} className="border-b border-line-strong bg-transparent py-1 text-ink focus:border-navy focus:outline-none">
              <option value="osm">OpenStreetMap (free, has emails)</option>
              <option value="foursquare">Foursquare (key; website + email)</option>
              <option value="places">Google Places (key; no email)</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-[13px] text-ink-muted">
            Max
            <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="border-b border-line-strong bg-transparent py-1 text-ink focus:border-navy focus:outline-none">
              {[30, 60, 100, 200].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <button type="submit" className="btn-primary" disabled={loading || !term.trim() || !location.trim()}>
            {loading ? 'Extracting…' : '3 · Start'}
          </button>
          {loading && <span className="text-[13px] text-ink-muted">Querying live map data — this can take 10–40s for a city.</span>}
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-10 max-w-narrow border-l-2 border-navy bg-paper-tint px-5 py-4 text-[13.5px] text-ink">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <section className="mt-14 border-t border-line pt-10">
          {/* Summary */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <Stat label="Leads" value={leads.length} />
              <Stat label="No website" value={result.meta.noWebsiteCount} />
              <Stat label="FB pages" value={result.meta.withFacebookPage} />
              <Stat label="With email" value={result.meta.withEmail} />
              <Stat label="With phone" value={result.meta.withPhone} />
            </div>
            {leads.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => previewInBrowser(leads)} className="btn-primary h-9 px-3 text-[12.5px]">
                  Preview in browser
                </button>
                <span className="field-label mb-0 mx-1">Download</span>
                {EXPORTS.map((x) => (
                  <button key={x.format} onClick={() => downloadExport(leads, x.format, baseName)} className="btn-ghost h-9 px-3 text-[12.5px]">
                    {x.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          {result.meta.notes.length > 0 && (
            <ul className="mt-6 space-y-1.5 max-w-[70ch]">
              {result.meta.notes.map((n, i) => (
                <li key={i} className="text-[12.5px] leading-relaxed text-ink-muted">— {n}</li>
              ))}
            </ul>
          )}

          {/* Table */}
          {leads.length === 0 ? (
            <p className="mt-10 text-[14px] text-ink-muted">No businesses matched. Try a broader term or a larger area.</p>
          ) : (
            <div className="mt-8 overflow-x-auto border border-line">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="bg-navy text-paper text-left">
                    <Th>Business</Th><Th>Email</Th><Th>Phone</Th><Th>Address</Th><Th>Category</Th><Th>Facebook</Th><Th>Instagram / Other</Th><Th>Map</Th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-t border-line even:bg-paper-warm align-top">
                      <Td><span className="font-medium text-ink">{l.name}</span></Td>
                      <Td>{l.email ? <a className="text-navy hover:underline" href={`mailto:${l.email}`}>{l.email}</a> : <span className="text-ink-muted/50">—</span>}</Td>
                      <Td>{l.phone ?? <span className="text-ink-muted/50">—</span>}</Td>
                      <Td className="max-w-[260px]">{l.address ?? <span className="text-ink-muted/50">—</span>}</Td>
                      <Td className="capitalize">{l.category ?? <span className="text-ink-muted/50">—</span>}</Td>
                      <Td>
                        {safeHref(l.facebook) ? (
                          <a
                            className={l.facebookType === 'page' ? 'text-navy font-medium hover:underline' : 'text-ink-muted hover:underline'}
                            href={safeHref(l.facebook)!}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={l.facebookType === 'page' ? 'Listed Facebook page' : 'Search Facebook for this business'}
                          >
                            {l.facebookType === 'page' ? 'Page ↗' : 'Find ↗'}
                          </a>
                        ) : (
                          <span className="text-ink-muted/50">—</span>
                        )}
                      </Td>
                      <Td>{safeHref(l.social) ? <a className="text-navy hover:underline" href={safeHref(l.social)!} target="_blank" rel="noopener noreferrer">open ↗</a> : <span className="text-ink-muted/50">—</span>}</Td>
                      <Td>{safeHref(l.mapUrl) ? <a className="text-navy hover:underline" href={safeHref(l.mapUrl)!} target="_blank" rel="noopener noreferrer">map ↗</a> : <span className="text-ink-muted/50">—</span>}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-[26px] font-display leading-none text-ink">{value}</div>
      <div className="mt-1.5 text-[11px] uppercase tracking-eyebrow text-ink-muted">{label}</div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium text-[11px] uppercase tracking-eyebrow">{children}</th>;
}

function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-ink-soft ${className}`}>{children}</td>;
}
