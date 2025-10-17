export default function TermsOfUsePage() {
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl sm:text-4xl font-black mb-6">Terms of Use</h1>

      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
        <p className="text-sm text-gray-600 font-bold">Last Updated: {today}</p>
        <p className="mt-4 font-bold">
          These Terms of Use ("Terms") govern your access to and use of ZEITGEIST (zeitgeist.trade), owned and
          operated by Verified Technologies Group, Inc., 1111B S Governors Ave, Dover, DE 19904 (the "Company"). By
          using the Service, you agree to these Terms.
        </p>
      </div>

      <Section title="1. Eligibility & Accounts">
        <p>
          You must be legally permitted to use the Service in your jurisdiction. You are responsible for your account,
          wallet security, and compliance with applicable laws.
        </p>
      </Section>

      <Section title="2. Non‑custodial Nature">
        <p>
          ZEITGEIST is non‑custodial. You control your wallets and funds. Copy trading actions are executed from
          addresses you control.
        </p>
      </Section>

      <Section title="3. Markets & Risk Disclosure">
        <p>
          Trading and copy trading carry risk, including loss of principal. Past performance does not guarantee future
          results. You are solely responsible for all decisions and outcomes.
        </p>
      </Section>

      <Section title="4. Prohibited Conduct">
        <ul className="list-disc pl-6">
          <li>Illegal activity or violations of market rules.</li>
          <li>Attempting to compromise the Service or other users.</li>
          <li>Impersonation, fraud, or misrepresentation.</li>
        </ul>
      </Section>

      <Section title="5. Third‑Party Services">
        <p>
          The Service integrates third‑party services (e.g., on‑ramps). Your use of those services is governed by their
          terms and policies.
        </p>
      </Section>

      <Section title="6. Disclaimers & Limitation of Liability">
        <p>
          THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES. TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY IS
          NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
        </p>
      </Section>

      <Section title="7. Indemnification">
        <p>
          You agree to indemnify and hold the Company harmless from claims arising from your use of the Service or
          violation of these Terms.
        </p>
      </Section>

      <Section title="8. Changes & Termination">
        <p>
          We may update the Service or these Terms at any time. Continued use constitutes acceptance. We may suspend or
          terminate access for violations.
        </p>
      </Section>

      <Section title="9. Governing Law & Contact">
        <p>
          These Terms are governed by the laws of the State of Delaware. Contact: legal@zeitgeist.trade.
        </p>
      </Section>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 mb-6">
      <h2 className="text-2xl font-black mb-3">{title}</h2>
      <div className="font-bold text-gray-800 space-y-2">{children}</div>
    </section>
  )
}


