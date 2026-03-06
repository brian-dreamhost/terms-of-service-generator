import { CONTENT_TYPES, MODERATION_APPROACHES, CONTENT_OWNERSHIP } from '../data/constants'

export default function StepContentIP({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  const toggleContentType = (type) => {
    const current = data.contentTypes || []
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type]
    update('contentTypes', updated)
  }

  return (
    <div className="space-y-5 animate-fadeIn">
      <fieldset>
        <legend className="block text-sm font-semibold text-cloudy mb-2">
          Can users post or upload content?
        </legend>
        <div className="flex gap-4">
          {['yes', 'no'].map((val) => (
            <label
              key={val}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                data.allowUserContent === val
                  ? 'border-azure bg-azure/10 text-white'
                  : 'border-metal/30 bg-midnight/30 text-galactic hover:border-metal/50'
              }`}
            >
              <input
                type="radio"
                name="allowUserContent"
                value={val}
                checked={data.allowUserContent === val}
                onChange={() => update('allowUserContent', val)}
                className="sr-only"
              />
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                data.allowUserContent === val ? 'border-azure' : 'border-metal'
              }`}>
                {data.allowUserContent === val && (
                  <span className="w-2 h-2 rounded-full bg-azure" />
                )}
              </span>
              <span className="capitalize font-medium">{val}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {data.allowUserContent === 'yes' && (
        <>
          <fieldset className="animate-fadeIn">
            <legend className="block text-sm font-semibold text-cloudy mb-2">
              What types of content can users submit?
            </legend>
            <div className="flex flex-wrap gap-2">
              {CONTENT_TYPES.map((ct) => (
                <label
                  key={ct.value}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors text-sm ${
                    (data.contentTypes || []).includes(ct.value)
                      ? 'border-azure bg-azure/10 text-white'
                      : 'border-metal/30 bg-midnight/30 text-galactic hover:border-metal/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={(data.contentTypes || []).includes(ct.value)}
                    onChange={() => toggleContentType(ct.value)}
                    className="sr-only"
                  />
                  <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                    (data.contentTypes || []).includes(ct.value)
                      ? 'border-azure bg-azure'
                      : 'border-metal'
                  }`}>
                    {(data.contentTypes || []).includes(ct.value) && (
                      <svg aria-hidden="true" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </span>
                  {ct.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="animate-fadeIn">
            <label htmlFor="moderationApproach" className="block text-sm font-semibold text-cloudy mb-1.5">
              Content Moderation Approach
            </label>
            <select
              id="moderationApproach"
              value={data.moderationApproach}
              onChange={(e) => update('moderationApproach', e.target.value)}
              className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
            >
              <option value="" className="bg-midnight">Select approach...</option>
              {MODERATION_APPROACHES.map((m) => (
                <option key={m.value} value={m.value} className="bg-midnight">{m.label}</option>
              ))}
            </select>
          </div>

          <div className="animate-fadeIn">
            <label htmlFor="contentOwnership" className="block text-sm font-semibold text-cloudy mb-1.5">
              Who owns user-generated content?
            </label>
            <select
              id="contentOwnership"
              value={data.contentOwnership}
              onChange={(e) => update('contentOwnership', e.target.value)}
              className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
            >
              {CONTENT_OWNERSHIP.map((co) => (
                <option key={co.value} value={co.value} className="bg-midnight">{co.label}</option>
              ))}
            </select>
            <p className="text-xs text-galactic mt-1">Most platforms use "user retains ownership with license" — this is the safest default.</p>
          </div>
        </>
      )}

      <fieldset>
        <legend className="block text-sm font-semibold text-cloudy mb-2">
          Do you have original content or IP to protect?
        </legend>
        <div className="flex gap-4">
          {['yes', 'no'].map((val) => (
            <label
              key={val}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                data.hasOriginalIP === val
                  ? 'border-azure bg-azure/10 text-white'
                  : 'border-metal/30 bg-midnight/30 text-galactic hover:border-metal/50'
              }`}
            >
              <input
                type="radio"
                name="hasOriginalIP"
                value={val}
                checked={data.hasOriginalIP === val}
                onChange={() => update('hasOriginalIP', val)}
                className="sr-only"
              />
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                data.hasOriginalIP === val ? 'border-azure' : 'border-metal'
              }`}>
                {data.hasOriginalIP === val && (
                  <span className="w-2 h-2 rounded-full bg-azure" />
                )}
              </span>
              <span className="capitalize font-medium">{val}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-galactic mt-1.5">Select "yes" if your site includes proprietary articles, software, images, or other copyrighted material.</p>
      </fieldset>
    </div>
  )
}
