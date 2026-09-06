import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider } from './store/Store'
import { PublicLayout } from './components/layout/PublicLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { RoleSwitcher } from './components/layout/AuthShell'

import Home from './pages/public/Home'
import About from './pages/public/About'
import Platform from './pages/public/Platform'
import IssueDetail from './pages/public/IssueDetail'
import CandidatesIndex from './pages/public/CandidatesIndex'
import CandidateProfile from './pages/public/CandidateProfile'
import TakeAction from './pages/public/TakeAction'
import EventsIndex from './pages/public/EventsIndex'
import EventDetail from './pages/public/EventDetail'
import NewsIndex from './pages/public/NewsIndex'
import NewsDetail from './pages/public/NewsDetail'
import Endorsements from './pages/public/Endorsements'
import Donate from './pages/public/Donate'
import DonateReceipt from './pages/public/DonateReceipt'
import StorePage from './pages/public/StorePage'
import VoterResources from './pages/public/VoterResources'
import Join from './pages/public/Join'
import PressKit from './pages/public/PressKit'
import Careers from './pages/public/Careers'
import Contact from './pages/public/Contact'
import Compliance from './pages/public/Compliance'
import Login from './pages/public/Login'

import VolunteerDashboard from './pages/volunteer/Dashboard'
import MyTasks from './pages/volunteer/MyTasks'
import MyEvents from './pages/volunteer/MyEvents'
import MyDonations from './pages/volunteer/MyDonations'
import Referrals from './pages/volunteer/Referrals'
import MyTeam from './pages/volunteer/MyTeam'
import Messages from './pages/volunteer/Messages'
import VolunteerSettings from './pages/volunteer/Settings'

import StaffOverview from './pages/staff/Overview'
import SupporterDatabase from './pages/staff/SupporterDatabase'
import Canvassing from './pages/staff/Canvassing'
import PhoneBank from './pages/staff/PhoneBank'
import EventsManagement from './pages/staff/EventsManagement'
import Fundraising from './pages/staff/Fundraising'
import Outreach from './pages/staff/Outreach'
import VolunteerManagement from './pages/staff/VolunteerManagement'
import ComplianceReporting from './pages/staff/ComplianceReporting'
import SiteContent from './pages/staff/SiteContent'
import StaffPermissions from './pages/staff/StaffPermissions'

function AuthenticatedLayout() {
  return <AuthLayout />
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          {/* Public site */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/platform/:slug" element={<IssueDetail />} />
            <Route path="/candidates" element={<CandidatesIndex />} />
            <Route path="/candidates/:slug" element={<CandidateProfile />} />
            <Route path="/take-action" element={<TakeAction />} />
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
        <RoleSwitcher />
      </BrowserRouter>
    </StoreProvider>
  )
}
