import { STEP_LABELS } from '../data/constants'

export default function ProgressBar({ currentStep, completedSteps, onStepClick }) {
  return (
    <nav aria-label="Wizard progress" className="mb-6">
      {/* Desktop progress */}
      <div className="hidden md:flex items-center justify-between">
        {STEP_LABELS.map((label, idx) => {
          const stepNum = idx + 1
          const isCompleted = completedSteps.includes(stepNum)
          const isCurrent = currentStep === stepNum
          const isClickable = isCompleted || isCurrent || completedSteps.includes(stepNum - 1) || stepNum === 1

          return (
            <div key={label} className="flex items-center flex-1 last:flex-initial">
              <button
                type="button"
                onClick={() => isClickable && onStepClick(stepNum)}
                disabled={!isClickable}
                aria-label={`Step ${stepNum}: ${label}${isCompleted ? ' (completed)' : isCurrent ? ' (current)' : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex items-center gap-2 group transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss rounded-lg px-2 py-1 ${
                  isClickable ? 'cursor-pointer' : 'cursor-default opacity-50'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                    isCompleted
                      ? 'bg-turtle text-abyss'
                      : isCurrent
                      ? 'bg-azure text-white'
                      : 'bg-metal/30 text-galactic'
                  }`}
                >
                  {isCompleted ? (
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </span>
                <span className={`text-xs font-medium whitespace-nowrap ${
                  isCurrent ? 'text-white' : isCompleted ? 'text-turtle' : 'text-galactic'
                }`}>
                  {label}
                </span>
              </button>
              {idx < STEP_LABELS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 ${
                    isCompleted ? 'bg-turtle/40' : 'bg-metal/20'
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile progress */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-white">
            Step {currentStep} of {STEP_LABELS.length}
          </span>
          <span className="text-sm text-cloudy">
            {STEP_LABELS[currentStep - 1]}
          </span>
        </div>
        <div className="w-full bg-metal/20 rounded-full h-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={STEP_LABELS.length}>
          <div
            className="bg-azure h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / STEP_LABELS.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-1 mt-2">
          {STEP_LABELS.map((label, idx) => {
            const stepNum = idx + 1
            const isCompleted = completedSteps.includes(stepNum)
            const isCurrent = currentStep === stepNum
            return (
              <button
                key={label}
                type="button"
                onClick={() => onStepClick(stepNum)}
                aria-label={`Go to step ${stepNum}: ${label}`}
                className={`flex-1 h-1 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure ${
                  isCompleted ? 'bg-turtle' : isCurrent ? 'bg-azure' : 'bg-metal/30'
                }`}
              />
            )
          })}
        </div>
      </div>
    </nav>
  )
}
