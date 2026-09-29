import type { InteractiveDiagram } from '@/content/schema';
import styles from './UnitExerciseFigure.module.css';

const arrow = '1,0 4,2.5 1,5 2,2.5';
function Chevron({
  x,
  y,
  scale = 1,
  flip = false,
}: {
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
}) {
  const pts = flip ? '4,0 1,2.5 4,5 3,2.5' : arrow;
  return (
    <polygon
      points={pts}
      transform={`translate(${x} ${y}) scale(${scale})`}
      className={styles.shape}
    />
  );
}

export function UnitExerciseFigure({ spec }: { spec: InteractiveDiagram }) {
  const scenario = String(spec.params.scenario ?? '');
  return (
    <div className={styles.wrap} dir="ltr">
      <svg viewBox="0 0 120 48" role="img" aria-label={spec.alt.replace(/\$([^$]+)\$/g, '$1')}>
        {scenario === 'translation-candidates' ? (
          <>
            <g transform="translate(3 8)">
              <Chevron x={3} y={8} />
              <Chevron x={25} y={8} flip />
              <text x="17" y="38">
                ①
              </text>
            </g>
            <g transform="translate(42 8)">
              <Chevron x={2} y={3} />
              <Chevron x={22} y={18} />
              <text x="16" y="38">
                ②
              </text>
            </g>
            <g transform="translate(82 8)">
              <Chevron x={1} y={14} />
              <Chevron x={20} y={5} scale={1.6} />
              <text x="16" y="38">
                ③
              </text>
            </g>
          </>
        ) : null}
        {scenario === 'segment-candidates' ? (
          <>
            {[0, 1, 2].map((n) => (
              <g key={n} transform={`translate(${3 + n * 40} 4)`}>
                <rect x="0" y="0" width="35" height="32" className={styles.paper} />
                {[7, 14, 21, 28].map((v) => (
                  <g key={v}>
                    <line x1={v} y1="0" x2={v} y2="32" className={styles.grid} />
                  </g>
                ))}
                {[8, 16, 24].map((v) => (
                  <line key={v} x1="0" y1={v} x2="35" y2={v} className={styles.grid} />
                ))}
                <circle cx={n === 2 ? 28 : 14} cy="24" r="1" />
                <text x={n === 2 ? 27 : 12} y="30">
                  A
                </text>
                <circle cx="7" cy="8" r="1" />
                <text x="5" y="6">
                  A′
                </text>
                <line
                  x1={n === 2 ? 14 : 14}
                  y1="24"
                  x2={n === 0 ? 35 : 28}
                  y2="24"
                  className={styles.blue}
                />
                <line
                  x1="7"
                  y1="8"
                  x2={n === 0 ? 21 : n === 1 ? 21 : 21}
                  y2="8"
                  className={styles.red}
                />
                <text x="16" y="40">
                  {['①', '②', '③'][n]}
                </text>
              </g>
            ))}
          </>
        ) : null}
        {scenario === 'congruent-triangles' ? (
          <>
            <polygon points="18,38 34,7 51,38" className={styles.shape} />
            <text x="12" y="43">
              E
            </text>
            <text x="31" y="6">
              D
            </text>
            <text x="52" y="43">
              F
            </text>
            <polygon points="69,8 105,8 88,40" className={styles.shape} />
            <text x="64" y="8">
              B
            </text>
            <text x="106" y="8">
              A
            </text>
            <text x="86" y="46">
              C
            </text>
            <line x1="23" y1="27" x2="27" y2="29" className={styles.tick} />
            <line x1="79" y1="7" x2="80" y2="11" className={styles.tick} />
            <line x1="40" y1="39" x2="40" y2="35" className={styles.tick} />
            <line x1="44" y1="39" x2="44" y2="35" className={styles.tick} />
            <line x1="75" y1="20" x2="79" y2="18" className={styles.tick} />
            <line x1="77" y1="24" x2="81" y2="22" className={styles.tick} />
          </>
        ) : null}
        {scenario === 'parallelogram-translation' ? (
          <>
            <polygon points="10,8 36,8 50,38 24,38" className={styles.blueShape} />
            <text x="27" y="25">
              F
            </text>
            <circle cx="50" cy="38" r="1.2" />
            <text x="51" y="44">
              A
            </text>
            <polygon points="70,8 96,8 82,38 56,38" className={styles.redShape} />
            <text x="76" y="25">
              F′
            </text>
            <circle cx="56" cy="38" r="1.2" />
            <text x="50" y="44">
              A′
            </text>
          </>
        ) : null}
        {scenario === 'parallel-lines' ? (
          <>
            <line x1="10" y1="17" x2="105" y2="3" className={styles.redLine} />
            <line x1="16" y1="40" x2="111" y2="26" className={styles.redLine} />
            <circle cx="32" cy="14" r="1.3" />
            <text x="27" y="11">
              B
            </text>
            <circle cx="77" cy="31" r="1.3" />
            <text x="79" y="36">
              A
            </text>
            <text x="7" y="15">
              (d)
            </text>
            <text x="8" y="44">
              (d′)
            </text>
            <line x1="73" y1="28" x2="43" y2="17" className={styles.motion} />
            <polygon points="42,17 48,17 45,21" className={styles.motionFill} />
          </>
        ) : null}
      </svg>
    </div>
  );
}
