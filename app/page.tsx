import TopNav from '@/components/TopNav';
import Hero from '@/components/Hero';
import Work from '@/components/Work';
import LiveSites from '@/components/LiveSites';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import Hobbies from '@/components/Hobbies';
import Photos from '@/components/Photos';
import ApiWidget from '@/components/ApiWidget';
import Guestbook from '@/components/Guestbook';
import Contact from '@/components/Contact';
import NowPlaying from '@/components/NowPlaying';
import ShortcutHelp from '@/components/ShortcutHelp';
import MouseStars from '@/components/MouseStars';

export default function Home() {
  return (
    <>
      <MouseStars />
      <TopNav />
      <Hero />
      <Work />
      <LiveSites />
      <Projects />
      <TechStack />
      <Hobbies />
      <Photos />
      <ApiWidget />
      <Guestbook />
      <Contact />
      <NowPlaying />
      <ShortcutHelp />
    </>
  );
}
