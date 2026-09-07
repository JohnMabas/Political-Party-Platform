import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StoreProvider } from './store/Store'
import { PublicLayout } from './layouts/PublicLayout'
import { AuthLayout } from './layouts/AuthLayout'

const Home = lazy(() => import('./pages/public/Home'))
const About = lazy(() => import('./pages/public/About'))
const Platform = lazy(() => import('./pages/public/Platform'))
const IssueDetail = lazy(() => import('./pages/public/IssueDetail'))
const CandidatesIndex = lazy(() => import('./pages/public/CandidatesIndex'))
const CandidateProfile = lazy(() => import('./pages/public/CandidateProfile'))
const EventsIndex = lazy(() => import('./pages/public/EventsIndex'))
const EventDetail = lazy(() => import('./pages/public/EventDetail'))
const NewsIndex = lazy(() => import('./pages/public/NewsIndex'))
const NewsDetail = lazy(() => import('./pages/public/NewsDetail'))
const Endorsements = lazy(() => import('./pages/public/Endorsements'))
const Donate = lazy(() => import('./pages/public/Donate'))
const DonateReceipt = lazy(() => import('./pages/public/DonateReceipt'))
const StorePage = lazy(() => import('./pages/public/StorePage'))
const VoterResources = lazy(() => import('./pages/public/VoterResources'))
const Join = lazy(() => import('./pages/public/Join'))
const PressKit = lazy(() => import('./pages/public/PressKit'))
const Careers = lazy(() => import('./pages/public/Careers'))
const Contact = lazy(() => import('./pages/public/Contact'))
const Compliance = lazy(() => import('./pages/public/Compliance'))
const Login = lazy(() => import('./pages/public/Login'))
const VolunteerSignup = lazy(() => import('./pages/public/VolunteerSignup'))

const VolunteerDashboard = lazy(() => import('./pages/volunteer/Dashboard'))
const MyTasks = lazy(() => import('./pages/volunteer/MyTasks'))
const MyEvents = lazy(() => import('./pages/volunteer/MyEvents'))
const MyDonations = lazy(() => import('./pages/volunteer/MyDonations'))
const Referrals = lazy(() => import('./pages/volunteer/Referrals'))
const MyTeam = lazy(() => import('./pages/volunteer/MyTeam'))
const Messages = lazy(() => import('./pages/volunteer/Messages'))
const VolunteerSettings = lazy(() => import('./pages/volunteer/Settings'))

const StaffOverview = lazy(() => import('./pages/staff/Overview'))
const SupporterDatabase = lazy(() => import('./pages/staff/SupporterDatabase'))
const Canvassing = lazy(() => import('./pages/staff/Canvassing'))
const PhoneBank = lazy(() => import('./pages/staff/PhoneBank'))
const EventsManagement = lazy(() => import('./pages/staff/EventsManagement'))
const Fundraising = lazy(() => import('./pages/staff/Fundraising'))
const Outreach = lazy(() => import('./pages/staff/Outreach'))
const VolunteerManagement = lazy(() => import('./pages/staff/VolunteerManagement'))
const ComplianceReporting = lazy(() => import('./pages/staff/ComplianceReporting'))
const SiteContent = lazy(() => import('./pages/staff/SiteContent'))
const StaffPermissions = lazy(() => import('./pages/staff/StaffPermissions'))

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-label="Loading" />
    </div>
  )
}

function AuthenticatedLayout() {
  return <AuthLayout />
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
          {/* Public site */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/platform/:slug" element={<IssueDetail />} />
            <Route path="/candidates" element={<CandidatesIndex />} />
            <Route path="/candidates/:slug" element={<CandidateProfile />} />
            <Route path="/take-action" element={<Navigate to="/volunteer" replace />} />
            <Route path="/volunteer" element={<VolunteerSignup />} />
            <Route path="/events" element={<EventsIndex />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/news" element={<NewsIndex />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/endorsements" element={<Endorsements />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/donate/receipt" element={<DonateReceipt />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/voter-resources" element={<VoterResources />} />
            <Route path="/join" element={<Join />} />
            <Route path="/press-kit" element={<PressKit />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Authenticated portals keep the auth shell but no public chrome */}
          <Route element={<AuthenticatedLayout />}>
            <Route path="/portal" element={<VolunteerDashboard />} />
            <Route path="/portal/tasks" element={<MyTasks />} />
            <Route path="/portal/events" element={<MyEvents />} />
            <Route path="/portal/donations" element={<MyDonations />} />
            <Route path="/portal/referrals" element={<Referrals />} />
            <Route path="/portal/team" element={<MyTeam />} />
            <Route path="/portal/messages" element={<Messages />} />
            <Route path="/portal/settings" element={<VolunteerSettings />} />

            <Route path="/staff" element={<StaffOverview />} />
            <Route path="/staff/database" element={<SupporterDatabase />} />
            <Route path="/staff/field" element={<Canvassing />} />
            <Route path="/staff/phone-bank" element={<PhoneBank />} />
            <Route path="/staff/events" element={<EventsManagement />} />
            <Route path="/staff/fundraising" element={<Fundraising />} />
            <Route path="/staff/outreach" element={<Outreach />} />
            <Route path="/staff/volunteers" element={<VolunteerManagement />} />
            <Route path="/staff/compliance" element={<ComplianceReporting />} />
            <Route path="/staff/content" element={<SiteContent />} />
            <Route path="/staff/permissions" element={<StaffPermissions />} />
          </Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </StoreProvider>
  )
}
