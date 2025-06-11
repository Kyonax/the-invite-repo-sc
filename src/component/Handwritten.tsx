import { h } from "preact";
import { useState, useEffect, useLayoutEffect, useRef } from "preact/hooks";
import opentype from "opentype.js";
import fontUrl from "../assets/fonts/Astutely.ttf?url";
import "./handwrite.scss";

interface HandwrittenProps {
  text: string;
  fontSize?: number;
  letterDelay?: number; // seconds
}

export function Handwritten({
  text,
  fontSize = 72,
  letterDelay = 0.5,
}: HandwrittenProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const [viewBoxWidth, setViewBoxWidth] = useState<number>(0);
  const [viewBoxHeight, setViewBoxHeight] = useState<number>(0);
  const pathRefs = useRef<SVGPathElement[]>([]);

  // 1) Fetch font and create individual glyph paths
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(fontUrl);
        const buffer = await res.arrayBuffer();
        const font = opentype.parse(buffer);
        if (cancelled) return;

        // Generate Path objects positioned correctly
        const glyphPaths = font.getPaths(text, 0, fontSize, fontSize);
        // Extract d attributes
        const dStrings = glyphPaths.map((p) => p.toPathData());

        // Calculate total advance width and bounding box height
        const totalWidth = font.getAdvanceWidth(text, fontSize);
        const bboxHeight = glyphPaths.reduce((h, p) => {
          const bb = p.getBoundingBox();
          return Math.max(h, bb.y2 - bb.y1);
        }, 0);

        if (!cancelled) {
          setPaths(dStrings);
          setViewBoxWidth(totalWidth);
          setViewBoxHeight(bboxHeight || fontSize * 1.2);
        }
      } catch (e) {
        console.error("Error loading font:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [text, fontSize]);

  // 2) Setup stroke dash on each path
  useLayoutEffect(() => {
    pathRefs.current.forEach((el) => {
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
    });
  }, [paths]);

  return (
    <svg
      class="handwrite-svg"
      viewBox={`0 0 ${viewBoxWidth * 1.02} ${viewBoxHeight * 1.32}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`translate(0, ${-viewBoxHeight * 0.32})`}>
        {paths.map((d, i) => (
          <path
            key={i}
            ref={(el) => {
              if (el) pathRefs.current[i] = el;
            }}
            d={d}
            class="handwrite-letter"
            style={{
              animationDelay: `${i * letterDelay}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}
