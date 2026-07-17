const CONTACT = {
  company: "OpenDoors Africa Solutions PLC",
  city: "Addis Ababa, Ethiopia",
  email: "support@themobimates.com",
} as const;

function ContactBlock() {
  return (
    <address className="not-italic text-[var(--color-ink-soft)]">
      <p className="font-semibold text-[var(--color-forest)]">{CONTACT.company}</p>
      <p>{CONTACT.city}</p>
      <p>
        Email:{" "}
        <a
          href={`mailto:${CONTACT.email}`}
          className="text-[var(--color-amber)] underline-offset-2 hover:underline"
        >
          {CONTACT.email}
        </a>
      </p>
    </address>
  );
}

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

export default function PrivacyPolicy() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <header className="border-b border-[var(--color-line)] pb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-amber)]">
          Legal
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--color-forest)] md:text-5xl">
          Privacy Policy for MobiMates
        </h1>
        <p className="mt-3 text-base text-[var(--color-ink-soft)]">{CONTACT.company}</p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          Last Updated: June 10, 2026
        </p>
      </header>

      <div className="legal-body">
        <P>
          At OpenDoors Africa Solutions PLC (operated under the brand MobiMates), we are
          dedicated to protecting your personal information and being transparent about how we
          use it. This Privacy Policy applies to all data gathered and all transactions supported
          through the MobiMates application, website, and services. It describes the personal
          data we collect, how it is used and shared, and your choices regarding this data.
        </P>
        <P>
          Please review this Privacy Policy periodically, as we may revise it from time to time.
          Each time you use the MobiMates platform or provide us with information, you are deemed
          to accept the practices and conditions described in this Privacy Policy.
        </P>

        <H2>Scope</H2>
        <P>
          This policy applies to users of MobiMates services in Ethiopia, including users of
          MobiMates&apos; apps, websites, features, and other services. This policy describes how
          MobiMates and its affiliates collect and use personal data. It applies to all users of
          our platform anywhere in Ethiopia and in any other jurisdiction where MobiMates
          operates.
        </P>

        <H2>Data Controller and Data Protection Officer</H2>
        <P>
          OpenDoors Africa Solutions PLC is the data controller for personal data collected in
          connection with use of MobiMates&apos; services. Questions, comments, and complaints
          about MobiMates&apos; data practices can be submitted by email to our office. For any
          grievances related to data privacy, you may contact us at:
        </P>
        <div className="mt-4">
          <ContactBlock />
        </div>

        <H2>Data We Collect from Users</H2>
        <P>
          To operate MobiMates&apos; services and to provide users with information about
          products or services that may be of interest, MobiMates collects personal information
          of users. You represent and warrant that you have the authority to provide us with any
          such information.
        </P>
        <P>MobiMates collects and stores data under three categories:</P>

        <H3>A. Data Provided by Users</H3>
        <P>
          This includes information you give us directly when creating or updating your account:
        </P>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">User Profile:</strong> Name, email
            address, phone number, date of birth, gender, profile photo, mini-biography, home and
            office addresses, usual travel times, company or organization, profession, official
            email address, and referring user via promo code.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Identity Verification:</strong>{" "}
            Passport, Driving License, Kebele ID, Fayda national ID, or other government-issued
            identification documents required for safety and regulatory compliance.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Vehicle Information:</strong> Vehicle
            make, model, type, registration number, and vehicle photograph.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">
              Payment &amp; Redemption Information:
            </strong>{" "}
            Preferred payment method (mobile wallet, bank card, etc.), payment instrument
            details, and chosen redemption mechanism (bank account, mobile wallet, etc.).
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Emergency Contact Information:</strong>{" "}
            Name and contact details of the user&apos;s designated emergency contact.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Skills and Interests:</strong>{" "}
            Optionally provided by users to enrich the community experience.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Social Network Accounts:</strong>{" "}
            Facebook, LinkedIn, Twitter, or other accounts, if the user chooses to connect them
            to their MobiMates account.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Referral Data:</strong> Contact
            details shared by a referring user when inviting others to join MobiMates.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">User Feedback:</strong> Ratings,
            reviews, complaints, and survey responses about other users and MobiMates services.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Demographic Data:</strong> Collected
            through surveys or from third-party analytics partners. Participation in voluntary
            surveys is on the basis of consent.
          </li>
        </Ul>

        <H3>B. Data Generated Through Use of the Platform</H3>
        <P>This includes data created when you use MobiMates&apos; services:</P>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Location Data:</strong> MobiMates
            collects precise or approximate location data from your mobile device, with your
            consent, when the app is running in the foreground or background. Location data is
            collected from the time a ride is requested until it is completed, and any time the
            app is running in the foreground. This data is used to match co-travelers, provide
            navigation, enable automatic ride check-in and check-out, improve pick-up accuracy,
            and ensure user safety.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Transaction Information:</strong> Type
            of service requested or provided, date and time, booking records, distance travelled,
            amount paid or cost-shared, payment method used, promotion codes applied, and route
            taken.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Usage Data:</strong> Access dates and
            times, app features or pages visited, app crashes and system activity, browser type,
            and third-party services used before interacting with MobiMates. Collected through
            logs, events, cookies, and similar technologies.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Device Data:</strong> Hardware model,
            IP address, operating system and version, unique device identifiers, advertising
            identifiers, serial number, device motion data, and mobile network data.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Communications Data:</strong> MobiMates
            enables in-app messaging and calls between co-travelers. Records of such
            communications may be retained and used for customer support, safety and security
            purposes, and service improvement. In-app messages may be scanned to prevent fraud
            (e.g., attempts to circumvent the booking system) and to ensure community safety.
            These communications are not used for commercial advertising.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">
              Payment and Redemption Records:
            </strong>{" "}
            Detailed records of all financial transactions within the platform, including
            transaction ID, date, time, and amount.
          </li>
        </Ul>

        <H3>C. Data from Other Sources</H3>
        <P>MobiMates may also receive data from:</P>
        <Ul>
          <li>
            User feedback, ratings, complaints, and support tickets submitted by other users.
          </li>
          <li>Users participating in our referral program.</li>
          <li>
            Users or others providing information in connection with claims or disputes.
          </li>
          <li>
            Third-party vendors assisting with identity verification, background checks, and
            security.
          </li>
          <li>Publicly available sources.</li>
          <li>Marketing service providers.</li>
        </Ul>
        <P>
          MobiMates may combine data from any of the above sources with other data it holds.
        </P>

        <H2>How We Use Your Personal Data</H2>
        <P>
          MobiMates uses personal data to operate and improve the platform, connect users for
          ride sharing, process transactions, and fulfill legal obligations. Specific purposes
          include:
        </P>

        <H3>Service Delivery and Operations</H3>
        <Ul>
          <li>Creating and updating user accounts, and verifying user identity.</li>
          <li>
            Matching users for intra-city and inter-city carpooling based on location, route,
            time, gender preference, and organization.
          </li>
          <li>Processing cost-sharing payments and facilitating payment transactions.</li>
          <li>Tracking and sharing ride progress with co-travelers.</li>
          <li>
            Enabling features such as favorite routes, saved locations, and quick access to
            recently used destinations.
          </li>
          <li>
            Performing internal operations including software troubleshooting, data analysis,
            testing, and service monitoring.
          </li>
        </Ul>

        <H3>Safety and Security</H3>
        <Ul>
          <li>
            Screening and verifying users prior to and during platform use, including periodic
            reviews.
          </li>
          <li>
            Monitoring driving behavior (e.g., route deviation, unsafe driving) and verifying
            on-time pickup and departure.
          </li>
          <li>
            Using device, location, profile, and usage data to detect and prevent fraud and
            unsafe activities.
          </li>
          <li>
            Using user ratings and feedback to enforce community guidelines and as grounds for
            suspension or deactivation.
          </li>
        </Ul>

        <H3>Customer Support</H3>
        <Ul>
          <li>Directing inquiries to the appropriate support representative.</li>
          <li>Investigating and addressing user concerns.</li>
          <li>Monitoring and improving customer support processes.</li>
        </Ul>

        <H3>Research and Development</H3>
        <Ul>
          <li>
            Testing, analysis, and machine learning to improve the platform experience and
            safety.
          </li>
          <li>Developing new features and service enhancements.</li>
          <li>Facilitating financial solutions in connection with our services.</li>
        </Ul>

        <H3>Communications Between Users</H3>
        <Ul>
          <li>
            Enabling co-travelers to message or call each other to confirm pick-up location,
            timing, payment, or other trip details.
          </li>
        </Ul>

        <H3>Marketing and Non-Marketing Communications</H3>
        <Ul>
          <li>
            Sending users information about MobiMates services, features, promotions, surveys,
            news, and events, personalized based on location, past usage, and preferences.
          </li>
          <li>
            Sending non-marketing communications such as receipts, service change notices, and
            policy updates.
          </li>
          <li>
            Users may opt out of marketing communications via their account settings at any
            time.
          </li>
        </Ul>

        <H3>Legal and Regulatory Compliance</H3>
        <Ul>
          <li>
            Complying with Ethiopian transport, tax, and electronic commerce regulations.
          </li>
          <li>
            Investigating or addressing claims or disputes related to the use of MobiMates&apos;
            services.
          </li>
          <li>
            Responding to lawful requests from government authorities, law enforcement, or
            courts.
          </li>
        </Ul>

        <H3>Automated Decision-Making</H3>
        <Ul>
          <li>
            Automatic matching of co-travelers based on route, time, location, gender
            preference, and organization.
          </li>
          <li>Automatic ride start and end detection based on location data.</li>
          <li>
            Using ratings and feedback to decide on user continuation, suspension, or
            deactivation.
          </li>
          <li>Fraud detection and prevention.</li>
          <li>
            Applying cancellation or no-show fees based on user location and behavior data.
          </li>
          <li>
            Generating periodic carpool activity reports for corporate or enterprise clients
            (e.g., HR, admin, transport departments), including data such as rides taken,
            distance travelled, CO2 saved, and cost savings per user.
          </li>
        </Ul>

        <H2>Accessing and Editing Your Personal Information</H2>
        <P>
          MobiMates provides users with the ability to access and edit personal information
          through the profile, account, and settings sections of the app. Our databases
          automatically update any personal information that is edited and saved. Users may also
          contact us at the address below to request access to, correction of, or deletion of
          their personal data.
        </P>

        <H2>Data Sharing and Disclosure</H2>
        <P>
          MobiMates does not sell your personal data. Some of our services and features require
          sharing data with other users or third parties. We may also share data with
          affiliates, partners, and authorities for legal reasons or in connection with
          disputes. All sharing is governed by this Policy and applicable data protection law.
        </P>

        <H3>With Other MobiMates Users</H3>
        <P>
          Trip-essential information is shared between matched co-travelers to facilitate the
          ride. This includes first name, rating, organization, verification status, number of
          completed rides, route, and — where the user permits — contact information and
          real-time location. Every MobiMates user agrees that information received about other
          users through the platform may only be used for MobiMates services and not shared with
          third parties or used for any other purpose.
        </P>

        <H3>With the General Public</H3>
        <P>
          Questions or comments submitted through public forums such as MobiMates blogs or
          social media pages may be viewable by the public, including any personal data included
          in the submission.
        </P>

        <H3>With Parent Companies, Subsidiaries, and Affiliates</H3>
        <P>
          We share data with our subsidiaries and affiliates to support service delivery and
          data processing. Any such entities that receive personal data from MobiMates will
          comply with the terms of this Privacy Policy. We may also disclose demographic
          information alongside personal data on a non-anonymous basis to affiliated entities
          under common corporate control.
        </P>

        <H3>With Vendors, Service Providers, and Business Partners</H3>
        <P>
          MobiMates shares data with third-party service providers and partners who assist us in
          delivering our services, subject to strict confidentiality agreements. These include:
        </P>
        <Ul>
          <li>Payment processors and mobile wallet providers</li>
          <li>Identity verification and background check providers</li>
          <li>Cloud storage providers (servers located within Ethiopia)</li>
          <li>Map and navigation providers (e.g., Google Maps)</li>
          <li>Marketing and advertising platform providers</li>
          <li>Data analytics providers</li>
          <li>Research partners conducting surveys or studies on behalf of MobiMates</li>
          <li>Vendors supporting platform security and safety</li>
          <li>Professional service providers (lawyers, accountants, consultants)</li>
          <li>Insurance and financial solution partners</li>
          <li>Corporate or enterprise clients (for agreed reporting purposes)</li>
        </Ul>
        <P>
          Any third party authorized to receive your personal data is required to use it only in
          accordance with our contractual agreements and applicable privacy laws. MobiMates is
          not responsible for the independent privacy practices of third parties.
        </P>

        <H3>For Legal Requirements and Dispute Resolution</H3>
        <P>
          MobiMates reserves the right to disclose user information to Ethiopian government
          authorities, law enforcement, regulatory bodies, or courts as required by law or court
          order, to enforce our Terms and Conditions, to protect the rights or safety of users
          or MobiMates, or in connection with any legal claim or dispute.
        </P>

        <H3>Transfer of Ownership or Assets</H3>
        <P>
          In the event of a merger, acquisition, restructuring, financing, or sale of MobiMates
          or its assets, your personal data may be transferred to the successor entity. Users
          will be notified of any such transfer that materially affects their data rights.
        </P>

        <H3>With User Consent</H3>
        <P>
          MobiMates may share a user&apos;s personal data beyond the purposes described in this
          Policy if we notify the user and they consent to the sharing.
        </P>

        <H2>Data Localization, Retention, and Deletion</H2>

        <H3>Data Localization</H3>
        <P>
          In compliance with Ethiopian data sovereignty requirements, all personal data
          collected by MobiMates is stored on secure servers located within Ethiopia.
        </P>

        <H3>Data Retention</H3>
        <P>
          MobiMates retains user data for as long as necessary to fulfill the purposes for which
          it was collected, including to comply with legal, tax, and accounting obligations, and
          to prevent the circumvention of security bans. Different categories of data are
          retained for different periods depending on the type of data and applicable legal
          requirements.
        </P>

        <H3>Account Deletion</H3>
        <P>
          Users may request deletion of their account at any time through the in-app settings or
          by contacting MobiMates support. Upon receipt of a deletion request, MobiMates will
          suspend the user&apos;s account and will retain relevant data for the period required
          by law or by our legitimate operational interests as described in this Policy.
          MobiMates may retain certain data even after a deletion request to comply with legal
          or regulatory obligations, resolve disputes, or enforce agreements.
        </P>
        <P>
          By using the MobiMates platform, you acknowledge and agree that all information
          submitted becomes subject to our data management practices as described in this Policy
          and our Terms of Use.
        </P>

        <H2>Data Security</H2>
        <P>
          Your MobiMates account is protected by OTP (One-Time Password) authentication sent to
          your registered mobile number, ensuring that only you and authorized MobiMates
          personnel can access your account. To maintain this security, do not share your OTP
          with anyone. MobiMates staff will never proactively contact you to request your OTP or
          other sensitive account information.
        </P>
        <P>
          MobiMates implements appropriate technical and organizational measures to protect
          personal data against unauthorized access, loss, misuse, alteration, or disclosure.
          Our dedicated team regularly reviews security practices and ensures all staff are
          trained in our data protection obligations.
        </P>
        <P>
          If you use a shared mobile device, you should log out of your MobiMates account and
          close the app before another person uses the device. While MobiMates takes all
          reasonable precautions, we cannot guarantee absolute security of data transmitted over
          the internet. Users transmit information at their own risk.
        </P>
        <P>
          The MobiMates platform may contain links to third-party websites or services. MobiMates
          is not responsible for the privacy practices of those third parties and encourages
          users to read the privacy notices of each site or service they visit.
        </P>

        <H2>Your Data Rights</H2>
        <P>
          Under the Ethiopian Personal Data Protection Proclamation and other applicable law,
          you have the following rights regarding your personal data:
        </P>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Access:</strong> Request a copy of
            the personal data MobiMates holds about you.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Rectification:</strong> Request
            correction of inaccurate or incomplete personal data.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Erasure:</strong> Request deletion of
            your personal data, subject to legal retention obligations.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Objection and Withdrawal:</strong> Opt
            out of marketing communications or withdraw consent where processing is based on
            consent. Note that withdrawing consent may limit your ability to use features that
            depend on that data.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Data Portability:</strong> Request
            that your personal data be provided in a structured, commonly used format where
            technically feasible.
          </li>
        </Ul>
        <P>
          To exercise any of these rights, please contact our Data Protection Office at the
          address provided below. MobiMates will respond to all rights requests within the
          timeframes required by applicable law.
        </P>

        <H2>User Accountability and Platform Integrity</H2>

        <H3>Account Security</H3>
        <P>
          Users are responsible for maintaining the security and confidentiality of their login
          credentials. You must notify MobiMates immediately at the contact address below if
          your account has been lost, stolen, or compromised.
        </P>

        <H3>Platform Conduct</H3>
        <P>
          MobiMates reserves the right to scan and analyze in-app communications to prevent
          fraud, circumvention of the booking system, and other violations of our Terms and
          Conditions, and to ensure the safety of our community. Such monitoring is not used for
          commercial advertising purposes.
        </P>

        <H3>Misconduct Policy</H3>
        <P>
          MobiMates reserves the right to suspend or permanently terminate any user&apos;s
          account if their behavior is deemed a threat to the safety of other users or the
          security of the platform. MobiMates uses user ratings and feedback as one basis for
          such decisions.
        </P>

        <H2>Legal Basis for Processing</H2>
        <P>
          MobiMates collects and uses personal data only where it has one or more lawful grounds
          for doing so. These grounds include:
        </P>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Contractual Necessity:</strong>{" "}
            Processing required to deliver the services you request, including ride matching,
            cost-sharing, and payments.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Legal Obligation:</strong> Processing
            required to comply with Ethiopian transport, tax, financial, and data protection
            laws.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Legitimate Interest:</strong>{" "}
            Processing for purposes such as improving services, fraud prevention, safety, and
            analytics, provided these interests are not overridden by your rights and interests.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Consent:</strong> Processing based on
            your express consent, such as voluntary surveys or optional data sharing features.
            You may withdraw consent at any time, though doing so may affect your ability to use
            certain features.
          </li>
        </Ul>

        <H2>Choice and Transparency</H2>
        <P>MobiMates enables users to access and control their data, including through:</P>
        <Ul>
          <li>
            <strong className="text-[var(--color-forest)]">Account and Privacy Settings:</strong>{" "}
            The settings menu within the app allows users to update personal preferences and
            communication settings.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Device Permissions:</strong> Mobile
            platforms (Android, iOS) allow users to grant or deny permissions for location,
            contacts, camera, and other device data. Denying certain permissions may affect some
            features of the app. Android devices notify users of permissions before first use;
            iOS devices request permission the first time a feature requiring it is accessed.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">
              Data Access and Portability Requests:
            </strong>{" "}
            Users may contact us to request a copy or export of their personal data.
          </li>
          <li>
            <strong className="text-[var(--color-forest)]">Account Deletion:</strong> Users may
            request account deletion through the in-app settings or by contacting us.
          </li>
        </Ul>

        <H2>Updates to This Privacy Policy</H2>
        <P>
          This Privacy Policy will be updated periodically to reflect changes in our services,
          technology, legal requirements, and business practices. We will notify you of material
          changes via the Platform or by email. Your continued use of MobiMates after an update
          constitutes acceptance of the revised Policy to the extent permitted by applicable
          law.
        </P>
        <P>
          We encourage users to review this Policy regularly for the latest information on our
          privacy practices. By using the MobiMates platform, you confirm that you have read,
          understood, and agreed to the terms of the most current version of this Privacy Policy.
        </P>

        <H2>Contact Us</H2>
        <P>
          For any questions, concerns, or requests regarding this Privacy Policy or your
          personal data, please contact our office:
        </P>
        <div className="mt-4 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-cream-200)]/40 p-6">
          <ContactBlock />
        </div>
        <P>
          We are committed to resolving any concerns about your privacy in a fair and timely
          manner.
        </P>
      </div>
    </article>
  );
}
