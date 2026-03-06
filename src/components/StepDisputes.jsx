import { DISPUTE_METHODS } from '../data/constants'

export default function StepDisputes({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label htmlFor="disputeMethod" className="block text-sm font-semibold text-cloudy mb-1.5">
          Dispute Resolution Method
        </label>
        <select
          id="disputeMethod"
          value={data.disputeMethod}
          onChange={(e) => update('disputeMethod', e.target.value)}
          className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
        >
          {DISPUTE_METHODS.map((dm) => (
            <option key={dm.value} value={dm.value} className="bg-midnight">{dm.label}</option>
          ))}
        </select>
        <p className="text-xs text-galactic mt-1">
          {data.disputeMethod === 'litigation' && 'Traditional court litigation. Users can file lawsuits in the jurisdiction you specify.'}
          {data.disputeMethod === 'arbitration' && 'Binding arbitration is typically faster and cheaper than litigation, and decisions are final.'}
          {data.disputeMethod === 'mediation-arbitration' && 'A two-step process: parties first attempt mediation, then escalate to binding arbitration if needed.'}
        </p>
      </div>

      <fieldset>
        <legend className="block text-sm font-semibold text-cloudy mb-2">
          Class action waiver?
        </legend>
        <div className="flex gap-4">
          {['yes', 'no'].map((val) => (
            <label
              key={val}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                data.classActionWaiver === val
                  ? 'border-azure bg-azure/10 text-white'
                  : 'border-metal/30 bg-midnight/30 text-galactic hover:border-metal/50'
              }`}
            >
              <input
                type="radio"
                name="classActionWaiver"
                value={val}
                checked={data.classActionWaiver === val}
                onChange={() => update('classActionWaiver', val)}
                className="sr-only"
              />
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                data.classActionWaiver === val ? 'border-azure' : 'border-metal'
              }`}>
                {data.classActionWaiver === val && (
                  <span className="w-2 h-2 rounded-full bg-azure" />
                )}
              </span>
              <span className="capitalize font-medium">{val}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-galactic mt-1.5">A class action waiver prevents users from joining together in a lawsuit. Common in US-based SaaS and e-commerce. Note: enforceability varies by jurisdiction.</p>
      </fieldset>

      <div>
        <label htmlFor="governingLawJurisdiction" className="block text-sm font-semibold text-cloudy mb-1.5">
          Governing Law Jurisdiction
        </label>
        <input
          id="governingLawJurisdiction"
          type="text"
          value={data.governingLawJurisdiction}
          onChange={(e) => update('governingLawJurisdiction', e.target.value)}
          placeholder="e.g., State of Delaware, England and Wales"
          className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white placeholder-galactic focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
        />
        <p className="text-xs text-galactic mt-1">The legal jurisdiction whose laws will govern interpretation of these terms. Delaware and California are common for US businesses.</p>
      </div>

      <div>
        <label htmlFor="forumSelection" className="block text-sm font-semibold text-cloudy mb-1.5">
          Forum Selection (Courts / Venue)
        </label>
        <input
          id="forumSelection"
          type="text"
          value={data.forumSelection}
          onChange={(e) => update('forumSelection', e.target.value)}
          placeholder="e.g., San Francisco, California"
          className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white placeholder-galactic focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
        />
        <p className="text-xs text-galactic mt-1">Where disputes will be heard. Typically the city/state where your business is headquartered.</p>
      </div>
    </div>
  )
}
