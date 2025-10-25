import Spline from '@splinetool/react-spline';

export default function HeroSpline() {
  return (
    <div className="absolute inset-0">
      <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-transparent" />
    </div>
  );
}
