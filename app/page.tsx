import StickySection from '@/components/StickySection';

export default function Home() {
  return (
    <main>
      <StickySection />
      
      <section className="about">
        <h2 className="text-4xl font-bold">Your next section</h2>
      </section>
    </main>
  );
}