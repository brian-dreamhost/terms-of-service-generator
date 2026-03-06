import { PAYMENT_MODELS, REFUND_POLICIES, CURRENCIES } from '../data/constants'

export default function StepPayments({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="space-y-5 animate-fadeIn">
      <fieldset>
        <legend className="block text-sm font-semibold text-cloudy mb-2">
          Do you accept payments?
        </legend>
        <div className="flex gap-4">
          {['yes', 'no'].map((val) => (
            <label
              key={val}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                data.acceptPayments === val
                  ? 'border-azure bg-azure/10 text-white'
                  : 'border-metal/30 bg-midnight/30 text-galactic hover:border-metal/50'
              }`}
            >
              <input
                type="radio"
                name="acceptPayments"
                value={val}
                checked={data.acceptPayments === val}
                onChange={() => update('acceptPayments', val)}
                className="sr-only"
              />
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                data.acceptPayments === val ? 'border-azure' : 'border-metal'
              }`}>
                {data.acceptPayments === val && (
                  <span className="w-2 h-2 rounded-full bg-azure" />
                )}
              </span>
              <span className="capitalize font-medium">{val}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {data.acceptPayments === 'yes' && (
        <>
          <div className="animate-fadeIn">
            <label htmlFor="paymentModel" className="block text-sm font-semibold text-cloudy mb-1.5">
              Payment Model
            </label>
            <select
              id="paymentModel"
              value={data.paymentModel}
              onChange={(e) => update('paymentModel', e.target.value)}
              className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
            >
              <option value="" className="bg-midnight">Select model...</option>
              {PAYMENT_MODELS.map((pm) => (
                <option key={pm.value} value={pm.value} className="bg-midnight">{pm.label}</option>
              ))}
            </select>
          </div>

          <div className="animate-fadeIn">
            <label htmlFor="currency" className="block text-sm font-semibold text-cloudy mb-1.5">
              Currency
            </label>
            <select
              id="currency"
              value={data.currency}
              onChange={(e) => update('currency', e.target.value)}
              className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
            >
              {CURRENCIES.map((c) => (
                <option key={c.value} value={c.value} className="bg-midnight">{c.label}</option>
              ))}
            </select>
          </div>

          <fieldset className="animate-fadeIn">
            <legend className="block text-sm font-semibold text-cloudy mb-2">
              Do you offer free trials?
            </legend>
            <div className="flex gap-4">
              {['yes', 'no'].map((val) => (
                <label
                  key={val}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                    data.offerFreeTrial === val
                      ? 'border-azure bg-azure/10 text-white'
                      : 'border-metal/30 bg-midnight/30 text-galactic hover:border-metal/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="offerFreeTrial"
                    value={val}
                    checked={data.offerFreeTrial === val}
                    onChange={() => update('offerFreeTrial', val)}
                    className="sr-only"
                  />
                  <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    data.offerFreeTrial === val ? 'border-azure' : 'border-metal'
                  }`}>
                    {data.offerFreeTrial === val && (
                      <span className="w-2 h-2 rounded-full bg-azure" />
                    )}
                  </span>
                  <span className="capitalize font-medium">{val}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {data.offerFreeTrial === 'yes' && (
            <div className="animate-fadeIn">
              <label htmlFor="freeTrialDuration" className="block text-sm font-semibold text-cloudy mb-1.5">
                Free Trial Duration (days)
              </label>
              <input
                id="freeTrialDuration"
                type="number"
                min="1"
                max="365"
                value={data.freeTrialDuration}
                onChange={(e) => update('freeTrialDuration', e.target.value)}
                className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white placeholder-galactic focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
              />
            </div>
          )}

          {(data.paymentModel === 'subscription' || data.paymentModel === 'freemium') && (
            <fieldset className="animate-fadeIn">
              <legend className="block text-sm font-semibold text-cloudy mb-2">
                Auto-renewal?
              </legend>
              <div className="flex gap-4">
                {['yes', 'no'].map((val) => (
                  <label
                    key={val}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                      data.autoRenewal === val
                        ? 'border-azure bg-azure/10 text-white'
                        : 'border-metal/30 bg-midnight/30 text-galactic hover:border-metal/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="autoRenewal"
                      value={val}
                      checked={data.autoRenewal === val}
                      onChange={() => update('autoRenewal', val)}
                      className="sr-only"
                    />
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      data.autoRenewal === val ? 'border-azure' : 'border-metal'
                    }`}>
                      {data.autoRenewal === val && (
                        <span className="w-2 h-2 rounded-full bg-azure" />
                      )}
                    </span>
                    <span className="capitalize font-medium">{val}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-galactic mt-1.5">Many jurisdictions require clear auto-renewal disclosure. We recommend selecting "yes" and being transparent.</p>
            </fieldset>
          )}

          <div className="animate-fadeIn">
            <label htmlFor="refundPolicy" className="block text-sm font-semibold text-cloudy mb-1.5">
              Refund Policy
            </label>
            <select
              id="refundPolicy"
              value={data.refundPolicy}
              onChange={(e) => update('refundPolicy', e.target.value)}
              className="w-full px-4 py-2.5 bg-midnight/50 border border-metal/30 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors"
            >
              {REFUND_POLICIES.map((rp) => (
                <option key={rp.value} value={rp.value} className="bg-midnight">{rp.label}</option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  )
}
