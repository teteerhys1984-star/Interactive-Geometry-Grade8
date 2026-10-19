import { useId, useState } from 'react';
import type { InteractiveDiagram } from '@/content/schema';
import {
  crossOutline,
  latticeFigures,
  latticeOutlines,
  launchGrid,
  launchParallelograms,
  pavementPoints,
  pavementTiles,
  shift,
  stripPolygon,
} from '@/content/units/lesson-01-geometry';
import type { XY } from '@/content/units/lesson-01-geometry';
import styles from './LessonOneLab.module.css';

const blue = '#176ca4',
  teal = '#007b77',
  red = '#c43b32';
const points = (p: readonly XY[]) => p.map(([x, y]) => `${x},${y}`).join(' ');
function Dot({ name, at }: { name: string; at: XY }) {
  return (
    <g>
      <circle cx={at[0]} cy={at[1]} r="3" fill={blue} />
      <text x={at[0] + 5} y={at[1] - 8}>
        {name}
      </text>
    </g>
  );
}
function Shape({ vertices, color = blue }: { vertices: readonly XY[]; color?: string }) {
  return (
    <polygon
      points={points(vertices)}
      fill={color}
      fillOpacity=".13"
      stroke={color}
      strokeWidth="2"
    />
  );
}

function Tick({ a, b, double = false }: { a: XY; b: XY; double?: boolean }) {
  const dx = b[0] - a[0],
    dy = b[1] - a[1],
    len = Math.hypot(dx, dy);
  const x = (a[0] + b[0]) / 2,
    y = (a[1] + b[1]) / 2;
  return (
    <g>
      {(double ? [-3, 3] : [0]).map((offset) => {
        const cx = x + (dx / len) * offset,
          cy = y + (dy / len) * offset;
        return (
          <line
            key={offset}
            x1={cx - (dy / len) * 5}
            y1={cy + (dx / len) * 5}
            x2={cx + (dy / len) * 5}
            y2={cy - (dx / len) * 5}
            stroke={red}
            strokeWidth="2"
          />
        );
      })}
    </g>
  );
}
function Angle({ a, o, b }: { a: XY; o: XY; b: XY }) {
  const angleA = Math.atan2(a[1] - o[1], a[0] - o[0]);
  let delta = Math.atan2(b[1] - o[1], b[0] - o[0]) - angleA;
  if (delta > Math.PI) delta -= 2 * Math.PI;
  if (delta < -Math.PI) delta += 2 * Math.PI;
  return (
    <g>
      {[18, 23].map((r) => (
        <path
          key={r}
          d={`M${o[0] + r * Math.cos(angleA)} ${o[1] + r * Math.sin(angleA)} A${r} ${r} 0 0 ${delta > 0 ? 1 : 0} ${o[0] + r * Math.cos(angleA + delta)} ${o[1] + r * Math.sin(angleA + delta)}`}
          fill="none"
          stroke={red}
          strokeWidth="2"
        />
      ))}
    </g>
  );
}

