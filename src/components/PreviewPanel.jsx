import { useState, useRef } from 'react'
import { generateTOS, sectionsToPlainText, sectionsToHTML, sectionsToMarkdown } from '../data/generateTOS'

export default function PreviewPanel({ data }) {
  const [copyFeedback, setCopyFeedback] = useState('')
  const [activeFormat, setActiveFormat] = useState('preview')
  const previewRef = useRef(null)

  const sections = generateTOS(data)
  const name = data.businessName || '[Business Name]'
  const effectiveDate = data.effectiveDate
    ? new Date(data.effectiveDate + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '[Effective Date]'

  const handleCopy = async (format) => {
    let text = ''
    if (format === 'plain') {
      text = sectionsToPlainText(sections, data)
    } else if (format === 'html') {
      text = sectionsToHTML(sections, data)
    } else if (format === 'markdown') {
      text = sectionsToMarkdown(sections, data)
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopyFeedback(format)
      setTimeout(() => setCopyFeedback(''), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopyFeedback(format)
      setTimeout(() => setCopyFeedback(''), 2000)
    }
  }

  const handleDownload = () => {
    const text = sectionsToPlainText(sections, data)
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `terms-of-service-${(data.businessName || 'document').toLowerCase().replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatButtons = [
    { key: 'plain', label: 'Copy Plain Text' },
    { key: 'html', label: 'Copy HTML' },
    { key: 'markdown', label: 'Copy Markdown' },
  ]

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Export controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        {formatButtons.map((btn) => (
          <button
            key={btn.key}
            type="button"
            onClick={() => handleCopy(btn.key)}
            className="px-3 py-1.5 text-xs font-medium bg-midnight/50 border border-metal/30 rounded-lg text-cloudy hover:text-white hover:border-metal/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
          >
            {copyFeedback === btn.key ? (
              <span className="flex items-center gap-1 text-turtle">
                <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Copied!
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                {btn.label}
              </span>
            )}
          </button>
        ))}
        <button
          type="button"
          onClick={handleDownload}
          className="px-3 py-1.5 text-xs font-medium bg-azure/10 border border-azure/30 rounded-lg text-azure hover:bg-azure/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
        >
          <span className="flex items-center gap-1">
            <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download .txt
          </span>
        </button>
      </div>

      {/* Mobile view toggle */}
      <div className="lg:hidden mb-3">
        <div className="flex rounded-lg overflow-hidden border border-metal/30" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeFormat === 'preview'}
            onClick={() => setActiveFormat('preview')}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure ${
              activeFormat === 'preview' ? 'bg-azure text-white' : 'bg-midnight/50 text-galactic hover:text-white'
            }`}
          >
            Preview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFormat === 'raw'}
            onClick={() => setActiveFormat('raw')}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure ${
              activeFormat === 'raw' ? 'bg-azure text-white' : 'bg-midnight/50 text-galactic hover:text-white'
            }`}
          >
            Raw Text
          </button>
        </div>
      </div>

      {/* Preview content */}
      <div
        ref={previewRef}
        className="flex-1 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar"
        role="region"
        aria-label="Document preview"
        aria-live="polite"
      >
        {activeFormat === 'raw' && (
          <pre className="text-xs text-cloudy whitespace-pre-wrap break-words font-mono lg:hidden overflow-x-hidden">
            {sectionsToPlainText(sections, data)}
          </pre>
        )}

        {(activeFormat === 'preview' || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
          <div className={activeFormat === 'raw' ? 'hidden lg:block' : ''}>
            {/* Document header */}
            <div className="mb-6 pb-4 border-b border-metal/20">
              <h2 className="text-xl font-bold text-white mb-1">Terms of Service</h2>
              <p className="text-sm text-cloudy">{name}</p>
              <p className="text-xs text-galactic mt-1">Last Updated: {effectiveDate}</p>
            </div>

            {/* Table of contents */}
            {sections.length > 0 && (
              <div className="mb-6 p-3 bg-midnight/30 rounded-lg border border-metal/10">
                <p className="text-xs font-semibold text-galactic uppercase tracking-wider mb-2">Table of Contents</p>
                <nav aria-label="Table of contents">
                  <ol className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#preview-${section.id}`}
                          className="text-xs text-azure hover:text-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                            const el = document.getElementById(`preview-${section.id}`)
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }}
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            )}

            {/* Sections */}
            {sections.map((section) => (
              <div key={section.id} id={`preview-${section.id}`} className="mb-6">
                <h3 className="text-sm font-bold text-white mb-2">{section.title}</h3>
                <div className="text-xs text-cloudy leading-relaxed whitespace-pre-wrap break-words">
                  {section.content}
                </div>
              </div>
            ))}

            {sections.length === 0 && (
              <div className="text-center py-12">
                <svg aria-hidden="true" className="w-12 h-12 text-metal/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <p className="text-sm text-galactic">Complete the wizard steps to preview your Terms of Service</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
