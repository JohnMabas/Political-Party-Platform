import { Card } from '../../components/ui'

export default function Compliance() {
  return (
    <div>
      <section className="border-b border-border bg-primary text-white">
        <div className="container-site py-12">
          <p className="font-serif text-lg text-white/70 italic">Compliance & disclosures</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white">Funding & legal disclosures</h1>
          <p className="mt-3 max-w-2xl text-white/75">The Federal Unity Party believes in honest money. Here is where we publish the rules and the records that keep us accountable.</p>
        </div>
      </section>

      <section className="container-site py-10 max-w-3xl space-y-6">
        <Card className="p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Who we are</h2>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            The Federal Unity Party (FUP) is a registered political party in Nigeria, regulated under the Electoral Act and supervised by the Independent National Electoral Commission (INEC). We are funded by member dues and contributions from ordinary Nigerian citizens. We do not accept foreign funding or contributions prohibited under Nigerian law.
          </p>
          <p className="mt-3 rounded-sm border border-border bg-surface-2 px-4 py-3 text-xs text-ink-muted">
            This platform is a demonstration template produced to model how such a site is built. The Federal Unity Party, its candidates, donors, volunteers, and events are fictional and created for illustration. Real political parties are subject to applicable Nigerian electoral law; whoever adapts this template is responsible for their own compliance.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Contribution rules</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>• Contributions are governed by the Nigerian Electoral Act and INEC regulations.</li>
            <li>• Contributors must be Nigerian citizens or lawful residents.</li>
            <li>• Contributions from foreign nationals, government-owned entities, and entities prohibited by law are not accepted.</li>
            <li>• We are required to keep records of all contributions and report them to INEC as required.</li>
            <li>• Party members and donors may decline to be identified publicly where the law allows.</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Refund policy</h2>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            Contributions are final. If you made a contribution in error or have questions about a charge, contact our finance office within 30 days and we will work with you to correct it.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Privacy policy</h2>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            We collect the information you provide when you volunteer, donate, RSVP, or sign up as a member — including contact details. We use this information to run the party and campaign, including field operations, fundraising, and voter contact as permitted by law. We do not sell your personal information. You may request access to or deletion of your data at any time by contacting our privacy office.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Terms of use</h2>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            By using this site you agree to use it for lawful purposes and not to upload harmful content, attempt unauthorized access, or interfere with the operation of the platform. Content such as logos and endorsed materials may be used only with permission for purposes consistent with supporting the party.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="font-serif text-lg font-bold text-primary">Contact</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Federal Unity Party<br />National Secretariat, Plot 42, Central Area, Abuja FCT<br />finance@fup.ng · +234 800 000 0000
          </p>
        </Card>
      </section>
    </div>
  )
}