/** Every control changes a geometric quantity, never a source condition. */
export function LessonOneLab({ spec }: { spec: InteractiveDiagram }) {
  const uid = useId().replace(/:/g, '');
  const [progress, setProgress] = useState(0);
  const [selection, setSelection] = useState('ABDE');
  const [radius, setRadius] = useState(72);
  const mode = String(spec.params.mode);
  let body;
  let controls;
  let message: string;
  let viewBox = '0 0 600 330';

  if (mode === 'grid') {
    const projected = (name: string): XY => {
      const v = launchGrid[name]!;
      return [70 + v[0] * 50, 60 + v[1] * 50];
    };
    const v = [...selection].map(projected);
    const mid: XY = [(v[0]![0] + v[2]![0]) / 2, (v[0]![1] + v[2]![1]) / 2];
    body = (
      <>
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={70 + i * 50} x2={70 + i * 50} y1="40" y2="280" stroke="#bfd3de" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`h${i}`} x1="50" x2="490" y1={60 + i * 50} y2={60 + i * 50} stroke="#bfd3de" />
        ))}
        <Shape vertices={v} />
        <path
          d={`M${points([v[0]!, v[2]!]).replace(' ', ' L')} M${points([v[1]!, v[3]!]).replace(' ', ' L')}`}
          stroke={red}
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <Dot name="O" at={mid} />
        {Object.keys(launchGrid).map((n) => (
          <Dot key={n} name={n} at={projected(n)} />
        ))}
      </>
    );
    controls = (
      <label>
        أبرز الرباعي{' '}
        <select value={selection} onChange={(e) => setSelection(e.target.value)}>
          {launchParallelograms.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
    );
    message =
      'القطران الأحمران يلتقيان في منتصف مشترك؛ تغيير الاختيار يكشف رباعياً آخر، ولا يغيّر مواضع النقاط.';
  } else if (mode === 'circles') {
    const O: XY = [300, 160],
      A: XY = [430, 160],
      B: XY = [170, 160];
    const D: XY = [300 + radius * Math.cos(Math.PI / 6), 160 - radius * 0.5];
    const C: XY = [600 - D[0], 320 - D[1]];
    body = (
      <>
        <circle cx="300" cy="160" r="130" fill="none" stroke={blue} />
        <circle cx="300" cy="160" r={radius} fill="none" stroke={teal} />
        <Shape vertices={[A, C, B, D]} />
        <path d={`M170 160H430 M${C[0]} ${C[1]}L${D[0]} ${D[1]}`} stroke={red} strokeWidth="2" />
        <path d="M338 160 A38 38 0 0 0 332.91 141" fill="none" stroke={red} />
        <text x="346" y="146">
          30°
        </text>
        {Object.entries({ O, A, B, C, D }).map(([n, at]) => (
          <Dot key={n} name={n} at={at} />
        ))}
      </>
    );
    controls = (
      <label>
        نصف قطر الدائرة الثانية{' '}
        <input
          aria-label="نصف قطر الدائرة الثانية"
          type="range"
          min="45"
          max="115"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
        />
      </label>
    );
    message =
      'يتغيّر حجم الدائرة الثانية فقط. يبقى المركز منتصف كل قطر، وتبقى الزاوية ثلاثين درجة؛ لذلك يظل الرباعي متوازي أضلاع.';
  } else if (mode === 'area') {
    body = (
      <>
        <Shape
          vertices={[
            [170, 70],
            [420, 70],
            [320, 220],
            [70, 220],
          ]}
        />
        <path d="M170 70V220h15v-15h-15" fill="none" stroke={red} strokeWidth="2" />
        {Object.entries({ A: [170, 70], B: [420, 70], C: [320, 220], D: [70, 220] }).map(
          ([n, at]) => (
            <Dot key={n} name={n} at={at as unknown as XY} />
          ),
        )}
        <text x="270" y="55">
          5 cm
        </text>
        <text x="180" y="150">
          3 cm
        </text>
        <text x="80" y="135">
          4 cm
        </text>
        <text x="375" y="160">
          4 cm
        </text>
      </>
    );
    message =
      'رسم تخطيطي غير مقياسي؛ القياسات المعطاة والعلامة القائمة هي المرجع. الارتفاع عمودي على القاعدة، وليس الضلع المائل.';
  } else if (mode === 'diagonals') {
    const v: XY[] = [
      [340, 60],
      [460, 120],
      [180, 270],
      [60, 210],
    ];
    body = (
      <>
        <Shape vertices={v} />
        <path d="M340 60L180 270M460 120L60 210" stroke={red} strokeWidth="2" />
        {['P', 'M', 'Q', 'N'].map((n, i) => (
          <Dot key={n} name={n} at={v[i]!} />
        ))}
        <Tick a={[340, 60]} b={[260, 165]} double />
        <Tick a={[180, 270]} b={[260, 165]} double />
        <Tick a={[460, 120]} b={[260, 165]} />
        <Tick a={[60, 210]} b={[260, 165]} />
      </>
    );
    message =
      'علامتان على نصفي القطر الأول، وعلامة على نصفي الثاني: كل قطر ينصف الآخر، ولا تعني العلامات تساوي القطرين.';
  } else if (mode === 'marked') {
    body = (
      <>
        <Shape
          vertices={[
            [50, 70],
            [180, 80],
            [230, 230],
            [100, 220],
          ]}
        />
        <line x1="50" y1="70" x2="230" y2="230" stroke={red} />
        <Tick a={[50, 70]} b={[180, 80]} />
        <Tick a={[100, 220]} b={[230, 230]} />
        <Angle a={[180, 80]} o={[50, 70]} b={[230, 230]} />
        <Angle a={[50, 70]} o={[230, 230]} b={[100, 220]} />
        {Object.entries({ U: [50, 70], C: [180, 80], E: [230, 230], P: [100, 220] }).map(
          ([n, at]) => (
            <Dot key={n} name={n} at={at as unknown as XY} />
          ),
        )}
        <Shape
          vertices={[
            [400, 80],
            [550, 70],
            [480, 230],
            [330, 240],
          ]}
        />
        <path d="M400 80L480 230M550 70L330 240" stroke={red} />
        {Object.entries({ L: [400, 80], T: [550, 70], E: [480, 230], M: [330, 240] }).map(
          ([n, at]) => (
            <Dot key={n} name={n} at={at as unknown as XY} />
          ),
        )}
        <Tick a={[400, 80]} b={[440, 155]} double />
        <Tick a={[480, 230]} b={[440, 155]} double />
        <Tick a={[550, 70]} b={[440, 155]} />
        <Tick a={[330, 240]} b={[440, 155]} />
        <text x="140" y="295">
          ②
        </text>
        <text x="440" y="295">
          ①
        </text>
      </>
    );
    message =
      'رسم تعليمي للمعطيات لا محاكاة لاهتزاز الخط اليدوي. في ① نقرأ تنصيف القطرين؛ وفي ② نقرأ تساوي الضلعين والزاويتين عند القطر.';
  } else if (mode === 'pavement' || mode === 'pavement-second') {
    viewBox = '-30 -25 420 405';
    const scale = (v: XY): XY => [v[0] * 16, v[1] * 16];
    const vector: XY = mode === 'pavement' ? [-12, 0] : [-6, 4];
    const from = pavementTiles[1]!;
    const moving = shift(from, [(vector[0] * progress) / 100, (vector[1] * progress) / 100]);
    body = (
      <>
        <defs>
          <clipPath id={`${uid}-clip`}>
            <rect width="368" height="368" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-clip)`}>
          {Array.from({ length: 9 }, (_, k) =>
            Array.from({ length: 8 }, (_, j) => {
              const center: XY = [1 + 3 * k, -4 + 4 * j + 2 * (k % 2)];
              const number = Object.entries(pavementTiles).find(
                ([, v]) => v[0] === center[0] && v[1] === center[1],
              )?.[0];
              const yellow = number ? [1, 2, 3, 4, 5].includes(Number(number)) : (j + k) % 2;
              return (
                <polygon
                  key={`${k}-${j}`}
                  points={points(crossOutline.map((v) => scale(shift(v, center))))}
                  fill={yellow ? '#ffe18a' : '#b68a25'}
                  stroke="#69501b"
                  strokeWidth="1"
                />
              );
            }),
          )}
          {Object.entries(pavementTiles).map(([n, at]) => (
            <text
              key={n}
              x={at[0] * 16}
              y={at[1] * 16 + 5}
              textAnchor="middle"
              style={{ fill: '#9b3100', fontWeight: 700 }}
            >
              {n}
            </text>
          ))}
          <polygon
            points={points(crossOutline.map((v) => scale(shift(v, moving))))}
            fill="#00a8a0"
            fillOpacity=".4"
            stroke={teal}
            strokeWidth="3"
          />
        </g>
        {Object.entries(pavementPoints).map(([n, at]) => (
          <Dot key={n} name={n} at={scale(at)} />
        ))}
      </>
    );
    controls = (
      <label>
        حرّك قصاصة الحجر ①{' '}
        <input
          type="range"
          aria-label="تقدّم انسحاب الحجر"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
        />
      </label>
    );
    message =
      mode === 'pavement'
        ? 'اسحب من البداية إلى النهاية: تتحرك القصاصة من ① إلى ② دون دوران. الحروف على الرصيف ثابتة لتقارن موضع كل نقطة قبل النقل وبعده.'
        : 'الناقل الآن من A إلى M: تتحرك القصاصة من ① إلى ④. مقدار النقل واتجاهه ثابتان لكل نقطة من القصاصة.';
  } else if (mode === 'strip') {
    viewBox = '0 0 600 250';
    body = (
      <>
        {Array.from({ length: 5 }, (_, col) =>
          Array.from({ length: 3 }, (_, row) => {
            const x = 65 + col * 90 + (row === 1 ? -40 : 0),
              y = 35 + row * 45;
            return (
              <g key={`${col}${row}`}>
                <polygon
                  points={points(stripPolygon(3 * col + row + 1))}
                  fill={(row + col) % 2 ? '#ffe18a' : '#b2daf0'}
                  stroke="#6e9baa"
                />
                <text x={x + 45 + (row === 1 ? 20 : -20)} y={y + 28} textAnchor="middle">
                  {3 * col + row + 1}
                </text>
              </g>
            );
          }),
        )}
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i}>
            <text x={25 + i * 90} y="94">
              {String.fromCharCode(65 + i)}
            </text>
            <text x={25 + i * 90} y="195">
              {String.fromCharCode(65 + i)}′
            </text>
          </g>
        ))}
      </>
    );
    message =
      'الأرقام تتدرج نزولاً داخل كل عمود. النقاط A إلى F على حد الصفين الأول والثاني، والنقاط ذات الشرطة على الحد السفلي. تتطابق الأشكال رغم اختلاف الألوان.';
  } else if (mode === 'counter') {
    body = (
      <>
        <circle cx="75" cy="150" r="65" fill="none" stroke={blue} strokeWidth="2" />
        <circle cx="75" cy="150" r="48" fill="none" stroke={red} strokeWidth="2" />
        <path d="M230 180V70H170V110H230" fill="none" stroke={blue} strokeWidth="2" />
        <path d="M260 180V70H320V110H260" fill="none" stroke={red} strokeWidth="2" />
        <path d="M355 155L375 65L395 155M365 110H385" fill="none" stroke={blue} strokeWidth="2" />
        <path d="M340 270L375 185L410 270M352 240H398" fill="none" stroke={red} strokeWidth="2" />
        <Shape
          vertices={[
            [455, 100],
            [485, 65],
            [515, 100],
            [570, 100],
            [540, 130],
            [515, 130],
            [515, 165],
            [485, 130],
            [485, 100],
          ]}
        />
        <Shape
          color={red}
          vertices={[
            [480, 235],
            [495, 217],
            [510, 235],
            [540, 235],
            [525, 251],
            [510, 251],
            [510, 269],
            [495, 251],
            [495, 235],
          ]}
        />
        {[4, 3, 2, 1].map((n, i) => (
          <text key={n} x={75 + i * 150} y="310">
            {n}
          </text>
        ))}
      </>
    );
    message =
      'تمثيل تعليمي للعلاقات في اللوحات: اختلاف الحجم في ① و② و④، وانعكاس جهة السارية في ③. التوازي وحده لا يكفي لكون الحركة انسحاباً.';
  } else if (mode === 'lattice') {
    viewBox = '0 0 610 330';
    const project = (v: XY): XY => [22 + v[0] * 23, 25 + v[1] * 23 * Math.sqrt(3)];
    body = (
      <>
        {Array.from({ length: 6 }, (_, r) => (
          <line key={`h${r}`} x1="5" x2="605" y1={25 + r * 40} y2={25 + r * 40} stroke="#afd1df" />
        ))}
        {Array.from({ length: 30 }, (_, i) => (
          <g key={i}>
            <path
              d={`M${i * 46 - 200} 25l115 200 M${i * 46 - 200} 225l115 -200`}
              fill="none"
              stroke="#afd1df"
            />
          </g>
        ))}
        {latticeFigures.map((f) => (
          <g key={f.n}>
            <polygon
              points={points(latticeOutlines[f.shape]!.map((v) => project(shift(v, f.at))))}
              fill="#ffe18a"
              fillOpacity=".8"
              stroke="#b6881a"
            />
            <text
              x={project(shift([2, 1.7], f.at))[0]}
              y={project(shift([2, 1.7], f.at))[1]}
              textAnchor="middle"
            >
              {f.n}
            </text>
          </g>
        ))}
        <g transform="translate(300 285)">
          <polygon
            points={points(
              Array.from({ length: 6 }, (_, i): XY => [
                35 * Math.cos((i * Math.PI) / 3),
                35 * Math.sin((i * Math.PI) / 3),
              ]),
            )}
            fill="#ffe18a"
            stroke={blue}
          />
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={35 * Math.cos((i * Math.PI) / 3)}
              y2={35 * Math.sin((i * Math.PI) / 3)}
              stroke={blue}
            />
          ))}
        </g>
      </>
    );
    message =
      'نقارن حدود الشكل واتجاه الفجوة فيه، لا اللون وحده. كل زوج مطابق يجب أن يحافظ على جميع الحواف واتجاهها.';
  } else if (mode === 'semicircle') {
    body = (
      <>
        <path
          d="M130 70H430A75 75 0 0 1 430 220H130A75 75 0 0 0 130 70Z"
          fill="#cee5f0"
          stroke={blue}
          strokeWidth="2"
        />
        <path d="M130 70V220M430 70V220" stroke={red} strokeDasharray="5 4" />
        {Object.entries({ A: [130, 70], B: [430, 70], C: [430, 220], D: [130, 220] }).map(
          ([n, at]) => (
            <Dot key={n} name={n} at={at as unknown as XY} />
          ),
        )}
        <text x="260" y="48">
          6 cm
        </text>
        <text x="68" y="150">
          3 cm
        </text>
      </>
    );
    message =
      'اليسار اقتطاع إلى داخل المستطيل، واليمين إضافة إلى خارجه. بنقل نصف القرص الأيمن إلى الفجوة اليسرى نستعيد المستطيل دون تغيير المساحة.';
  } else {
    const shape: XY[] = [
      [70, 120],
      [95, 35],
      [160, 65],
      [190, 165],
      [95, 190],
    ];
    const labels: Record<string, XY> = { M: [160, 65], N: [95, 35], P: [70, 120], S: [115, 92.5] };
    body = (
      <>
        <Shape vertices={shape} />
        <text x="55" y="210">
          F
        </text>
        {Object.entries(labels).map(([n, at]) => (
          <Dot key={n} name={n} at={at} />
        ))}
        <g
          transform={`translate(${progress * 2.5} ${progress * 0.45})`}
          opacity={progress === 0 ? 0 : 1}
        >
          <Shape vertices={shape} color={teal} />
          <text x="55" y="210">
            F′
          </text>
          {Object.entries(labels).map(([n, at]) => (
            <Dot key={n} name={`${n}′`} at={at} />
          ))}
        </g>
        <path
          d="M70 240L320 285M160 65L410 110M95 35L345 80M70 120L320 165M115 92.5L365 137.5"
          stroke={red}
          strokeDasharray="6 4"
        />
        <Dot name="A" at={[70, 240]} />
        <Dot name="B" at={[320, 285]} />
      </>
    );
    controls = (
      <label>
        تقدّم الحركة{' '}
        <input
          type="range"
          aria-label="تقدّم الحركة"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
        />
      </label>
    );
    message =
      'بديل تعليمي لا يعيد رسم المتزلّج: كل رأس يتحرك بالمقدار والاتجاه نفسيهما. الخطوط المتقطعة مسارات النقل؛ طول الضلع لا يتغير.';
  }
  return (
    <section className={styles.lab} dir="rtl" aria-label={spec.alt}>
      <svg
        className={styles.svg}
        viewBox={viewBox}
        role="img"
        aria-label={spec.alt}
        style={{ direction: 'ltr' }}
      >
        <title>{spec.alt}</title>
        {body}
      </svg>
      {controls && <div className={styles.controls}>{controls}</div>}
      <p className={styles.readout} aria-live="polite">
        {message}
      </p>
    </section>
  );
}
