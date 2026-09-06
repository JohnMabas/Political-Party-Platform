import { Outlet } from 'react-router-dom'
import { PublicHeader, CountdownStrip, Footer } from '../components/layout/PublicLayout'

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <PublicHeader />
      <CountdownStrip />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
