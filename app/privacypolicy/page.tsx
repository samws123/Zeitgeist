export default function PrivacyPolicyPage() {
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl sm:text-4xl font-black mb-6">Privacy Policy</h1>

      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
        <p className="text-sm text-gray-600 font-bold">Last Updated: {today}</p>
        <p className="mt-4 font-bold">
          This Privacy Policy describes how Verified Technologies Group, Inc. ("Company", "we", "us", or "our")
          collects, uses, and discloses information in connection with the ZEITGEIST platform located at
          zeitgeist.trade (the "Service"). Our business address is 1111B S Governors Ave, Dover, DE 19904. We are a
          Delaware C‑Corporation.
        </p>
      </div>

      <section className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
        <h2 className="text-2xl font-black mb-3">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2 font-bold">
          <li>Account Data: email, connected wallets, and on‑platform preferences.</li>
          <li>Transaction Data: on‑chain addresses you provide, transfers to/from your own wallet.</li>
          <li>Usage Data: device, browser, and interaction data for security and product improvement.</li>
          <li>On‑ramp Data: if you use third‑party on‑ramps (e.g., MoonPay), they collect and process KYC/Payment data per their policies.</li>
        </ul>
      </section>

      <section className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
        <h2 className="text-2xl font-black mb-3">2. How We Use Information</h2>
        <ul className="list-disc pl-6 space-y-2 font-bold">
          <li>Provide and improve the Service, including copy‑trading workflows and UX.</li>
          <li>Detect, prevent, and address fraud, abuse, or security incidents.</li>
          <li>Comply with applicable laws and respond to lawful requests.</li>
          <li>Communicate important updates and respond to support inquiries.</li>
        </ul>
      </section>

      <section className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
        <h2 className="text-2xl font-black mb-3">3. Sharing of Information</h2>
        <ul className="list-disc pl-6 space-y-2 font-bold">
          <li>Service Providers: analytics, hosting, and security vendors under appropriate agreements.</li>
          <li>Compliance: disclosures required by law, regulation, or legal process.</li>
          <li>Business Transfers: in connection with corporate transactions (merger, acquisition, etc.).</li>
        </ul>
      </section>

      <section className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
        <h2 className="text-2xl font-black mb-3">4. Your Choices</h2>
        <ul className="list-disc pl-6 space-y-2 font-bold">
          <li>You may disconnect wallets at any time in Settings.</li>
          <li>You can opt‑out of non‑essential communications via unsubscribe links.</li>
          <li>To request data access or deletion, contact support at privacy@zeitgeist.trade.</li>
        </ul>
      </section>

      <section className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
        <h2 className="text-2xl font-black mb-3">5. Data Security & Retention</h2>
        <p className="font-bold">
          We implement reasonable technical and organizational measures to protect information. Retention periods vary
          based on legal, operational, and security needs.
        </p>
      </section>

      <section className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
        <h2 className="text-2xl font-black mb-3">6. Third‑Party Services</h2>
        <p className="font-bold">
          The Service integrates third‑party services (e.g., MoonPay on‑ramp). Your use of those services is governed by
          their terms and privacy policies.
        </p>
      </section>

      <section className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
        <h2 className="text-2xl font-black mb-3">7. Contact Us</h2>
        <p className="font-bold">
          Verified Technologies Group, Inc. — 1111B S Governors Ave, Dover, DE 19904. For questions, contact
          privacy@zeitgeist.trade.
        </p>
      </section>
    </main>
  )
}


