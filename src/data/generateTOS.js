/**
 * Generates a complete Terms of Service document based on form data.
 * Returns an array of sections, each with { id, title, content }.
 */
export function generateTOS(data) {
  const sections = []
  const name = data.businessName || '[Business Name]'
  const url = data.websiteUrl || '[Website URL]'
  const effectiveDate = data.effectiveDate
    ? new Date(data.effectiveDate + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '[Effective Date]'
  const jurisdiction = data.governingLawJurisdiction || data.state || data.country || '[Jurisdiction]'
  const forum = data.forumSelection || jurisdiction

  // 1. Agreement to Terms
  sections.push({
    id: 'agreement',
    title: '1. Agreement to Terms',
    content: buildAgreementSection(name, url, effectiveDate),
  })

  // 2. Description of Service
  sections.push({
    id: 'service',
    title: '2. Description of Service',
    content: buildServiceSection(name, data.businessType),
  })

  // 3. User Accounts (conditional)
  if (data.requireAccounts === 'yes') {
    sections.push({
      id: 'accounts',
      title: `${sections.length + 1}. User Accounts`,
      content: buildAccountsSection(name, data),
    })
  }

  // 4. User Content (conditional)
  if (data.allowUserContent === 'yes') {
    sections.push({
      id: 'user-content',
      title: `${sections.length + 1}. User Content`,
      content: buildUserContentSection(name, data),
    })
  }

  // 5. Intellectual Property
  sections.push({
    id: 'ip',
    title: `${sections.length + 1}. Intellectual Property`,
    content: buildIPSection(name, url, data),
  })

  // 6. Payments (conditional)
  if (data.acceptPayments === 'yes') {
    sections.push({
      id: 'payments',
      title: `${sections.length + 1}. Payments and Billing`,
      content: buildPaymentsSection(name, data),
    })
  }

  // 7. Prohibited Activities
  sections.push({
    id: 'prohibited',
    title: `${sections.length + 1}. Prohibited Activities`,
    content: buildProhibitedSection(name, data),
  })

  // 8. Limitation of Liability
  sections.push({
    id: 'liability',
    title: `${sections.length + 1}. Limitation of Liability`,
    content: buildLiabilitySection(name, data),
  })

  // 9. Warranty Disclaimer
  sections.push({
    id: 'warranty',
    title: `${sections.length + 1}. Warranty Disclaimer`,
    content: buildWarrantySection(name, data),
  })

  // 10. Indemnification (conditional)
  if (data.indemnification === 'yes') {
    sections.push({
      id: 'indemnification',
      title: `${sections.length + 1}. Indemnification`,
      content: buildIndemnificationSection(name),
    })
  }

  // 11. Dispute Resolution
  sections.push({
    id: 'disputes',
    title: `${sections.length + 1}. Dispute Resolution`,
    content: buildDisputeSection(name, data, jurisdiction, forum),
  })

  // 12. Termination
  sections.push({
    id: 'termination',
    title: `${sections.length + 1}. Termination`,
    content: buildTerminationSection(name, data),
  })

  // 13. Changes to Terms
  sections.push({
    id: 'changes',
    title: `${sections.length + 1}. Changes to Terms`,
    content: buildChangesSection(name, data),
  })

  // 14. General Provisions
  if (data.additionalClauses && data.additionalClauses.length > 0) {
    sections.push({
      id: 'general',
      title: `${sections.length + 1}. General Provisions`,
      content: buildGeneralSection(name, data),
    })
  }

  // 15. Contact Information
  sections.push({
    id: 'contact',
    title: `${sections.length + 1}. Contact Information`,
    content: buildContactSection(name, url),
  })

  return sections
}

function buildAgreementSection(name, url, effectiveDate) {
  return `These Terms of Service ("Terms") govern your access to and use of the website located at ${url} and any related services provided by ${name} (collectively, the "Service").

By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Service.

These Terms are effective as of ${effectiveDate}.

By creating an account, making a purchase, or otherwise using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy, which is incorporated herein by reference.`
}

function buildServiceSection(name, businessType) {
  const typeDescriptions = {
    blog: `${name} provides a content publishing platform and related informational services. The Service includes articles, blog posts, media content, and associated features available through our website.`,
    ecommerce: `${name} operates an online retail platform that enables users to browse, purchase, and receive products. The Service includes product listings, shopping cart functionality, order processing, payment processing, and related customer support services.`,
    saas: `${name} provides a cloud-based software application and related technology services delivered via the internet on a subscription basis. The Service includes the software platform, application programming interfaces (APIs), documentation, customer support, and any updates or enhancements made available to users.`,
    marketplace: `${name} operates an online marketplace platform that connects buyers and sellers, enabling transactions between third parties. The Service includes the platform interface, listing tools, search functionality, messaging systems, payment facilitation, and dispute resolution mechanisms.`,
    service: `${name} provides professional services as described on our website. The Service includes the delivery of specified services, related communications, project management tools, and customer support.`,
    agency: `${name} provides professional agency services including strategy, creative, and implementation services as described on our website. The Service encompasses consulting, deliverable creation, project management, and related support services.`,
    nonprofit: `${name} operates a platform dedicated to our organizational mission as described on our website. The Service includes informational content, community features, donation processing, volunteer coordination, and related organizational activities.`,
    other: `${name} provides the services described on our website. Please refer to our website for a detailed description of the specific services we offer.`,
  }

  const desc = typeDescriptions[businessType] || typeDescriptions.other

  return `${desc}

We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.`
}

function buildAccountsSection(name, data) {
  let content = `To access certain features of the Service, you may be required to create an account. When creating an account, you agree to:

a) Provide accurate, current, and complete information during the registration process;
b) Maintain and promptly update your account information to keep it accurate, current, and complete;
c) Maintain the security of your password and accept all risks of unauthorized access to your account;
d) Immediately notify ${name} if you discover or suspect any security breaches related to the Service or your account.`

  if (data.minimumAge !== 'none') {
    content += `

Age Requirement: You must be at least ${data.minimumAge} years of age to create an account and use the Service. By creating an account, you represent and warrant that you meet this age requirement. If we learn that we have collected personal information from a person under the age of ${data.minimumAge}, we will delete that information and terminate the associated account.`
  }

  if (data.publicProfiles === 'yes') {
    content += `

Public Profiles: Your account may include a publicly visible profile. You are responsible for all information you include in your public profile and understand that this information will be visible to other users and potentially to the general public. ${name} is not responsible for any consequences arising from information you choose to make public.`
  }

  if (data.socialLogin === 'yes') {
    content += `

Third-Party Authentication: You may register for an account using third-party authentication services (such as Google, Facebook, or other social login providers). By using these services, you authorize us to access certain information from your third-party account as permitted by those services. Your use of third-party authentication services is subject to the respective third party's terms of service and privacy policies.`
  }

  content += `

Account Termination: We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that we determine violates these Terms, is harmful to other users, or is otherwise objectionable. Upon termination, your right to use the Service will immediately cease.`

  return content
}

function buildUserContentSection(name, data) {
  const types = (data.contentTypes || []).join(', ') || 'content'

  let content = `The Service may allow you to post, upload, publish, or otherwise make available content, including but not limited to ${types} ("User Content"). You are solely responsible for your User Content and the consequences of posting or publishing it.`

  // Content ownership
  if (data.contentOwnership === 'user') {
    content += `

Ownership and License: You retain all ownership rights to your User Content. However, by making User Content available through the Service, you grant ${name} a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, modify, distribute, prepare derivative works of, display, and perform your User Content in connection with the Service and ${name}'s business operations, including for the purposes of promoting and redistributing part or all of the Service.`
  } else if (data.contentOwnership === 'company') {
    content += `

Ownership Transfer: By submitting User Content to the Service, you assign and transfer to ${name} all right, title, and interest in and to such User Content, including all intellectual property rights therein. ${name} shall be entitled to use the User Content for any purpose without restriction or compensation to you.`
  } else {
    content += `

Shared Ownership: By submitting User Content, you grant ${name} a joint ownership interest in such content. Both you and ${name} shall have the right to use, reproduce, modify, distribute, and display the User Content without requiring the other party's consent, subject to any applicable laws.`
  }

  content += `

Content Standards: You agree that your User Content will not:
a) Violate any applicable law, regulation, or third-party right;
b) Contain defamatory, obscene, abusive, or otherwise objectionable material;
c) Contain viruses, malware, or other harmful code;
d) Infringe upon any patent, trademark, trade secret, copyright, or other proprietary rights of any party;
e) Constitute unauthorized advertising, spam, or solicitation;
f) Impersonate any person or entity or misrepresent your affiliation with any person or entity.`

  // Moderation
  if (data.moderationApproach) {
    const moderationDesc = {
      pre: `${name} reserves the right to review all User Content before it is published on the Service. Content that does not meet our content standards may be rejected or removed without notice.`,
      post: `${name} reserves the right to review, edit, or remove any User Content at any time and for any reason, without prior notice. We may, but have no obligation to, monitor or review User Content.`,
      community: `${name} relies on community reporting to identify User Content that violates these Terms. Users may report content they believe violates our content standards. We will review reported content and take appropriate action, which may include removal of the content and suspension or termination of the responsible account.`,
      automated: `${name} employs automated content moderation systems to detect and address User Content that may violate these Terms. Automated systems may flag, restrict, or remove content without prior notice. You may appeal automated content decisions through our support channels.`,
    }
    content += `

Content Moderation: ${moderationDesc[data.moderationApproach] || ''}`
  }

  content += `

DMCA / Copyright Complaints: If you believe that any User Content infringes your copyright, please notify us with the following information: (a) a description of the copyrighted work; (b) identification of the infringing material and its location on the Service; (c) your contact information; (d) a statement that you have a good faith belief that the use is not authorized; and (e) a statement, under penalty of perjury, that the information is accurate and you are authorized to act on behalf of the copyright owner.`

  return content
}

function buildIPSection(name, url, data) {
  let content = `The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of ${name} and its licensors. The Service is protected by copyright, trademark, and other laws of both domestic and foreign jurisdictions.

Our trademarks, trade names, and trade dress may not be used in connection with any product or service without the prior written consent of ${name}.`

  if (data.hasOriginalIP === 'yes') {
    content += `

All text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, software, and other content available on or through the Service (collectively, "Company Content") is the property of ${name} or its content suppliers and is protected by intellectual property laws.

You may not:
a) Copy, modify, or distribute Company Content for any commercial purpose without our express written permission;
b) Use any data mining, robots, or similar data gathering or extraction methods on Company Content;
c) Download (other than page caching) any portion of the Service or Company Content, except as expressly permitted;
d) Use the Service or Company Content other than for their intended purposes.`
  }

  return content
}

function buildPaymentsSection(name, data) {
  let content = ''
  const currencyLabel = data.currency || 'USD'

  if (data.paymentModel === 'subscription') {
    content += `Subscription Fees: Access to certain features of the Service requires a paid subscription. Subscription fees are charged in ${currencyLabel} and are billed in advance on a recurring basis according to the billing cycle selected at the time of purchase.

You agree to pay all fees associated with your chosen subscription plan. All fees are non-refundable except as expressly set forth in these Terms or as required by applicable law.`

    if (data.autoRenewal === 'yes') {
      content += `

Auto-Renewal: Your subscription will automatically renew at the end of each billing period unless you cancel your subscription before the renewal date. You may cancel your subscription at any time through your account settings or by contacting our support team. Cancellation will take effect at the end of the current billing period, and you will retain access to the Service until that date.`
    }
  } else if (data.paymentModel === 'one-time') {
    content += `Payment: Certain products or services available through the Service require a one-time payment. All prices are listed in ${currencyLabel}. You agree to pay the full amount at the time of purchase. Payment must be received before access to the purchased product or service is granted.`
  } else if (data.paymentModel === 'freemium') {
    content += `Free and Paid Tiers: The Service offers both free and paid tiers. Free tier users may access a limited set of features as described on our pricing page. Paid plans provide access to additional features and capabilities.

Paid tier fees are charged in ${currencyLabel} and are billed according to the billing cycle associated with your selected plan. You may upgrade or downgrade your plan at any time, with changes taking effect at the start of the next billing period.`

    if (data.autoRenewal === 'yes') {
      content += `

Auto-Renewal: Paid subscriptions will automatically renew at the end of each billing period unless cancelled. You may cancel at any time through your account settings, and you will retain access to your paid features until the end of the current billing period. Upon cancellation, your account will revert to the free tier.`
    }
  } else if (data.paymentModel === 'pay-per-use') {
    content += `Pay-Per-Use Billing: The Service operates on a pay-per-use billing model. Charges are calculated based on your actual usage as described on our pricing page. All prices are listed in ${currencyLabel}.

Usage charges will be calculated and billed periodically according to your billing cycle. You agree to pay all charges incurred through your account. Detailed usage reports will be available through your account dashboard.`
  }

  if (data.offerFreeTrial === 'yes') {
    const trialDays = data.freeTrialDuration || '14'
    content += `

Free Trial: ${name} may offer a free trial period of ${trialDays} days for new users. During the free trial, you will have access to the features of the selected plan at no charge. At the end of the free trial period, your account will automatically convert to a paid subscription unless you cancel before the trial expires. You will be charged the applicable subscription fee at the start of the first paid billing period.`
  }

  // Refund policy
  if (data.refundPolicy === 'no') {
    content += `

Refunds: All payments are final and non-refundable. By making a payment, you acknowledge and agree that no refunds will be issued under any circumstances, except as required by applicable law.`
  } else if (data.refundPolicy === 'yes') {
    content += `

Refunds: Our refund policy is described in our separate Return and Refund Policy, which is incorporated herein by reference. Please review our refund policy before making any purchases.`
  } else {
    content += `

Refunds: Refund requests will be evaluated on a case-by-case basis at ${name}'s sole discretion. To request a refund, please contact our support team with your order details and reason for the request. We reserve the right to deny refund requests that do not meet our criteria.`
  }

  content += `

Taxes: You are responsible for paying any applicable taxes associated with your use of the Service. If ${name} is required to collect or remit taxes, those taxes will be added to your invoice or charged separately.

Price Changes: ${name} reserves the right to change its prices at any time. If you have an active subscription, price changes will take effect at the start of the next billing period following reasonable advance notice.`

  return content
}

function buildProhibitedSection(name, data) {
  let content = `You agree not to use the Service to:

a) Violate any applicable federal, state, local, or international law or regulation;
b) Exploit, harm, or attempt to exploit or harm minors in any way;
c) Send, knowingly receive, upload, download, use, or re-use any material that violates these Terms;
d) Transmit or procure the sending of any advertising or promotional material without our prior written consent, including spam, junk mail, chain letters, or similar solicitations;
e) Impersonate or attempt to impersonate ${name}, a ${name} employee, another user, or any other person or entity;
f) Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service;
g) Use any robot, spider, scraper, or other automated means to access the Service without our express written permission;
h) Introduce any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful;
i) Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service;
j) Attack the Service via a denial-of-service attack or a distributed denial-of-service attack;
k) Take any action that may damage or falsify ${name}'s reputation;
l) Otherwise attempt to interfere with the proper working of the Service.`

  if (data.businessType === 'ecommerce' || data.businessType === 'marketplace') {
    content += `

Additionally, in connection with any transactions through the Service, you agree not to:
m) Submit false or misleading product listings, reviews, or transaction information;
n) Manipulate prices, feedback, or ratings;
o) Circumvent the Service's payment processing systems;
p) Engage in fraudulent transactions or money laundering.`
  }

  if (data.businessType === 'saas') {
    content += `

Additionally, with respect to the software platform, you agree not to:
m) Reverse engineer, decompile, or disassemble any aspect of the Service;
n) Attempt to access the Service's source code or underlying algorithms;
o) Use the Service to build a competing product or service;
p) Exceed any rate limits, storage limits, or other usage restrictions associated with your account plan;
q) Share your account credentials or allow multiple individuals to use a single account, unless your plan explicitly allows it.`
  }

  if (data.businessType === 'marketplace') {
    content += `

Marketplace-Specific Restrictions: As a marketplace facilitator, ${name} is not a party to transactions between buyers and sellers. However, all marketplace participants must comply with these Terms, and ${name} reserves the right to remove any participant who violates these rules.`
  }

  return content
}

function buildLiabilitySection(name, data) {
  let content = `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ${name.toUpperCase()}, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:

a) Your access to, use of, or inability to access or use the Service;
b) Any conduct or content of any third party on the Service;
c) Any content obtained from the Service;
d) Unauthorized access, use, or alteration of your transmissions or content;
e) Any other matter relating to the Service.`

  if (data.liabilityCap === 'fees-paid') {
    content += `

IN NO EVENT SHALL ${name.toUpperCase()}'S TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE EXCEED THE TOTAL AMOUNT PAID BY YOU TO ${name.toUpperCase()} DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE DATE ON WHICH THE CLAIM AROSE, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.`
  } else if (data.liabilityCap === 'fixed') {
    const amount = data.fixedLiabilityAmount || '1,000'
    content += `

IN NO EVENT SHALL ${name.toUpperCase()}'S TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE EXCEED ${data.currency || 'USD'} ${amount}.`
  }

  content += `

THE LIMITATIONS OF THIS SECTION SHALL APPLY TO ANY THEORY OF LIABILITY, WHETHER BASED ON WARRANTY, CONTRACT, STATUTE, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE, AND WHETHER OR NOT ${name.toUpperCase()} HAS BEEN INFORMED OF THE POSSIBILITY OF ANY SUCH DAMAGE.

SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IN SUCH JURISDICTIONS, OUR LIABILITY IS LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.`

  return content
}

function buildWarrantySection(name, data) {
  if (data.warrantyType === 'as-is') {
    return `THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.

${name.toUpperCase()}, ITS SUBSIDIARIES, AFFILIATES, AND LICENSORS DO NOT WARRANT THAT:
a) The Service will function uninterrupted, secure, or available at any particular time or location;
b) Any errors or defects will be corrected;
c) The Service is free of viruses or other harmful components;
d) The results of using the Service will meet your requirements.

YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK.

${data.uptimeGuarantee === 'sla' ? `\nNotwithstanding the foregoing, ${name} will use commercially reasonable efforts to maintain Service availability of at least 99.9% uptime, measured on a monthly basis, excluding scheduled maintenance. In the event that we fail to meet this commitment, you may be eligible for service credits as described in our Service Level Agreement.` : ''}
${data.uptimeGuarantee === 'best-effort' ? `\n${name} will use commercially reasonable efforts to maintain the availability and performance of the Service but does not guarantee uninterrupted or error-free operation.` : ''}`
  }

  if (data.warrantyType === 'limited') {
    return `${name} warrants that the Service will perform materially in accordance with its documentation for a period of thirty (30) days from your initial access. If the Service does not conform to this warranty, ${name}'s sole obligation and your exclusive remedy shall be, at ${name}'s option, to either (a) repair or replace the non-conforming Service, or (b) refund the fees paid for the non-conforming Service.

EXCEPT FOR THE EXPRESS WARRANTY SET FORTH ABOVE, THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. ${name.toUpperCase()} DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

${data.uptimeGuarantee === 'sla' ? `Service Availability: ${name} will use commercially reasonable efforts to maintain Service availability of at least 99.9% uptime, measured on a monthly basis, excluding scheduled maintenance.` : ''}`
  }

  // satisfaction
  return `${name} offers a satisfaction guarantee. If you are not satisfied with the Service within the first thirty (30) days of your purchase, you may contact us to request a full refund. This guarantee is limited to first-time purchasers and applies only to the initial purchase amount.

EXCEPT FOR THE SATISFACTION GUARANTEE SET FORTH ABOVE, THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. ${name.toUpperCase()} DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

${data.uptimeGuarantee === 'sla' ? `Service Availability: ${name} will use commercially reasonable efforts to maintain Service availability of at least 99.9% uptime, measured on a monthly basis, excluding scheduled maintenance.` : ''}`
}

function buildIndemnificationSection(name) {
  return `You agree to defend, indemnify, and hold harmless ${name}, its officers, directors, employees, agents, licensors, and suppliers from and against any claims, actions, demands, liabilities, and settlements, including without limitation reasonable legal and accounting fees, arising from or in any way related to:

a) Your access to or use of the Service;
b) Your violation of these Terms;
c) Your violation of any third-party right, including any intellectual property right, publicity, confidentiality, property, or privacy right;
d) Any User Content you post or submit through the Service;
e) Any claim that your User Content caused damage to a third party.

This indemnification obligation will survive the termination of these Terms and your use of the Service.

${name} reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate with our defense of these claims. You agree not to settle any such matter without the prior written consent of ${name}.`
}

function buildDisputeSection(name, data, jurisdiction, forum) {
  let content = `Governing Law: These Terms shall be governed by and construed in accordance with the laws of ${jurisdiction}, without regard to its conflict of law provisions.`

  if (data.disputeMethod === 'litigation') {
    content += `

Jurisdiction and Venue: Any legal suit, action, or proceeding arising out of or related to these Terms or the Service shall be instituted exclusively in the courts located in ${forum}. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.`
  } else if (data.disputeMethod === 'arbitration') {
    content += `

Binding Arbitration: Any dispute, controversy, or claim arising out of or relating to these Terms, or the breach, termination, or invalidity thereof, shall be settled by binding arbitration administered by the American Arbitration Association (or a similar arbitration body in your jurisdiction) in accordance with its Commercial Arbitration Rules. The arbitration shall take place in ${forum}. The arbitrator's decision shall be final and binding and may be entered as a judgment in any court of competent jurisdiction.

The arbitration shall be conducted by a single arbitrator mutually agreed upon by the parties. If the parties cannot agree on an arbitrator, the arbitration organization shall appoint one. Each party shall bear its own costs and attorneys' fees, unless the arbitrator determines that the prevailing party is entitled to recover reasonable attorneys' fees.`
  } else {
    // mediation-arbitration
    content += `

Mediation: Before initiating any arbitration or court proceeding, you agree to first attempt to resolve the dispute informally by contacting ${name}. If the dispute is not resolved within thirty (30) days, either party may initiate mediation through a mutually agreed-upon mediator in ${forum}.

Binding Arbitration: If mediation is unsuccessful, the dispute shall be settled by binding arbitration administered by the American Arbitration Association (or a similar arbitration body in your jurisdiction) in accordance with its Commercial Arbitration Rules. The arbitration shall take place in ${forum}. The arbitrator's decision shall be final and binding.`
  }

  if (data.classActionWaiver === 'yes') {
    content += `

Class Action Waiver: YOU AND ${name.toUpperCase()} AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING. Unless both you and ${name} agree otherwise, the arbitrator may not consolidate or join more than one person's or party's claims and may not otherwise preside over any form of a consolidated, representative, or class proceeding.`
  }

  content += `

Limitation Period: Any cause of action or claim you may have arising out of or relating to these Terms or the Service must be commenced within one (1) year after the cause of action accrues. Otherwise, such cause of action or claim is permanently barred.`

  return content
}

function buildTerminationSection(name, data) {
  let content = `We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.`

  if (data.requireAccounts === 'yes') {
    content += `

Upon termination of your account:
a) Your right to use the Service will immediately cease;
b) We may delete or deactivate your account and all related information and files;
c) We are under no obligation to retain, store, or provide you with any data associated with your account.

If you wish to terminate your account, you may do so by contacting us or using the account deletion feature in your account settings.`
  }

  if (data.acceptPayments === 'yes') {
    content += `

Effect on Billing: If your account is terminated by ${name} due to a violation of these Terms, no refund will be issued for any prepaid fees. If you terminate your account, you will retain access to the Service through the end of your current billing period, after which your access will cease and no refund will be provided for the unused portion of the billing period.`
  }

  content += `

Survival: All provisions of these Terms which by their nature should survive termination shall survive, including without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`

  return content
}

function buildChangesSection(name, data) {
  let content = `${name} reserves the right, at our sole discretion, to modify or replace these Terms at any time. Changes will be effective immediately upon posting of the revised Terms on the Service.`

  const hasNotice = data.additionalClauses && data.additionalClauses.includes('notice')

  if (hasNotice) {
    content += `

We will provide notice of material changes to these Terms by:
a) Posting a notice on the Service at least thirty (30) days before the changes take effect;
b) Sending an email notification to the address associated with your account;
c) Updating the "Last Updated" date at the top of these Terms.`
  } else {
    content += `

We will make reasonable efforts to notify you of material changes by updating the "Last Updated" date at the top of these Terms and/or posting a notice on the Service.`
  }

  content += `

By continuing to access or use the Service after those revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new Terms, in whole or in part, please stop using the Service.

It is your responsibility to review these Terms periodically for changes.`

  return content
}

function buildGeneralSection(name, data) {
  const clauses = data.additionalClauses || []
  const parts = []

  if (clauses.includes('acceptable-use')) {
    parts.push(`Acceptable Use: Your use of the Service is subject to our Acceptable Use Policy, which prohibits any use of the Service that is illegal, harmful, or disruptive to others. We reserve the right to investigate and take appropriate action against anyone who, in our sole discretion, violates this provision, including reporting the offender to law enforcement authorities.`)
  }

  if (clauses.includes('anti-spam')) {
    parts.push(`Anti-Spam: You agree not to use the Service to send unsolicited commercial communications (spam). You will comply with all applicable anti-spam laws, including the CAN-SPAM Act (United States), CASL (Canada), and the Privacy and Electronic Communications Regulations (EU/UK), as applicable. Violation of this provision may result in immediate termination of your account.`)
  }

  if (clauses.includes('api-terms')) {
    parts.push(`API Usage: If you access the Service through an application programming interface (API), you agree to abide by any API-specific terms, rate limits, and usage guidelines provided by ${name}. API access may be revoked at any time for violations of these Terms or API-specific guidelines. You agree not to exceed the rate limits or usage restrictions applicable to your account tier. API keys and credentials must be kept confidential and not shared with unauthorized parties.`)
  }

  if (clauses.includes('third-party-links')) {
    parts.push(`Third-Party Links: The Service may contain links to third-party websites or services that are not owned or controlled by ${name}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that ${name} shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.`)
  }

  if (clauses.includes('force-majeure')) {
    parts.push(`Force Majeure: ${name} shall not be liable for any failure or delay in performing its obligations under these Terms where such failure or delay results from circumstances beyond its reasonable control, including but not limited to natural disasters, war, terrorism, riots, embargoes, acts of civil or military authority, fire, floods, pandemics, strikes, shortages of transportation, facilities, fuel, energy, labor, or materials, failure of third-party service providers, or failures of the internet or any public telecommunications network.`)
  }

  if (clauses.includes('severability')) {
    parts.push(`Severability: If any provision of these Terms is held to be unenforceable or invalid by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions of these Terms will remain in full force and effect.`)
  }

  if (clauses.includes('entire-agreement')) {
    parts.push(`Entire Agreement: These Terms, together with our Privacy Policy and any other legal notices or policies published by ${name} on the Service, constitute the entire agreement between you and ${name} regarding the Service and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral.`)
  }

  if (clauses.includes('assignment')) {
    parts.push(`Assignment: You may not assign or transfer these Terms, by operation of law or otherwise, without the prior written consent of ${name}. ${name} may assign or transfer these Terms, in whole or in part, without restriction and without your consent. Subject to the foregoing, these Terms will bind and inure to the benefit of the parties, their successors, and permitted assigns.`)
  }

  if (clauses.includes('notice')) {
    parts.push(`Notice: Any notices or other communications provided by ${name} under these Terms will be given by posting to the Service or via email to the email address associated with your account. For notices made by email, the date of receipt will be deemed the date on which such notice is transmitted. Notices to ${name} should be sent to our contact information listed in the Contact section of these Terms.`)
  }

  return parts.join('\n\n')
}

function buildContactSection(name, url) {
  return `If you have any questions about these Terms, please contact us:

${name}
Website: ${url}
Email: legal@${getDomainFromUrl(url)}

For general inquiries: support@${getDomainFromUrl(url)}
For legal notices: legal@${getDomainFromUrl(url)}

When contacting us, please include your name, contact information, and a detailed description of your inquiry.`
}

function getDomainFromUrl(url) {
  try {
    const parsed = new URL(url)
    return parsed.hostname.replace(/^www\./, '')
  } catch {
    return 'yourdomain.com'
  }
}

/**
 * Convert sections to plain text
 */
export function sectionsToPlainText(sections, data) {
  const name = data.businessName || '[Business Name]'
  const effectiveDate = data.effectiveDate
    ? new Date(data.effectiveDate + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '[Effective Date]'

  let text = `TERMS OF SERVICE\n${name}\n\nLast Updated: ${effectiveDate}\n\n`
  text += '='.repeat(60) + '\n\n'

  for (const section of sections) {
    text += section.title.toUpperCase() + '\n'
    text += '-'.repeat(section.title.length) + '\n\n'
    text += section.content + '\n\n'
  }

  return text
}

/**
 * Convert sections to HTML
 */
export function sectionsToHTML(sections, data) {
  const name = data.businessName || '[Business Name]'
  const effectiveDate = data.effectiveDate
    ? new Date(data.effectiveDate + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '[Effective Date]'

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Terms of Service — ${name}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; color: #333; }
    h1 { font-size: 1.75rem; border-bottom: 2px solid #eee; padding-bottom: 0.5rem; }
    h2 { font-size: 1.25rem; margin-top: 2rem; color: #111; }
    p { margin: 0.75rem 0; }
    .meta { color: #666; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1>Terms of Service</h1>
  <p class="meta">${name} — Last Updated: ${effectiveDate}</p>\n\n`

  for (const section of sections) {
    html += `  <h2>${escapeHtml(section.title)}</h2>\n`
    const paragraphs = section.content.split('\n\n')
    for (const p of paragraphs) {
      if (p.trim()) {
        html += `  <p>${escapeHtml(p.trim()).replace(/\n/g, '<br>')}</p>\n`
      }
    }
    html += '\n'
  }

  html += `</body>\n</html>`
  return html
}

/**
 * Convert sections to Markdown
 */
export function sectionsToMarkdown(sections, data) {
  const name = data.businessName || '[Business Name]'
  const effectiveDate = data.effectiveDate
    ? new Date(data.effectiveDate + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '[Effective Date]'

  let md = `# Terms of Service\n\n**${name}** — Last Updated: ${effectiveDate}\n\n---\n\n`

  for (const section of sections) {
    md += `## ${section.title}\n\n`
    md += section.content + '\n\n'
  }

  return md
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
