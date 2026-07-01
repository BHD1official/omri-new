import { useState, useEffect, useRef } from "react";

// ===== תמונות (תיקיית assets) =====
import bgImg from "../assets/images/background.png";
import profileImgIntro from "../assets/images/profile-intro.png";
import decorImg from "../assets/images/decor.png";
import profileImgAbout from "../assets/images/profile-about.png";

// ===== תוכן המשפטים =====
const SLIDE1_TEXTS = ["אנחנו כותבים את ההיסטוריה של עם ישראל , איזו זכות."];
const SLIDE2_TEXTS = [
  "על המפקד להיות אומן בפרטים הקטנים ",
  "קפדנות בפרטים הקטנים והמעצבנים מייצרת ביטחון ושקט",
];
const SLIDE3_TEXTS = [
  '"בזכות מסירות נפשן,בזכות הלכתן לפני המחנה , בעוז, עוצמה,וודאות  מוחלטת בטוב ההולך ומופיע ומתוך כך האומץ  והגבורה למסור את נפשם"',
];

// ===== הגדרות =====
const TYPING_SPEED = 55;
const PROGRESS_MIN = 9;
const PROGRESS_MAX = 309;

type Screen = "intro" | "slide1" | "slide2" | "slide3" | "about";

// ===== Hook: אפקט טייפרייטר =====
function useTypewriter(texts: string[], active: boolean) {
  const [totalTyped, setTotalTyped] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalChars = texts.reduce((sum, t) => sum + t.length, 0);

  useEffect(() => {
    setTotalTyped(0);
    if (!active) return;
    intervalRef.current = setInterval(() => {
      setTotalTyped((prev) => {
        if (prev >= totalChars) { clearInterval(intervalRef.current!); return prev; }
        return prev + 1;
      });
    }, TYPING_SPEED);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [active, totalChars]);

  let remaining = totalTyped;
  const displayed = texts.map((t) => {
    const take = Math.min(remaining, t.length);
    remaining -= take;
    return t.slice(0, take);
  });

  return {
    displayed,
    progress: totalChars > 0 ? totalTyped / totalChars : 0,
    done: totalTyped >= totalChars,
  };
}

// ===== רכיב: פס התקדמות =====
function ProgressBar({ progress }: { progress: number }) {
  const fillWidth = PROGRESS_MIN + (PROGRESS_MAX - PROGRESS_MIN) * Math.min(1, Math.max(0, progress));
  return (
    <div className="absolute top-[86px] left-1/2 -translate-x-1/2 w-[319px] h-[15px]">
      <div className="absolute inset-0 bg-[#fffff6] rounded-[20px]" />
      <div
        className="absolute top-[2.5px] left-0 h-[10px] bg-[#f0e0bf] rounded-[13.417px]"
        style={{ width: `${fillWidth}px`, transition: `width ${TYPING_SPEED}ms linear` }}
      />
    </div>
  );
}

// ===== רכיב: תמונת עיצוב תחתונה =====
function BgDecor() {
  return (
    <div className="absolute h-[207px] left-[-15px] top-[682px] w-[466px] pointer-events-none">
      <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={decorImg} />
    </div>
  );
}

// ===== רכיב: כרטיס ציטוט =====
function QuoteCard({ top, height }: { top: number; height: number }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 w-[319px] bg-[#fffff6] rounded-[20px] shadow-[0px_4px_20px_2px_rgba(0,0,0,0.25)]"
      style={{ top, height }}
    />
  );
}

// ===== רכיב: מרכאה פותחת =====
function OpeningQuote({ top }: { top: number }) {
  return (
    <p
      className="absolute left-1/2 -translate-x-1/2 text-[60px] text-black text-center w-[46px] leading-normal not-italic"
      style={{ fontFamily: "'Lemon', sans-serif", top }}
      dir="auto"
    >
      "
    </p>
  );
}

// ===== רכיב: כפתור המשך =====
function NextButton({ onClick, disabled = false }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-[319px] h-[61px] bg-[#0a1416] rounded-[10px] cursor-pointer"
      style={{ opacity: disabled ? 0.4 : 1, transition: "opacity 0.4s" }}
    >
      <span
        className="text-white whitespace-nowrap"
        style={{ fontFamily: "'Heebo', sans-serif", fontSize: "25px", fontWeight: 900 }}
      >
        המשך !
      </span>
    </button>
  );
}

// ===== רכיב: רקע =====
function Bg() {
  return <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={bgImg} />;
}

// ===== מסך: פתיח =====
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative size-full">
      <Bg />
      <div className="absolute left-1/2 -translate-x-1/2 size-[260px] top-[55px]">
        <img alt='רס"ן אומרי חי בן משה' className="absolute block inset-0 max-w-none size-full" src={profileImgIntro} />
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[330px] w-[304px] text-center text-black leading-normal"
        style={{ fontFamily: "'Heebo', sans-serif", fontSize: "25.882px", fontWeight: 800 }}
        dir="auto"
      >
        <p>רס"ן אומרי חי</p>
        <p>בן משה הי"ד</p>
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[416px] text-center text-[#5d5d62] leading-normal whitespace-nowrap"
        style={{ fontFamily: "'Heebo', sans-serif", fontSize: "20px", fontWeight: 600 }}
        dir="auto"
      >
        <p>נפל בכ"ה באלול תשפ"ה</p>
        <p>18.9.25</p>
      </div>
      <QuoteCard top={481} height={210} />
      <OpeningQuote top={492} />
      <p
        className="absolute left-1/2 -translate-x-1/2 top-[560px] w-[220px] text-black text-center leading-normal"
        style={{ fontFamily: "'Playpen Sans Hebrew', sans-serif", fontSize: "29.276px", fontWeight: 600 }}
        dir="auto"
      >
        מבט אמוני , ריאלי ואופטימי
      </p>
      <button
        onClick={onStart}
        className="absolute left-1/2 -translate-x-1/2 top-[720px] w-[319px] h-[61px] bg-[#0a1416] rounded-[10px] cursor-pointer"
      >
        <span
          className="text-white whitespace-nowrap"
          style={{ fontFamily: "'Heebo', sans-serif", fontSize: "25px", fontWeight: 900 }}
        >
          להתחיל !
        </span>
      </button>
    </div>
  );
}

