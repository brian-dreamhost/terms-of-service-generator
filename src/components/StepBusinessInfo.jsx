import { BUSINESS_TYPES, COUNTRIES, US_STATES } from '../data/constants'

export default function StepBusinessInfo({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label htmlFor="businessName" className="block text-sm font-semibold text-cloudy mb-1.5">
          Business / Website Name <span className="text-coral">*</span>
        </label>
        <input
          id="businessName"
          type="text"
          value={data.businessName}
          onChange={(e) => update('businessName', e.target.value)}
          placeholder="e.g., Acme Inc."
          className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white placeholder-galactic focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
        />
      </div>

      <div>
        <label htmlFor="websiteUrl" className="block text-sm font-semibold text-cloudy mb-1.5">
          Website URL <span className="text-coral">*</span>
        </label>
        <input
          id="websiteUrl"
          type="url"
          value={data.websiteUrl}
          onChange={(e) => update('websiteUrl', e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white placeholder-galactic focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
        />
      </div>

      <div>
        <label htmlFor="businessType" className="block text-sm font-semibold text-cloudy mb-1.5">
          Business Type <span className="text-coral">*</span>
        </label>
        <select
          id="businessType"
          value={data.businessType}
          onChange={(e) => update('businessType', e.target.value)}
          className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
        >
          <option value="" className="bg-midnight">Select business type...</option>
          {BUSINESS_TYPES.map((t) => (
            <option key={t.value} value={t.value} className="bg-midnight">{t.label}</option>
          ))}
        </select>
        <p className="text-xs text-galactic mt-1">This determines which specialized clauses are included in your ToS.</p>
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-semibold text-cloudy mb-1.5">
          Country / Jurisdiction <span className="text-coral">*</span>
        </label>
        <select
          id="country"
          value={data.country}
          onChange={(e) => update('country', e.target.value)}
          className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
        >
          <option value="" className="bg-midnight">Select country...</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c} className="bg-midnight">{c}</option>
          ))}
        </select>
        <p className="text-xs text-galactic mt-1">The governing law jurisdiction for your terms.</p>
      </div>

      {data.country === 'United States' && (
        <div className="animate-fadeIn">
          <label htmlFor="state" className="block text-sm font-semibold text-cloudy mb-1.5">
            State
          </label>
          <select
            id="state"
            value={data.state}
            onChange={(e) => update('state', e.target.value)}
            className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
          >
            <option value="" className="bg-midnight">Select state...</option>
            {US_STATES.map((s) => (
              <option key={s} value={s} className="bg-midnight">{s}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
