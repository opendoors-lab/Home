function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 scroll-mt-24 border-b border-[var(--color-line)] pb-3 font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)] md:text-3xl">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 text-lg font-bold text-[var(--color-forest)]">{children}</h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-relaxed text-[var(--color-ink-soft)]">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--color-ink-soft)]">{children}</ul>
  );
}

function DlItem({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <dt className="font-semibold text-[var(--color-forest)]">{term}</dt>
      <dd className="mt-1 leading-relaxed text-[var(--color-ink-soft)]">{children}</dd>
    </div>
  );
}

export default function TermsAndConditions() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <header className="border-b border-[var(--color-line)] pb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-amber)]">
          Legal
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--color-forest)] md:text-5xl">
          Terms and Conditions
        </h1>
        <p className="mt-3 text-base text-[var(--color-ink-soft)]">
          OpenDoors Africa Solutions PLC
        </p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">MobiMates Platform</p>
      </header>

      <div className="legal-body">
        <H2>Article 1: Introduction</H2>
        <P>
          These Terms and Conditions (the &quot;Agreement&quot;) constitute a legally binding
          contract between OpenDoors Africa Solutions PLC (hereinafter referred to as
          &quot;OpenDoors,&quot; the &quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;) and any individual (hereinafter referred to as &quot;You&quot; or the
          &quot;User&quot;) who downloads, registers with, accesses, or otherwise utilizes the
          MobiMates mobile application, website, technology platform, APIs, or any related
          services (collectively, the &quot;Platform&quot;).
        </P>

        <H2>Article 2: Definitions</H2>
        <dl>
          <DlItem term="Platform">
            The MobiMates mobile application, website, software, APIs, and associated digital
            infrastructure managed by OpenDoors Africa Solutions PLC.
          </DlItem>
          <DlItem term="OpenDoors Africa Solutions PLC">
            The private limited company established and operating under the laws of Ethiopia,
            with its principal office in Addis Ababa.
          </DlItem>
          <DlItem term="User">
            Any individual registered on the Platform as either a Driver or a Passenger.
          </DlItem>
          <DlItem term="Driver (Carpool Giver)">
            A User who shares their personal vehicle and vacant seats with others to split travel
            costs.
          </DlItem>
          <DlItem term="Passenger (Carpool Taker or Rider)">
            A User who requests or reserves a seat for a Trip via the Platform.
          </DlItem>
          <DlItem term="Co-traveler">
            A term collectively referring to both the Driver and the Passenger(s) who are
            mutually matched for a specific Trip.
          </DlItem>
          <DlItem term="Trip">
            The transit journey from an origin to a destination as posted by the Driver.
          </DlItem>
          <DlItem term="Ride Offer">
            A trip itinerary posted by a Driver specifying the route, time, and available seats.
          </DlItem>
          <DlItem term="Booking Confirmation">
            The digital validation issued by the Platform confirming a successful seat
            reservation.
          </DlItem>
          <DlItem term="Cost Contribution">
            The amount paid by a Passenger to a Driver to cover shared travel expenses. This
            amount is automatically calculated by the platform based on the trip distance and per
            KM Vehicle operating costs (including fuel, maintenance, depreciation, and insurance)
            and estimated average occupancy of a Trip.
          </DlItem>
          <DlItem term="Platform Fee">
            The service charge retained by OpenDoors for facilitating the matching service.
          </DlItem>
          <DlItem term="Prepaid Wallet">
            The digital balance held by a User within the app for transaction processing.
          </DlItem>
          <DlItem term="Meeting Point">
            The designated physical location for boarding as agreed upon by the parties.
          </DlItem>
          <DlItem term="Force Majeure">
            Extraordinary events beyond the reasonable control of the parties, including, but not
            limited to, natural disasters, civil unrest, or government-mandated service
            suspensions.
          </DlItem>
        </dl>

        <H2>Article 3: Purpose and Legal Basis of the Contract</H2>
        <P>
          The primary objective of this Agreement is to define, govern, and regulate the legal
          rights, mutual obligations, and liabilities of users who offer or receive peer-to-peer
          shared travel services (Carpooling) via the Platform. This contract is constructed and
          enforced pursuant to the Civil Code of Ethiopia, national transport laws, and all
          relevant technology and electronic commerce proclamations.
        </P>

        <H2>Article 4: Electronic Consent and Contract Formation</H2>
        <H3>4.1 Electronic Signature Binding</H3>
        <P>
          By clicking &quot;Register,&quot; &quot;Login,&quot; &quot;I Agree,&quot;
          &quot;Accept,&quot; or &quot;Continue,&quot; or by otherwise accessing the Platform,
          you acknowledge that you have read, understood, and agreed to be bound by this
          Agreement. Pursuant to the Electronic Transactions Proclamation No. 1205/2020, this
          action constitutes a valid, legally binding electronic signature. If you do not agree
          to these Terms in their entirety, you are strictly prohibited from downloading,
          accessing, or utilizing the Platform. Your continued use signifies ongoing acceptance
          of these Terms.
        </P>

        <H2>Article 5: Scope and Nature of Services</H2>
        <H3>5.1 Territorial Scope</H3>
        <P>
          This Agreement governs all Platform services and user interactions within the Federal
          Democratic Republic of Ethiopia.
        </P>
        <H3>5.2 Non-Commercial Nature</H3>
        <P>
          MobiMates is a non-commercial, peer-to-peer cost-sharing service, not a commercial
          transport or taxi operator. Drivers are prohibited from accepting payments exceeding
          the actual cost contribution of the trip as calculated by the Platform&apos;s
          contribution formula.
        </P>
        <H3>5.3 Service Categories</H3>
        <P>
          This Agreement covers both Intracity Carpooling for shared commutes within city
          boundaries, and Intercity Carpooling for long-distance, multi-city overland travels
          arranged through the Platform.
        </P>

        <H2>Article 6: Platform Status and Disclaimer</H2>
        <H3>6.1 Intermediary Framework</H3>
        <P>
          MobiMates serves exclusively as a digital platform facilitating connections between
          independent Co-travelers under the Electronic Commerce Proclamation No. 1205/2020.
          Members acknowledge that all decisions to offer or accept a ride are made at their
          sole, independent discretion. The Company holds no duty of care or liability for
          transportation services rendered, as it is not a party to the direct, voluntary
          cost-sharing agreement between the Driver and the Passenger.
        </P>
        <H3>6.2 Non-Commercial Disclaimer</H3>
        <P>
          OpenDoors is not a transportation enterprise, public carrier, taxi operator, or
          commercial ride-hailing vendor under Transport Proclamation No. 1274/2021. We do not
          own fleets, manage logistics, or provide commercial transport services.
        </P>
        <H3>6.3 Independent Status</H3>
        <P>
          Drivers participate in the Platform voluntarily and independently. Drivers are not
          employees, agents, or representatives of OpenDoors, and no employment or agency
          relationship is established or implied between any Driver and the Company.
        </P>

        <H2>Article 7: Account Eligibility and Security</H2>
        <H3>7.1 Eligibility</H3>
        <P>
          To register, you must be at least 18 years old and possess full legal capacity under
          Ethiopian law. If a third party arranges a ride on your behalf, both the requester and
          the rider are jointly and severally liable for all obligations and conduct.
        </P>
        <H3>7.2 Verification</H3>
        <P>
          To ensure safety, OpenDoors may require mandatory verification of government ID (e.g.,
          Fayda, Passport, Kebele ID), valid driver&apos;s licenses, and vehicle ownership
          documents.
        </P>
        <H3>7.3 Accuracy</H3>
        <P>
          You warrant that all profile and trip information is authentic and accurate. Providing
          false or misleading information will result in immediate account termination. You are
          solely liable for any damages resulting from fraudulent data.
        </P>
        <H3>7.4 Security &amp; Non-Transferability</H3>
        <P>
          Accounts are personal and non-transferable. You are strictly prohibited from sharing,
          selling, or leasing your credentials. You are responsible for safeguarding your login
          and multi-factor authentication codes; OpenDoors is not liable for unauthorized access
          due to your negligence.
        </P>
        <H3>7.5 Corporate Verification</H3>
        <P>
          Users may optionally verify their professional or institutional email to facilitate
          matching within their specific enterprise or professional circle.
        </P>

        <H2>Article 8: Data Privacy and Security</H2>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Consent &amp; Collection:</strong> By
            using the Platform, you consent to the collection of personal data necessary for
            matching, including your name, ID, gender, profile photo, phone number, vehicle
            details, and real-time GPS location.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Purpose:</strong> Data is processed to
            verify identities, run matching algorithms, facilitate trip coordination, enforce
            cost-sharing policies, and improve services.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Disclosures:</strong> You authorize
            OpenDoors to share essential trip details (e.g. name, phone, vehicle plate, GPS)
            with your matched co-traveler. We may also disclose your data to authorities if
            required by Ethiopian law.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Security:</strong> We employ
            commercially reasonable measures to protect your data from unauthorized access.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">User Obligations:</strong> To protect
            privacy, you must not share, store, or distribute a co-traveler&apos;s personal data
            or contact information to any third party.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Liability:</strong> OpenDoors is not
            liable for peer-to-peer data misuse. Users are exclusively responsible for privacy
            violations against others, which will result in immediate account termination.
          </li>
        </Ul>

        <H2>Article 9: Connectivity and Communication Standards</H2>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Data Charges:</strong> Users are
            solely responsible for all mobile data, internet, and messaging fees incurred while
            using the MobiMates application.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Consent to Contact:</strong> By
            creating an account, you consent to receive communications—including SMS, social
            media messaging, in-app notifications, and emails—from OpenDoors and your matched
            co-travelers regarding trip logistics and platform updates.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Legal Validity:</strong> You agree
            that electronic notices and agreements transmitted by OpenDoors satisfy all legal
            requirements for written documentation and are fully binding under Ethiopian law.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Operational Communication:</strong>{" "}
            Once a ride is matched, users are obligated to respond promptly to their
            co-traveler. All communications must remain professional, respectful, and clear.
          </li>
        </Ul>

        <H2>Article 10: Ride Mechanics and Route Protocols</H2>
        <H3>10.1 Operating Modes</H3>
        <P>
          MobiMates facilitates two peer-to-peer formats: Intracity, which covers shared daily
          commutes (e.g., work or school runs) within city boundaries, and Intercity, which
          provides for pre-arranged, long-distance travel between cities or regions via
          Driver-posted listings.
        </P>
        <H3>10.2 Matching &amp; Route Protocols</H3>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Matching:</strong> Algorithms suggest
            matches based on proximity, route overlap, scheduling, and user preferences
            (including gender-filtering).
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Coordination:</strong> Drivers and
            Riders must agree on a convenient pickup location along the Driver&apos;s route.
            Drivers are required to wait a maximum of five (5) minutes past the agreed departure
            time.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Route Control:</strong> The Driver
            sets the route and schedule. Significant, unscheduled deviations are prohibited
            unless required by an emergency or authorized by the unanimous consent of all
            Passengers.
          </li>
        </Ul>

        <H2>Article 11: Driver Obligations and Vehicle Standards</H2>
        <P>
          By offering a ride, you warrant that you possess a valid driver&apos;s license and
          legal authorization to operate the vehicle. You confirm that your vehicle is
          roadworthy, carries a current technical inspection (&quot;Bolo&quot;), maintains
          mandatory third-party insurance, and is equipped with a functional first-aid kit. You
          must not exceed the vehicle&apos;s legal seating capacity and are strictly obligated
          to comply with all Ethiopian traffic laws and safety regulations throughout the trip.
        </P>

        <H2>Article 12: Community Standards and Conduct</H2>
        <H3>12.1 Mutual Respect</H3>
        <P>
          All users must interact with dignity and respect. Any form of harassment, intimidation
          or discrimination based on ethnicity, gender, religion, or origin is strictly
          prohibited and will result in permanent account termination and potential legal
          action.
        </P>
        <H3>12.2 Prohibited Conduct</H3>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Substance Use:</strong> Operating a
            vehicle or traveling while under the influence of alcohol, khat, or other substances
            is strictly forbidden. Smoking and vaping are also banned.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Safety Interference:</strong> Users
            must not distract the driver, interfere with vehicle operations, or disrupt the
            peace.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Property Damage:</strong> Users are
            fully liable for any intentional or negligent damage caused to a vehicle or
            property.
          </li>
        </Ul>
        <H3>12.3 Prohibited Items</H3>
        <P>
          The transport of firearms, weapons, explosives, hazardous chemicals, contraband, or
          unauthorized commercial cargo is strictly forbidden.
        </P>
        <H3>12.4 System Integrity</H3>
        <P>
          You must not disrupt, manipulate, or compromise the platform. Prohibited activities
          include, but are not limited to, crashing the app, transmitting illegal or deceptive
          content, engaging in fraudulent activity, or harassing other users and administrators.
        </P>

        <H2>Article 13: Cost Contributions, Payments, and Fees</H2>
        <H3>13.1 Cost Allocation</H3>
        <P>
          MobiMates automatically calculates and display the cost contribution based on distance
          (km) multiplied by our platform-defined rate per kilometer, subject to a fixed
          minimum.
        </P>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Non-Profit Policy:</strong> Drivers
            must collect only the exact amount calculated and displayed by the App. Negotiating
            higher prices or generating a profit is strictly prohibited.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Legal Risk:</strong> Attempting to
            profit constitutes a material breach, resulting in permanent termination. The Driver
            assumes sole responsibility for any legal, tax, or regulatory consequences if the
            trip is recharacterized as an illegal commercial service.
          </li>
        </Ul>
        <H3>13.2 Payment Facilitation</H3>
        <P>
          OpenDoors, through MobiMates, provides the infrastructure for transferring
          contributions via integrated third-party payment gateways. We act solely as a
          technical intermediary, not as an escrow agent, guarantor, or party to the
          transaction. The Company assumes no liability for payment failures, chargebacks, or
          uncollected funds.
        </P>
        <H3>13.3 Platform Fees and Taxes</H3>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Service Fee:</strong> In consideration
            for access to the MobiMates matching software, algorithmic route optimization, and
            schedule coordination services, the platform charges a service fee (the
            &quot;Platform Fee&quot;).
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Fee Structure:</strong> This fee is
            set at 10% of the total cost-share value for each successfully matched and completed
            carpool trip.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Policy Updates:</strong> OpenDoors
            reserves the right to adjust fees. Current rates are communicated via application,
            email, or SMS, and users are responsible for remaining informed of any changes.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Taxes:</strong> OpenDoors will
            calculate and collect all applicable federal and regional taxes, which will be
            processed and deducted as part of the total transaction.
          </li>
        </Ul>
        <H3>13.4 Driver Wallet, Fee Deduction, and Thresholds</H3>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Wallet Requirement:</strong> To ensure
            reliable collection of Platform Fees, Drivers must maintain a positive balance in
            their &quot;MobiMates Driver Wallet&quot; by pre-funding via integrated mobile money
            or bank transfers before posting trips.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Automatic Deduction:</strong> Upon
            completion of a matched trip, the Platform Fee is automatically deducted from the
            Driver&apos;s wallet.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Minimum Threshold:</strong> If the
            wallet balance falls below Birr 300, the matching algorithm will automatically
            suspend the Driver from offering seats until the balance is topped up above this
            threshold.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Rounding Authority:</strong> OpenDoors
            reserves the right to round final Platform Fees and cost contributions to the
            nearest practical figure to facilitate smooth digital transactions.
          </li>
        </Ul>

        <H2>Article 14: Reliability, Feedback, and Cancellation</H2>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">
              Cancellation &amp; No-Show Policy:
            </strong>{" "}
            Users must honor their commitments. Persistent last-minute cancellations or
            no-shows are strictly prohibited and will lead to administrative review, temporary
            bans, or permanent suspension. OpenDoors reserves the right to implement future
            financial penalties for cancellations or no-shows, which will be deducted from the
            Driver&apos;s Wallet or applied to the Passenger&apos;s profile.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Wait Time:</strong> Drivers are only
            required to wait for a maximum of five (5) minutes at the designated meeting point.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Ratings &amp; Reviews:</strong> Every
            completed trip allows for a mutual star rating and review. OpenDoors monitors these
            ratings; users who consistently fail to meet platform quality standards or drop
            below the minimum threshold face service restrictions or account termination.
          </li>
        </Ul>

        <H2>Article 15: Limitation of Liability, Disclaimers, and Indemnification</H2>
        <H3>15.1 &quot;As Is&quot; Basis</H3>
        <P>
          The Platform is provided on an &quot;As Is&quot; and &quot;As Available&quot; basis.
          OpenDoors does not warrant uninterrupted service and is not liable for service
          degradation, interruptions, or technical failures. In such events, our obligation is
          limited to exercising reasonable efforts to restore the service.
        </P>
        <H3>15.2 Reasonable Effort</H3>
        <P>
          You acknowledge that matching algorithms and software optimizations are provided on a
          &quot;Reasonable Effort&quot; basis. The Company does not guarantee specific outcomes
          or constant availability of matches.
        </P>
        <H3>15.3 Disclaimer of Consequential Damages</H3>
        <P>
          OpenDoors shall not be liable for any indirect or consequential losses, including lost
          revenue, profits, or business interruption, arising from your use of the Platform or
          service disruptions.
        </P>
        <H3>15.4 Personal Property</H3>
        <P>
          You are solely responsible for your personal belongings. OpenDoors will assist in
          locating lost items on a &quot;best-effort&quot; basis but assumes no liability for
          the loss, theft, or damage of personal property.
        </P>
        <H3>15.5 Indemnification</H3>
        <P>
          You agree to indemnify and hold harmless OpenDoors and its affiliates from any claims,
          losses, damages, or legal costs arising from your breach of these Terms or misuse of
          the Platform.
        </P>
        <H3>15.6 Aggregate Liability</H3>
        <P>
          To the maximum extent permitted by Ethiopian law, the total aggregate liability of
          OpenDoors Africa Solutions PLC for any claims arising from your use of the Platform
          shall be limited to the amount of the last transaction fee actually paid by you to the
          OpenDoors.
        </P>

        <H2>Article 16: Intellectual Property Rights</H2>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Ownership:</strong> OpenDoors and its
            partners retain exclusive ownership of the platform, including all brand elements,
            software, databases, and collected user data.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Limited License:</strong> We grant you
            a personal, non-transferable, and revocable license to access the app solely for
            private, non-commercial carpooling, contingent on your strict compliance with these
            terms.
          </li>
        </Ul>
        <H3>Prohibitions</H3>
        <P>You are strictly prohibited from:</P>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Reverse Engineering:</strong>{" "}
            Attempting to decompile, disassemble, or derive the app&apos;s source code,
            algorithms, or infrastructure.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Exploitation:</strong> Copying,
            modifying, or using the platform to build competitive products or for unauthorized
            commercial purposes.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Data Scraping:</strong> Using
            automated tools or bots to harvest user details, route data, or transactional
            information. Any violation of these restrictions will result in the immediate
            revocation of your access and potential legal action.
          </li>
        </Ul>

        <H2>Article 17: Dispute Resolution</H2>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Intermediary Status:</strong>{" "}
            MobiMates is a digital matching platform, not a party to any transportation
            agreement. All arrangements are strictly between the Driver and the Passenger.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Dispute Resolution:</strong> Users
            must resolve grievances between themselves. If an amicable settlement is impossible,
            disputes may be referred to a competent Ethiopian court. All claims regarding a
            journey must be directed toward the co-traveler, not the Company.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Limited Company Role:</strong>{" "}
            OpenDoors is not liable for accidents, misconduct, damages, or losses related to any
            journey. The Company&apos;s role in legal proceedings is limited to providing data
            only upon formal court order or warrant.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Release of Liability:</strong> To the
            maximum extent permitted by law, you release OpenDoors and its representatives from
            all claims and damages, known or unknown, arising from your use of the platform or
            interactions with other users.
          </li>
        </Ul>

        <H2>Article 18: Force Majeure</H2>
        <P>
          OpenDoors shall not be liable for any failure or delay in performing obligations under
          these Terms if such performance is prevented or delayed by a Force Majeure Event.
        </P>

        <H2>Article 19: Governing Law and Emergency Protocols</H2>
        <H3>19.1 Governing Law</H3>
        <P>
          This Agreement, its interpretation, and all platform-related activities are governed
          exclusively by the laws of the Federal Democratic Republic of Ethiopia.
        </P>
        <H3>19.2 Emergency Protocol</H3>
        <P>
          In the event of a life-threatening emergency, accident, or security breach, prioritize
          safety. Users must immediately contact national emergency services. Once you are safe
          and authorities have been notified, report the incident to OpenDoors support for
          administrative documentation and account safety management.
        </P>

        <H2>Article 20: Contract Modification and Termination</H2>
        <H3>20.1 Contract Modification Procedure</H3>
        <P>
          OpenDoors reserves the right to amend this Agreement at any time to reflect
          operational changes or legislative requirements. Any modifications will be published
          on the Platform with an effective date. Users will be notified of such changes via
          in-app notification, SMS, or email prior to the effective date.
        </P>
        <H3>20.2 User-Initiated Termination</H3>
        <P>
          This agreement is of indefinite duration. You may terminate it at any time by
          uninstalling the application and permanently deleting your account.
        </P>
        <H3>20.3 Corporate Administrative Authority</H3>
        <P>OpenDoors reserves the right, at its sole discretion, to:</P>
        <Ul>
          <li>
            Suspend, restrict, or terminate access to the platform for safety, security, or
            compliance reasons.
          </li>
          <li>
            Modify these terms, pricing structures, or service fees, provided that users are
            notified of material changes.
          </li>
          <li>
            Suspend platform functionality for maintenance, updates, or optimizations.
          </li>
        </Ul>
        <H3>20.4 Settlement of Funds</H3>
        <P>
          In the event of account termination by OpenDoors, any remaining positive balance in
          the User&apos;s Wallet shall be refunded, subject to the deduction of any outstanding
          platform fees, pending disputes, or verified claims.
        </P>
        <H3>20.5 No Compensation</H3>
        <P>
          Except for the refund of existing wallet balances as stated above, you agree that you
          are not entitled to additional financial compensation or damages resulting from
          administrative suspension, platform modification, or account termination.
        </P>

        <H2>Article 21: Miscellaneous Provisions</H2>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Severability:</strong> If any
            provision of these Terms is found invalid or unenforceable by law, the remaining
            provisions remain fully valid and binding under Ethiopian law.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">No Waiver:</strong> OpenDoors&apos;
            failure to exercise any legal or contractual right does not constitute a waiver of
            that right. We reserve the right to enforce all terms at any time.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">No Partnership:</strong> These Terms
            do not create an agency, partnership, joint venture, or employer-employee
            relationship between OpenDoors and any User.
          </li>
        </Ul>
      </div>
    </article>
  );
}
