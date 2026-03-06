import { useState, useCallback } from 'react'
import { DEFAULT_FORM_DATA, TEST_DATA, STEP_LABELS } from './data/constants'
import ProgressBar from './components/ProgressBar'
import PreviewPanel from './components/PreviewPanel'
import StepBusinessInfo from './components/StepBusinessInfo'
import StepUserAccounts from './components/StepUserAccounts'
import StepContentIP from './components/StepContentIP'
import StepPayments from './components/StepPayments'
import StepLiability from './components/StepLiability'
import StepDisputes from './components/StepDisputes'
import StepAdditional from './components/StepAdditional'

export default function App() {
  const [formData, setFormData] = useState({ ...DEFAULT_FORM_DATA })
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([])
  const [mobileView, setMobileView] = useState('wizard') // 'wizard' | 'preview'

  const totalSteps = STEP_LABELS.length

  const fillTestData = useCallback(() => {
    setFormData({ ...TEST_DATA })
    setCompletedSteps([1, 2, 3, 4, 5, 6, 7])
  }, [])

  const handleStepClick = useCallback((step) => {
    setCurrentStep(step)
  }, [])

  const handleNext = useCallback(() => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep])
    }
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }, [currentStep, completedSteps, totalSteps])

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const handleFormChange = useCallback((newData) => {
    setFormData(newData)
  }, [])

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepBusinessInfo data={formData} onChange={handleFormChange} />
      case 2:
        return <StepUserAccounts data={formData} onChange={handleFormChange} />
      case 3:
        return <StepContentIP data={formData} onChange={handleFormChange} />
      case 4:
        return <StepPayments data={formData} onChange={handleFormChange} />
      case 5:
        return <StepLiability data={formData} onChange={handleFormChange} />
      case 6:
        return <StepDisputes data={formData} onChange={handleFormChange} />
      case 7:
        return <StepAdditional data={formData} onChange={handleFormChange} />
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.websiteUrl && formData.businessType && formData.country
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-abyss bg-glow bg-grid">
      <div id="main" className="max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fadeIn">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-galactic" aria-label="Breadcrumb">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors">Free Tools</a>
          <span className="mx-2 text-metal">/</span>
          <a href="https://seo-tools-tau.vercel.app/legal-compliance/" className="text-azure hover:text-white transition-colors">Legal &amp; Compliance</a>
          <span className="mx-2 text-metal">/</span>
          <span className="text-cloudy">Terms of Service Generator</span>
        </nav>

        {/* Legal Disclaimer Banner */}
        <div className="border border-metal/30 rounded-xl p-4 bg-midnight/30 mb-8">
          <div className="flex items-start gap-3">
            <svg aria-hidden="true" className="w-5 h-5 text-galactic flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <div>
              <p className="text-cloudy text-sm font-semibold mb-1">Not Legal Advice</p>
              <p className="text-galactic text-sm leading-relaxed">
                This tool generates templates and general guidance for informational purposes only, not legal advice. No attorney-client relationship is created. Laws vary by jurisdiction and change over time. Consult a qualified attorney before publishing any generated document. DreamHost provides this tool as-is with no warranty of legal accuracy or completeness.
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Terms of Service Generator</h1>
            <p className="text-cloudy text-base max-w-2xl">
              Create a complete, customized Terms of Service document for your website or app. Answer a few questions about your business, and we will generate a professional ToS tailored to your specific needs.
            </p>
          </div>
          <button
            type="button"
            onClick={fillTestData}
            className="px-3 py-1.5 text-xs font-mono bg-prince/20 text-prince border border-prince/30 rounded hover:bg-prince/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-prince focus-visible:ring-offset-2 focus-visible:ring-offset-abyss whitespace-nowrap self-start"
          >
            Fill Test Data
          </button>
        </div>

        {/* Mobile view toggle */}
        <div className="lg:hidden mb-4">
          <div className="flex rounded-lg overflow-hidden border border-metal/30" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mobileView === 'wizard'}
              onClick={() => setMobileView('wizard')}
              className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure ${
                mobileView === 'wizard' ? 'bg-azure text-white' : 'bg-midnight/50 text-galactic hover:text-white'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                Wizard
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobileView === 'preview'}
              onClick={() => setMobileView('preview')}
              className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure ${
                mobileView === 'preview' ? 'bg-azure text-white' : 'bg-midnight/50 text-galactic hover:text-white'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                Preview
              </span>
            </button>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Wizard panel */}
          <div className={`lg:w-[42%] min-w-0 ${mobileView === 'preview' ? 'hidden lg:block' : ''}`}>
            <div className="card-gradient border border-metal/20 rounded-2xl p-4 md:p-6">
              <ProgressBar
                currentStep={currentStep}
                completedSteps={completedSteps}
                onStepClick={handleStepClick}
              />

              {/* Step title */}
              <div className="mb-5">
                <h2 className="text-lg font-bold text-white">
                  {STEP_LABELS[currentStep - 1]}
                </h2>
                <p className="text-xs text-galactic mt-0.5">
                  Step {currentStep} of {totalSteps}
                </p>
              </div>

              {/* Step content */}
              <div className="mb-6">
                {renderStep()}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-metal/20">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss ${
                    currentStep === 1
                      ? 'text-metal cursor-not-allowed'
                      : 'text-cloudy hover:text-white border border-metal/30 hover:border-metal/50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Previous
                  </span>
                </button>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss ${
                      canProceed()
                        ? 'bg-azure text-white hover:bg-azure-hover'
                        : 'bg-metal/30 text-galactic cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      Next
                      <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (!completedSteps.includes(currentStep)) {
                        setCompletedSteps((prev) => [...prev, currentStep])
                      }
                      setMobileView('preview')
                    }}
                    className="px-5 py-2 text-sm font-medium rounded-lg bg-turtle text-abyss hover:bg-turtle/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-turtle focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
                  >
                    <span className="flex items-center gap-1.5">
                      <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Generate Document
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Completed steps summary */}
            {completedSteps.length > 0 && (
              <div className="mt-4 space-y-2">
                {completedSteps
                  .filter((s) => s !== currentStep)
                  .sort((a, b) => a - b)
                  .map((stepNum) => (
                    <button
                      key={stepNum}
                      type="button"
                      onClick={() => handleStepClick(stepNum)}
                      className="w-full flex items-center justify-between px-4 py-2.5 bg-midnight/30 border border-metal/10 rounded-xl text-left hover:border-metal/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-turtle flex items-center justify-center flex-shrink-0">
                          <svg aria-hidden="true" className="w-3 h-3 text-abyss" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                        <span className="text-sm text-cloudy group-hover:text-white transition-colors">
                          {STEP_LABELS[stepNum - 1]}
                        </span>
                      </div>
                      <svg aria-hidden="true" className="w-4 h-4 text-metal group-hover:text-galactic transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
                      </svg>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Preview panel */}
          <div className={`lg:w-[58%] min-w-0 ${mobileView === 'wizard' ? 'hidden lg:block' : ''}`}>
            <div className="card-gradient border border-metal/20 rounded-2xl p-4 md:p-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <svg aria-hidden="true" className="w-5 h-5 text-azure" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  Live Preview
                </h2>
                <span className="text-xs text-galactic">Updates as you type</span>
              </div>
              <PreviewPanel data={formData} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-metal/30 text-center">
          <p className="text-sm text-galactic">
            Built by{' '}
            <a
              href="https://www.dreamhost.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-azure hover:text-white transition-colors"
            >
              DreamHost
            </a>
            {' '}— Free tools for website owners and marketers.
          </p>
          <p className="text-xs text-metal mt-2">
            This tool generates templates for informational purposes only. Consult a licensed attorney for legal advice.
          </p>
        </footer>
      </div>
    </div>
  )
}
