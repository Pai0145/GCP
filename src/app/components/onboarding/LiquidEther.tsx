import { useEffect, useRef } from "react";
import * as THREE from "three";

import "./LiquidEther.css";

type LiquidEtherProps = {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  resolution?: number;
  dt?: number;
  BFECC?: boolean;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
  className?: string;
  style?: React.CSSProperties;
};

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform vec2 uAutoPointer;
uniform float uPointerStrength;
uniform float uAutoStrength;
uniform float uCursorSize;
uniform vec3 uColors[5];
uniform int uColorCount;
varying vec2 vUv;

vec3 palette(float t) {
  t = clamp(t, 0.0, 1.0);
  float scaled = t * float(max(uColorCount - 1, 1));
  int index = int(floor(scaled));
  float local = fract(scaled);
  vec3 a = uColors[0];
  vec3 b = uColors[1];

  if (index == 0) {
    a = uColors[0];
    b = uColors[1];
  } else if (index == 1) {
    a = uColors[1];
    b = uColors[2];
  } else if (index == 2) {
    a = uColors[2];
    b = uColors[3];
  } else {
    a = uColors[3];
    b = uColors[4];
  }

  return mix(a, b, smoothstep(0.0, 1.0, local));
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + 17.2;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 p = (uv - 0.5) * aspect;
  vec2 pointer = (uPointer - 0.5) * aspect;
  vec2 autoPointer = (uAutoPointer - 0.5) * aspect;

  float pointerGlow = exp(-dot(p - pointer, p - pointer) * uCursorSize) * uPointerStrength;
  float autoGlow = exp(-dot(p - autoPointer, p - autoPointer) * uCursorSize * 0.55) * uAutoStrength;

  float t = uTime * 0.3;
  vec2 flow = vec2(
    fbm(p * 2.4 + vec2(t, -t * 0.6)),
    fbm(p * 2.2 + vec2(-t * 0.75, t))
  );
  vec2 warped = p + (flow - 0.5) * 0.44 + (p - pointer) * pointerGlow * -0.24 + (p - autoPointer) * autoGlow * -0.2;

  float bands = fbm(warped * 3.2 + vec2(t * 1.2, -t));
  bands += 0.46 * sin((warped.x * 3.0 + warped.y * 1.7 + t * 2.2) * 3.14159);
  bands = smoothstep(0.02, 1.12, bands + pointerGlow + autoGlow * 0.78);

  vec3 color = palette(bands);
  float verticalFade = 0.38 + 0.62 * smoothstep(1.08, 0.08, uv.y);
  float alpha = (0.1 + bands * 0.34 + pointerGlow * 0.12 + autoGlow * 0.1) * verticalFade;

  vec3 finalColor = mix(vec3(1.0), color, alpha);
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function toColorArray(colors: string[]) {
  const normalized =
    colors.length > 0 ? colors.slice(0, 5) : ["#D0F255", "#007A7A"];
  while (normalized.length < 5) {
    normalized.push(normalized[normalized.length - 1]);
  }

  return normalized.map((hex) => new THREE.Color(hex));
}

export default function LiquidEther({
  colors = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
  mouseForce = 20,
  cursorSize = 100,
  resolution = 0.5,
  style = {},
  className = "",
  autoDemo = true,
  autoSpeed = 0.62,
  autoIntensity = 2,
  autoResumeDelay = 1200,
}: LiquidEtherProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef({
    colors,
    mouseForce,
    cursorSize,
    resolution,
    autoDemo,
    autoSpeed,
    autoIntensity,
    autoResumeDelay,
  });
  propsRef.current = {
    colors,
    mouseForce,
    cursorSize,
    resolution,
    autoDemo,
    autoSpeed,
    autoIntensity,
    autoResumeDelay,
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setClearColor(0xffffff, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const pointer = new THREE.Vector2(0.5, 0.5);
    const autoPointer = new THREE.Vector2(0.45, 0.28);
    const lastInteraction = { value: 0 };

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: pointer },
      uAutoPointer: { value: autoPointer },
      uPointerStrength: { value: 0 },
      uAutoStrength: { value: autoIntensity },
      uCursorSize: { value: Math.max(8, 14000 / cursorSize) },
      uColors: { value: toColorArray(colors) },
      uColorCount: { value: Math.min(Math.max(colors.length, 2), 5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: false,
      depthWrite: false,
      uniforms,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width * resolution, height * resolution);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointer.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height,
      );
      uniforms.uPointerStrength.value = Math.min(1, mouseForce / 32);
      lastInteraction.value = performance.now();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    resize();

    let frame = 0;
    const start = performance.now();
    const render = () => {
      frame = requestAnimationFrame(render);
      const now = performance.now();
      const elapsed = (now - start) / 1000;
      const current = propsRef.current;
      const idle = now - lastInteraction.value;
      const autoActive = current.autoDemo && idle > current.autoResumeDelay;

      uniforms.uTime.value = elapsed;
      autoPointer.set(
        0.5 + Math.cos(elapsed * current.autoSpeed * 0.72) * 0.32,
        0.52 + Math.sin(elapsed * current.autoSpeed) * 0.24,
      );
      uniforms.uAutoStrength.value = autoActive ? current.autoIntensity : 0.2;
      uniforms.uPointerStrength.value *= 0.94;
      uniforms.uCursorSize.value = Math.max(8, 14000 / current.cursorSize);
      uniforms.uColors.value = toColorArray(current.colors);
      uniforms.uColorCount.value = Math.min(
        Math.max(current.colors.length, 2),
        5,
      );
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`liquid-ether-container ${className || ""}`}
      style={style}
    />
  );
}
