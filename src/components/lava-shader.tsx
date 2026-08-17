"use client";

import { useEffect, useRef } from "react";

// Very soft flowing "lava/flame" fragment shader — brand red over dark.
// No three.js: a single fullscreen triangle + a domain-warped fbm.
// Cheap (renders at half resolution), pauses off-screen, and is fully
// skipped under reduced motion or when WebGL is unavailable (the CTA
// gradient stays as the base/fallback).
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  float a = hash(i), b = hash(i+vec2(1.0,0.0));
  float c = hash(i+vec2(0.0,1.0)), d = hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, amp = 0.5;
  mat2 m = mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<5;i++){ v += amp*noise(p); p = m*p; amp *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * vec2(u_res.x/u_res.y, 1.0) * 3.0;
  float t = u_time * 0.05;
  // rising, freely circulating flow via domain warping
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2,1.3) - t));
  vec2 r = vec2(fbm(p + 2.0*q + vec2(1.7,9.2) + 0.5*t),
                fbm(p + 2.0*q + vec2(8.3,2.8) - 0.4*t));
  float f = fbm(p + 2.0*r);
  f = smoothstep(0.25, 1.0, f) * 0.9;
  vec3 col = vec3(0.902, 0.090, 0.090) * f; // brand red
  gl_FragColor = vec4(col, 1.0);
}`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export function LavaShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return; // no WebGL → gradient stays

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // Fullscreen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    // Half-resolution backing store — the effect is soft, so it's plenty.
    const SCALE = 0.5;
    let width = 0;
    let height = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(r.width * SCALE));
      height = Math.max(1, Math.floor(r.height * SCALE));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = (timeMs: number) => {
      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, timeMs * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let running = false;
    const loop = (t: number) => {
      render(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Pause when the CTA is off-screen.
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    // Reduced motion → render a single static frame.
    if (reduce) render(0);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
