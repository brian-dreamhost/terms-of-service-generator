import { UPTIME_OPTIONS, LIABILITY_CAPS, WARRANTY_TYPES } from '../data/constants'

export default function StepLiability({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label htmlFor="uptimeGuarantee" className="block text-sm font-semibold text-cloudy mb-1.5">
          Service Uptime Guarantee
        </label>
        <select
          id="uptimeGuarantee"
          value={data.uptimeGuarantee}
          onChange={(e) => update('uptimeGuarantee', e.target.value)}
          className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
        >
          {UPTIME_OPTIONS.map((u) => (
            <option key={u.value} value={u.value} className="bg-midnight">{u.label}</option>
          ))}
        </select>
        <p className="text-xs text-galactic mt-1">An SLA creates binding uptime commitments. "Best effort" is the safer choice for most businesses.</p>
      </div>

      <div>
        <label htmlFor="liabilityCap" className="block text-sm font-semibold text-cloudy mb-1.5">
          Limitation of Liability Cap
        </label>
        <select
          id="liabilityCap"
          value={data.liabilityCap}
          onChange={(e) => update('liabilityCap', e.target.value)}
          className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
        >
          {LIABILITY_CAPS.map((lc) => (
            <option key={lc.value} value={lc.value} className="bg-midnight">{lc.label}</option>
          ))}
        </select>
        <p className="text-xs text-galactic mt-1">Capping liability to fees paid in the prior 12 months is the industry standard for SaaS and subscription services.</p>
      </div>

      {data.liabilityCap === 'fixed' && (
        <div className="animate-fadeIn">
          <label htmlFor="fixedLiabilityAmount" className="block text-sm font-semibold text-cloudy mb-1.5">
            Fixed Liability Amount ({data.currency || 'USD'})
          </label>
          <input
            id="fixedLiabilityAmount"
            type="text"
            value={data.fixedLiabilityAmount}
            onChange={(e) => update('fixedLiabilityAmount', e.target.value)}
            placeholder="e.g., 10,000"
            className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white placeholder-galactic focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
          />
        </div>
      )}

      <div>
        <label htmlFor="warrantyType" className="block text-sm font-semibold text-cloudy mb-1.5">
          Warranty Disclaimer Type
        </label>
        <select
          id="warrantyType"
          value={data.warrantyType}
          onChange={(e) => update('warrantyType', e.target.value)}
          className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
        >
          {WARRANTY_TYPES.map((wt) => (
            <option key={wt.value} value={wt.value} className="bg-midnight">{wt.label}</option>
          ))}
        </select>
        <p className="text-xs text-galactic mt-1">"As-is" is the strongest protection for your business. Limited warranty or satisfaction guarantee may increase user trust.</p>
      </div>

      <fieldset>
        <legend className="block text-sm font-semibold text-cloudy mb-2">
          Include indemnification clause?
        </legend>
        <div className="flex gap-4">
          {['yes', 'no'].map((val) => (
            <label
              key={val}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                data.indemnification === val
                  ? 'border-azure bg-azure/10 text-white'
                  : 'border-metal/30 bg-midnight/30 text-galactic hover:border-metal/50'
              }`}
            >
              <input
                type="radio"
                name="indemnification"
                value={val}
                checked={data.indemnification === val}
                onChange={() => update('indemnification', val)}
                className="sr-only"
              />
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                data.indemnification === val ? 'border-azure' : 'border-metal'
              }`}>
                {data.indemnification === val && (
                  <span className="w-2 h-2 rounded-full bg-azure" />
                )}
              </span>
              <span className="capitalize font-medium">{val}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-galactic mt-1.5">Indemnification requires users to cover your legal costs if their actions cause you liability. Recommended for most businesses.</p>
      </fieldset>
    </div>
  )
}
