export const coverFour = (name: string, category: string, logo: string) =>
  `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g clip-path="url(#clip0_30_305)">
<rect width="1920" height="1080" fill="white"/>
<g style="mix-blend-mode:multiply" filter="url(#filter0_f_30_305)">
<circle cx="1749" cy="22" r="295" fill="#C18FFF"/>
</g>
<g style="mix-blend-mode:multiply" filter="url(#filter1_f_30_305)">
<circle cx="173" cy="993" r="295" fill="#7000FF" fill-opacity="0.14"/>
</g>
<text fill="black" xml:space="preserve" style="white-space: pre" font-family="Bebas Neue" font-size="72" letter-spacing="0.1em"><tspan x="140" y="835.2">${category}</tspan></text>
<text fill="#2E283B" xml:space="preserve" style="white-space: pre" font-family="Bebas Neue" font-size="200" letter-spacing="0em"><tspan x="140" y="678">${name}</tspan></text>
<mask id="mask0_30_305" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="140" y="197" width="250" height="250">
<path d="M390 322C390 391.036 334.036 447 265 447C195.964 447 140 391.036 140 322C140 252.964 195.964 197 265 197C334.036 197 390 252.964 390 322Z" fill="#C4C4C4"/>
</mask>
<g mask="url(#mask0_30_305)">
<path d="M127.146 184.147H402.853V459.854H127.146V184.147Z" fill="url(#pattern0)"/>
</g>
</g>
<defs>
<filter id="filter0_f_30_305" x="854" y="-873" width="1790" height="1790" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="300" result="effect1_foregroundBlur_30_305"/>
</filter>
<filter id="filter1_f_30_305" x="-722" y="98" width="1790" height="1790" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="300" result="effect1_foregroundBlur_30_305"/>
</filter>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_30_305" transform="scale(0.00568182)"/>
</pattern>
<clipPath id="clip0_30_305">
<rect width="1920" height="1080" fill="white"/>
</clipPath>
<image id="image0_30_305" width="176" height="176" xlink:href="${logo}"/>
</defs>
</svg>
`