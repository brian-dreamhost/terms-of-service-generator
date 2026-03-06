import { AGE_REQUIREMENTS } from '../data/constants'

export default function StepUserAccounts({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="space-y-5 animate-fadeIn">
      <fieldset>
        <legend className="block text-sm font-semibold text-cloudy mb-2">
          Does your site require user accounts?
        </legend>
        <div className="flex gap-4">
          {['yes', 'no'].map((val) => (
            <label
              key={val}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                data.requireAccounts === val
                  ? 'border-azure bg-azure/10 text-white'
                  : 'border-metal/30 bg-midnight/30 text-galactic hover:border-metal/50'
              }`}
            >
              <input
                type="radio"
                name="requireAccounts"
                value={val}
                checked={data.requireAccounts === val}
                onChange={() => update('requireAccounts', val)}
                className="sr-only"
              />
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                data.requireAccounts === val ? 'border-azure' : 'border-metal'
              }`}>
                {data.requireAccounts === val && (
                  <span className="w-2 h-2 rounded-full bg-azure" />
                )}
              </span>
              <span className="capitalize font-medium">{val}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="minimumAge" className="block text-sm font-semibold text-cloudy mb-1.5">
          Minimum Age Requirement
        </label>
        <select
          id="minimumAge"
          value={data.minimumAge}
          onChange={(e) => update('minimumAge', e.target.value)}
          className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
        >
          {AGE_REQUIREMENTS.map((a) => (
            <option key={a.value} value={a.value} className="bg-midnight">{a.label}</option>
          ))}
        </select>
        <p className="text-xs text-galactic mt-1">COPPA requires parental consent for users under 13; GDPR sets 16 as the minimum for data processing consent.</p>
      </div>

      {data.requireAccounts === 'yes' && (
        <>
          <fieldset className="animate-fadeIn">
            <legend className="block text-sm font-semibold text-cloudy mb-2">
              Can users create public profiles?
            </legend>
            <div className="flex gap-4">
              {['yes', 'no'].map((val) => (
                <label
                  key={val}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                    data.publicProfiles === val
                      ? 'border-azure bg-azure/10 text-white'
                      : 'border-metal/30 bg-midnight/30 text-galactic hover:border-metal/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="publicProfiles"
                    value={val}
                    checked={data.publicProfiles === val}
                    onChange={() => update('publicProfiles', val)}
                    className="sr-only"
                  />
                  <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    data.publicProfiles === val ? 'border-azure' : 'border-metal'
                  }`}>
                    {data.publicProfiles === val && (
                      <span className="w-2 h-2 rounded-full bg-azure" />
                    )}
                  </span>
                  <span className="capitalize font-medium">{val}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="animate-fadeIn">
            <legend className="block text-sm font-semibold text-cloudy mb-2">
              Single sign-on / social login?
            </legend>
            <div className="flex gap-4">
              {['yes', 'no'].map((val) => (
                <label
                  key={val}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                    data.socialLogin === val
                      ? 'border-azure bg-azure/10 text-white'
                      : 'border-metal/30 bg-midnight/30 text-galactic hover:border-metal/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="socialLogin"
                    value={val}
                    checked={data.socialLogin === val}
                    onChange={() => update('socialLogin', val)}
                    className="sr-only"
                  />
                  <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    data.socialLogin === val ? 'border-azure' : 'border-metal'
                  }`}>
                    {data.socialLogin === val && (
                      <span className="w-2 h-2 rounded-full bg-azure" />
                    )}
                  </span>
                  <span className="capitalize font-medium">{val}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-galactic mt-1.5">If users can log in via Google, Facebook, etc., a third-party auth clause will be included.</p>
          </fieldset>
        </>
      )}
    </div>
  )
}
