/**
 * Master list of technologies shown in the tech carousel and the
 * scroll-driven 3D vortex. Each entry uses one of three rendering
 * strategies (consumed by <TechIcon>):
 *   - `slug` + `color`  → loaded from cdn.simpleicons.org tinted in that color
 *   - `iconUrl`         → arbitrary URL (used for Iconify-hosted brand logos
 *                         that come pre-coloured, e.g. Microsoft / Twilio /
 *                         Gemini)
 *   - `path` + `color`  → inline SVG path (used when the CDN versions are
 *                         unreliable, e.g. OpenAI, Anthropic)
 */
export const tecnologias = [
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "Express", slug: "express", color: "FFFFFF" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "HTML5", slug: "html5", color: "E34F26" },
  { name: "CSS", slug: "css", color: "1572B6" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Bootstrap", slug: "bootstrap", color: "7952B3" },
  { name: "Git", slug: "git", color: "F05032" },
  { name: "Postman", slug: "postman", color: "FF6C37" },
  { name: "n8n", slug: "n8n", color: "EA4B71" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  {
    name: "Azure",
    iconUrl: "https://api.iconify.design/logos:microsoft-azure.svg",
  },
  {
    name: "PowerBI",
    iconUrl: "https://api.iconify.design/logos:microsoft-power-bi.svg",
  },
  {
    name: "Microsoft Teams",
    iconUrl: "https://api.iconify.design/logos:microsoft-teams.svg",
  },
  { name: "GitHub Actions", slug: "githubactions", color: "2088FF" },
  { name: "WordPress", slug: "wordpress", color: "21759B" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "Revolut", slug: "revolut", color: "FFFFFF" },
  { name: "Brevo", slug: "brevo", color: "0B996E" },
  {
    name: "Twilio",
    iconUrl: "https://api.iconify.design/logos:twilio-icon.svg",
  },
  { name: "Deepgram", slug: "deepgram", color: "13EF93" },
  {
    name: "Gemini",
    iconUrl: "https://api.iconify.design/logos:google-gemini.svg",
  },
  {
    name: "OpenAI",
    color: "FFFFFF",
    path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zM3.6087 18.3036a4.4708 4.4708 0 0 1-.5346-3.0137l.1419.0852 4.7783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1313-1.6466zM2.3408 7.8956a4.485 4.485 0 0 1 2.3654-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654 2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5093-2.6067-1.4998Z",
  },
  {
    name: "Anthropic",
    color: "D97757",
    path: "M13.827 3.52h3.603L24 20.481h-3.603l-6.57-16.96zm-7.258 0h3.767l6.57 16.96H13.34l-1.343-3.461H5.165l-1.344 3.46H0L6.569 3.52zm4.261 10.014L8.448 7.605l-2.382 5.93h4.764z",
  },
];