// ===== מסך: משפט ראשון =====
function Slide1({ onNext }: { onNext: () => void }) {
  const { displayed, progress, done } = useTypewriter(SLIDE1_TEXTS, true);
  return (
    <div className="relative size-full">
      <Bg />
      <ProgressBar progress={progress} />
      <QuoteCard top={148} height={284} />
      <OpeningQuote top={178.28} />
      <p
        className="absolute left-1/2 -translate-x-1/2 top-[256px] w-[253px] text-black text-center leading-normal text-[30px]"
        style={{ fontFamily: "'Playpen Sans Hebrew', sans-serif", fontWeight: 600 }}
        dir="auto"
      >
        {displayed[0]}
        <span className={`inline-block w-[2px] h-[30px] bg-black ml-1 ${done ? "opacity-0" : "animate-pulse"}`} />
      </p>
      <BgDecor />
      {done && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[480px]">
          <NextButton onClick={onNext} />
        </div>
      )}
    </div>
  );
}

// ===== מסך: משפט שני =====
function Slide2({ onNext }: { onNext: () => void }) {
  const { displayed, progress, done } = useTypewriter(SLIDE2_TEXTS, true);
  return (
    <div className="relative size-full">
      <Bg />
      <ProgressBar progress={progress} />
      <QuoteCard top={148} height={251} />
      <OpeningQuote top={178.28} />
      <p
        className="absolute left-1/2 -translate-x-1/2 top-[239px] w-[253px] text-black text-center leading-normal text-[30px]"
        style={{ fontFamily: "'Playpen Sans Hebrew', sans-serif", fontWeight: 600 }}
        dir="auto"
      >
        {displayed[0]}
        {displayed[0].length < SLIDE2_TEXTS[0].length && (
          <span className="inline-block w-[2px] h-[30px] bg-black ml-1 animate-pulse" />
        )}
      </p>
      <QuoteCard top={437} height={281} />
      <OpeningQuote top={467.28} />
      <p
        className="absolute left-1/2 -translate-x-1/2 top-[524px] w-[253px] text-black text-center leading-normal text-[30px]"
        style={{ fontFamily: "'Playpen Sans Hebrew', sans-serif", fontWeight: 600 }}
        dir="auto"
      >
        {displayed[1]}
        {displayed[1].length > 0 && displayed[1].length < SLIDE2_TEXTS[1].length && (
          <span className="inline-block w-[2px] h-[30px] bg-black ml-1 animate-pulse" />
        )}
      </p>
      <BgDecor />
      {done && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[760px]">
          <NextButton onClick={onNext} />
        </div>
      )}
    </div>
  );
}

