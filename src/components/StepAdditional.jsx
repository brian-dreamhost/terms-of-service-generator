import { ADDITIONAL_CLAUSES } from '../data/constants'

export default function StepAdditional({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  const toggleClause = (clause) => {
    const current = data.additionalClauses || []
    const updated = current.includes(clause)
      ? current.filter((c) => c !== clause)
      : [...current, clause]
    update('additionalClauses', updated)
  }

  // Filter API terms to only show for SaaS
  const filteredClauses = ADDITIONAL_CLAUSES.filter((c) => {
    if (c.value === 'api-terms' && data.businessType !== 'saas') return false
    return true
  })

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <p className="text-sm font-semibold text-cloudy mb-3">
          Select additional clauses to include:
        </p>
        <div className="space-y-2">
          {filteredClauses.map((clause) => (
            <label
              key={clause.value}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                (data.additionalClauses || []).includes(clause.value)
                  ? 'border-azure bg-azure/10 text-white'
                  : 'border-metal/30 bg-midnight/30 text-cloudy hover:border-metal/50'
              }`}
            >
              <input
                type="checkbox"
                checked={(data.additionalClauses || []).includes(clause.value)}
                onChange={() => toggleClause(clause.value)}
                className="sr-only"
              />
              <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                (data.additionalClauses || []).includes(clause.value)
                  ? 'border-azure bg-azure'
                  : 'border-metal'
              }`}>
                {(data.additionalClauses || []).includes(clause.value) && (
                  <svg aria-hidden="true" className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </span>
              <span className="text-sm font-medium">{clause.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="effectiveDate" className="block text-sm font-semibold text-cloudy mb-1.5">
          Effective Date
        </label>
        <input
          id="effectiveDate"
          type="date"
          value={data.effectiveDate}
          onChange={(e) => update('effectiveDate', e.target.value)}
          className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors [color-scheme:dark]"
        />
        <p className="text-xs text-galactic mt-1">The date these terms become legally effective. Defaults to today.</p>
      </div>

      <div className="border border-turtle/20 bg-turtle/5 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <svg aria-hidden="true" className="w-5 h-5 text-turtle flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-turtle">Recommended Minimum</p>
            <p className="text-xs text-galactic mt-0.5">Severability, Entire Agreement, and Third-party Links are included in most professional Terms of Service. We recommend keeping them selected.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
