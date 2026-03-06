export const BUSINESS_TYPES = [
  { value: 'blog', label: 'Blog / Content Site' },
  { value: 'ecommerce', label: 'E-commerce Store' },
  { value: 'saas', label: 'SaaS / Web Application' },
  { value: 'marketplace', label: 'Marketplace / Platform' },
  { value: 'service', label: 'Service Business' },
  { value: 'agency', label: 'Agency' },
  { value: 'nonprofit', label: 'Non-profit' },
  { value: 'other', label: 'Other' },
]

export const AGE_REQUIREMENTS = [
  { value: 'none', label: 'No minimum age' },
  { value: '13', label: '13 years (COPPA compliance)' },
  { value: '16', label: '16 years (GDPR compliance)' },
  { value: '18', label: '18 years (Adult content / legal age)' },
]

export const CONTENT_TYPES = [
  { value: 'comments', label: 'Comments' },
  { value: 'reviews', label: 'Reviews' },
  { value: 'images', label: 'Images' },
  { value: 'videos', label: 'Videos' },
  { value: 'files', label: 'Files / Documents' },
]

export const MODERATION_APPROACHES = [
  { value: 'pre', label: 'Pre-moderation (reviewed before publishing)' },
  { value: 'post', label: 'Post-moderation (reviewed after publishing)' },
  { value: 'community', label: 'Community reporting' },
  { value: 'automated', label: 'Automated moderation' },
]

export const CONTENT_OWNERSHIP = [
  { value: 'user', label: 'User retains ownership (you get a license)' },
  { value: 'company', label: 'Your company owns submitted content' },
  { value: 'shared', label: 'Shared ownership' },
]

export const PAYMENT_MODELS = [
  { value: 'one-time', label: 'One-time purchase' },
  { value: 'subscription', label: 'Subscription' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'pay-per-use', label: 'Pay-per-use' },
]

export const REFUND_POLICIES = [
  { value: 'yes', label: 'Yes — link to separate refund policy' },
  { value: 'no', label: 'No refunds' },
  { value: 'case-by-case', label: 'Case-by-case basis' },
]

export const UPTIME_OPTIONS = [
  { value: 'sla', label: 'Yes, with SLA (e.g., 99.9%)' },
  { value: 'best-effort', label: 'Best effort' },
  { value: 'none', label: 'No guarantee' },
]

export const LIABILITY_CAPS = [
  { value: 'fees-paid', label: 'Fees paid in prior 12 months' },
  { value: 'fixed', label: 'Fixed dollar amount' },
  { value: 'no-cap', label: 'No cap specified' },
]

export const WARRANTY_TYPES = [
  { value: 'as-is', label: 'As-is (no warranties)' },
  { value: 'limited', label: 'Limited warranty' },
  { value: 'satisfaction', label: 'Satisfaction guarantee' },
]

export const DISPUTE_METHODS = [
  { value: 'litigation', label: 'Litigation (courts)' },
  { value: 'arbitration', label: 'Binding arbitration' },
  { value: 'mediation-arbitration', label: 'Mediation, then arbitration' },
]

export const ADDITIONAL_CLAUSES = [
  { value: 'acceptable-use', label: 'Acceptable Use Policy' },
  { value: 'anti-spam', label: 'Anti-spam Provisions' },
  { value: 'api-terms', label: 'API Usage Terms' },
  { value: 'third-party-links', label: 'Third-party Links Disclaimer' },
  { value: 'force-majeure', label: 'Force Majeure' },
  { value: 'severability', label: 'Severability' },
  { value: 'entire-agreement', label: 'Entire Agreement Clause' },
  { value: 'assignment', label: 'Assignment Rights' },
  { value: 'notice', label: 'Notice Provisions (email notification of changes)' },
]

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia',
]

export const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Netherlands', 'Ireland', 'Singapore', 'India', 'Brazil',
  'Japan', 'South Korea', 'Mexico', 'Spain', 'Italy', 'Sweden',
  'Norway', 'Denmark', 'Finland', 'New Zealand', 'Switzerland',
  'Belgium', 'Austria', 'Portugal', 'Poland', 'Czech Republic',
  'Israel', 'South Africa', 'UAE', 'Other',
]

export const CURRENCIES = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'CAD', label: 'CAD (C$)' },
  { value: 'AUD', label: 'AUD (A$)' },
  { value: 'JPY', label: 'JPY (¥)' },
  { value: 'INR', label: 'INR (₹)' },
  { value: 'BRL', label: 'BRL (R$)' },
  { value: 'CHF', label: 'CHF (Fr.)' },
  { value: 'Other', label: 'Other' },
]

export const STEP_LABELS = [
  'Business Info',
  'User Accounts',
  'Content & IP',
  'Payments',
  'Liability',
  'Disputes',
  'Additional',
]

export const DEFAULT_FORM_DATA = {
  // Step 1
  businessName: '',
  websiteUrl: '',
  businessType: '',
  country: '',
  state: '',
  // Step 2
  requireAccounts: 'no',
  minimumAge: 'none',
  publicProfiles: 'no',
  socialLogin: 'no',
  // Step 3
  allowUserContent: 'no',
  contentTypes: [],
  moderationApproach: '',
  contentOwnership: 'user',
  hasOriginalIP: 'yes',
  // Step 4
  acceptPayments: 'no',
  paymentModel: '',
  offerFreeTrial: 'no',
  freeTrialDuration: '14',
  autoRenewal: 'no',
  refundPolicy: 'case-by-case',
  currency: 'USD',
  // Step 5
  uptimeGuarantee: 'best-effort',
  liabilityCap: 'fees-paid',
  fixedLiabilityAmount: '',
  warrantyType: 'as-is',
  indemnification: 'yes',
  // Step 6
  disputeMethod: 'litigation',
  classActionWaiver: 'no',
  governingLawJurisdiction: '',
  forumSelection: '',
  // Step 7
  additionalClauses: ['severability', 'entire-agreement', 'third-party-links'],
  effectiveDate: new Date().toISOString().split('T')[0],
}

export const TEST_DATA = {
  // Step 1
  businessName: 'CloudStream Technologies',
  websiteUrl: 'https://cloudstream.io',
  businessType: 'saas',
  country: 'United States',
  state: 'California',
  // Step 2
  requireAccounts: 'yes',
  minimumAge: '13',
  publicProfiles: 'yes',
  socialLogin: 'yes',
  // Step 3
  allowUserContent: 'yes',
  contentTypes: ['comments', 'images', 'files'],
  moderationApproach: 'post',
  contentOwnership: 'user',
  hasOriginalIP: 'yes',
  // Step 4
  acceptPayments: 'yes',
  paymentModel: 'subscription',
  offerFreeTrial: 'yes',
  freeTrialDuration: '14',
  autoRenewal: 'yes',
  refundPolicy: 'case-by-case',
  currency: 'USD',
  // Step 5
  uptimeGuarantee: 'sla',
  liabilityCap: 'fees-paid',
  fixedLiabilityAmount: '',
  warrantyType: 'as-is',
  indemnification: 'yes',
  // Step 6
  disputeMethod: 'arbitration',
  classActionWaiver: 'yes',
  governingLawJurisdiction: 'State of California',
  forumSelection: 'San Francisco, California',
  // Step 7
  additionalClauses: ['acceptable-use', 'api-terms', 'third-party-links', 'force-majeure', 'severability', 'entire-agreement', 'notice'],
  effectiveDate: new Date().toISOString().split('T')[0],
}