// ===== מסך: משפט שלישי =====
function Slide3({ onNext }: { onNext: () => void }) {
  const { displayed, progress, done } = useTypewriter(SLIDE3_TEXTS, true);
  return (
    <div className="relative size-full">
      <Bg />
      <ProgressBar progress={progress} />
      <QuoteCard top={148} height={564} />
      <OpeningQuote top={178.28} />
      <p
        className="absolute left-1/2 -translate-x-1/2 top-[239px] w-[253px] text-black text-center leading-normal text-[30px] whitespace-pre-wrap"
        style={{ fontFamily: "'Playpen Sans Hebrew', sans-serif", fontWeight: 600 }}
        dir="auto"
      >
        {displayed[0]}
        {!done && <span className="inline-block w-[2px] h-[30px] bg-black ml-1 animate-pulse" />}
      </p>
      <BgDecor />
      <div className="absolute left-1/2 -translate-x-1/2 top-[759px]">
        <NextButton onClick={onNext} disabled={!done} />
      </div>
    </div>
  );
}

// ===== מסך: על אומרי =====
function AboutScreen() {
  return (
    <div className="relative size-full overflow-y-auto">
      <Bg />
      <div className="absolute left-1/2 -translate-x-1/2 top-[105px] w-[378px] min-h-[754px] bg-[#fffff6] rounded-[20px] shadow-[0px_4px_20px_2px_rgba(0,0,0,0.25)]" />
      <p
        className="absolute left-1/2 -translate-x-1/2 top-[134px] w-[339px] text-black text-center leading-normal text-[35px]"
        style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700 }}
        dir="auto"
      >
        רס"ן אומרי חי בן משה
      </p>
      <div className="absolute left-[31px] top-[194px] w-[340px] h-px bg-[#d9d9d9]" />
      <div className="absolute left-1/2 -translate-x-1/2 top-[278px] size-[260px]">
        <img alt='רס"ן אומרי חי בן משה' className="absolute block inset-0 max-w-none size-full" src={profileImgAbout} />
      </div>
      <div className="absolute bg-black h-[8px] left-1/2 -translate-x-1/2 rounded-[10px] top-[835px] w-[151px]" />
    </div>
  );
}

// ===== אפליקציה ראשית =====
export default function App() {
  const [screen, setScreen] = useState<Screen>("intro");

  const screens: Record<Screen, JSX.Element> = {
    intro: <IntroScreen onStart={() => setScreen("slide1")} />,
    slide1: <Slide1 onNext={() => setScreen("slide2")} />,
    slide2: <Slide2 onNext={() => setScreen("slide3")} />,
    slide3: <Slide3 onNext={() => setScreen("about")} />,
    about: <AboutScreen />,
  };

  return (
    <div className="min-h-screen bg-[#2a2a2a] flex items-center justify-center">
      <div className="rounded-[40px] shadow-2xl overflow-hidden relative" style={{ width: "390px", height: "844px" }}>
        {screens[screen]}
      </div>
    </div>
  );
}
