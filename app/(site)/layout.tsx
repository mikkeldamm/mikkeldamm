import { PathFollower } from '@/components/PathFollower';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteNav } from '@/components/SiteNav';

// Site chrome (nav, footer, path-follower) lives here so standalone
// pages like /cv can render without it.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PathFollower />
      <SiteNav />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </>
  );
}
