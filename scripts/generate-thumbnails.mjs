/**
 * generate-thumbnails.mjs
 *
 * Uses the Google Gemini API (same engine that powers Nano Banana AI)
 * to generate professional project thumbnail images for the portfolio.
 *
 * Usage:
 *   GEMINI_API_KEY=your_key node scripts/generate-thumbnails.mjs
 *
 * Get a FREE API key at: https://aistudio.google.com/apikey
 *
 * Each image costs 0 credits on the free tier (unlike Nano Banana).
 * Free tier: 15 requests/minute, unlimited daily on flash models.
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname }                         from "path";
import { fileURLToPath }                         from "url";
import https                                      from "https";

const __dirname  = dirname(fileURLToPath(import.meta.url));
const ROOT       = join(__dirname, "..");
const THUMBS_DIR = join(ROOT, "public", "thumbs");

/* ── Gemini model for image generation ─────────────────────────── */
const MODEL = "gemini-2.0-flash-preview-image-generation";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("\n❌ GEMINI_API_KEY is required.");
  console.error("   Get a free key at: https://aistudio.google.com/apikey");
  console.error("   Then run: GEMINI_API_KEY=your_key npm run generate-thumbs\n");
  process.exit(1);
}

/* ── Projects + prompts ──────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "ecommerce-automation",
    prompt: `Ultra-premium dark tech illustration for a software portfolio. Dark navy background (#030B18).
    Visual concept: automated e-commerce order fulfillment system flow diagram.
    Show left-to-right data pipeline: WooCommerce shopping cart icon (blue) → glowing n8n automation node (circuit gear, royal blue #2563EB) → email envelope (confirmed checkmark, emerald) → Slack notification bubble → Google Sheets grid dashboard.
    Nodes connected by flowing electric-blue data streams with particle effects.
    Ambient glow: blue-600 light casting on dark surface.
    Style: cinematic dark mode, premium SaaS product art, blueprint/circuit aesthetic.
    No text or labels. Ultra-detailed. Professional. 16:9 landscape orientation.`,
  },
  {
    id: "restaurant-website",
    prompt: `Ultra-premium dark tech illustration for a software portfolio. Dark navy background (#030B18).
    Visual concept: multi-location restaurant online reservation system shown as a sleek mobile UI mockup.
    Show a dark-mode phone screen with: date picker calendar with a date selected (highlighted violet),
    three time-slot chips (18:00, 19:00 selected in violet glow, 20:00), guest count "+2" selector,
    "Confirm Booking" pill button in violet gradient (#8B5CF6 to #6D28D9),
    a green success card at bottom "✓ Booked".
    Floating metric badge "+40% reservations". Soft violet ambient glow behind phone.
    Style: premium app design, dark mode, glass morphism, cinematic lighting. No real text. 16:9 landscape.`,
  },
  {
    id: "lead-crm-automation",
    prompt: `Ultra-premium dark tech illustration for a software portfolio. Dark navy background (#030B18).
    Visual concept: AI-powered lead scoring and CRM pipeline visualization.
    Show: three input channel icons (web globe, LinkedIn badge, ad icon) with glowing lines feeding into
    a large sales funnel (top wide=200+ leads, narrowing down).
    Inside funnel: small colored dots (red=cold, amber=warm, green=hot).
    Below funnel: an AI brain/neural-network node (indigo #6366F1, glowing) scoring leads.
    Output: scored leads flowing into CRM card stack with HubSpot-style icons.
    Indigo and emerald data stream particles.
    Style: data visualization, dark mode, professional fintech aesthetic. No text. 16:9 landscape.`,
  },
  {
    id: "dental-clinic-automation",
    prompt: `Ultra-premium dark tech illustration for a software portfolio. Dark navy background (#030B18).
    Visual concept: dental clinic AI email triage and appointment automation.
    Show left-to-right flow with 3 main nodes:
    1. Email inbox icon with urgency indicator (red dot = emergency, amber = medium, green = routine)
    2. AI analysis brain node (teal #14B8A6, neural network pattern, GPT-4 style) with classification labels visible as colored chips
    3. Calendar grid with 09:00 appointment slot auto-highlighting in teal.
    Below: three email template preview cards (receipt, confirmation, clinic notification) side by side.
    Soft teal-rose ambient gradient glow in background.
    Style: medical-tech, dark mode, circuit patterns, premium. No text. 16:9 landscape.`,
  },
  {
    id: "youtube-shorts-ai",
    prompt: `Ultra-premium dark tech illustration for a software portfolio. Dark navy background (#030B18).
    Visual concept: fully automated YouTube Shorts AI production pipeline.
    Horizontal pipeline of 5 glowing circular nodes connected by animated streams:
    1. Search/magnifier node (amber #F59E0B) — research
    2. AI script node (violet #8B5CF6) — Claude-style neural pattern
    3. Audio waveform node (blue #3B82F6) — ElevenLabs voice
    4. Video frame/film-strip node (pink #EC4899) — Creatomate render
    5. YouTube play-button node (red #EF4444) — upload
    Above pipeline: floating Gmail approval preview card with two buttons (green Approve / red Reject).
    Vertical schedule timer at top showing "Monday 9:00 AM".
    Style: creator-tech aesthetic, multicolor nodes, dark cinematic. No text. 16:9 landscape.`,
  },
  {
    id: "blockchain-newsletter",
    prompt: `Ultra-premium dark tech illustration for a software portfolio. Dark navy background (#030B18).
    Visual concept: 5 parallel AI research streams feeding into a blockchain intelligence newsletter system.
    Show 5 horizontal parallel lanes stacked vertically, each with distinct color:
    Lane 1 (royal blue #3B82F6): Tavily search → Claude Opus 4 agent
    Lane 2 (emerald #10B981): Tavily search → Claude Opus 4 agent
    Lane 3 (amber #F59E0B): Tavily search → Claude Opus 4 agent
    Lane 4 (violet #8B5CF6): Tavily search → Claude Opus 4 agent
    Lane 5 (rose #EF4444): Tavily search → Claude Opus 4 agent
    All 5 lanes converge into a central Merge node (bright white/silver hexagon).
    Right of merge: Claude Haiku node composing HTML email → Gmail send icon with "7AM UTC" timer.
    Blockchain hexagonal chain-link pattern in background at low opacity.
    Style: financial-tech, parallel architecture visualization, dark cinematic. No text. 16:9 landscape.`,
  },
];

/* ── Gemini API call ─────────────────────────────────────────────── */
function callGeminiImage(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
    });

    const options = {
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const raw = Buffer.concat(chunks).toString("utf8");
        try {
          const json = JSON.parse(raw);
          if (json.error) {
            return reject(new Error(`Gemini error: ${json.error.message}`));
          }
          // Find inline image data
          const parts = json.candidates?.[0]?.content?.parts ?? [];
          const imgPart = parts.find((p) => p.inlineData?.mimeType?.startsWith("image/"));
          if (!imgPart) {
            return reject(
              new Error(`No image in response. Parts: ${JSON.stringify(parts).slice(0, 300)}`)
            );
          }
          resolve({
            data:     imgPart.inlineData.data,
            mimeType: imgPart.inlineData.mimeType, // e.g. "image/png"
          });
        } catch (e) {
          reject(new Error(`JSON parse error: ${e.message}\nRaw: ${raw.slice(0, 400)}`));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

/* ── Extension from mimeType ────────────────────────────────────── */
function ext(mimeType) {
  if (mimeType.includes("png"))  return "png";
  if (mimeType.includes("webp")) return "webp";
  return "jpg";
}

/* ── Sleep helper ───────────────────────────────────────────────── */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── Main ───────────────────────────────────────────────────────── */
async function main() {
  console.log("\n🍌 Nano Banana AI — Gemini Image Generator\n");
  console.log(`Model : ${MODEL}`);
  console.log(`Output: public/thumbs/\n`);

  if (!existsSync(THUMBS_DIR)) {
    mkdirSync(THUMBS_DIR, { recursive: true });
    console.log("Created public/thumbs/\n");
  }

  let success = 0;
  let skipped = 0;
  let failed  = 0;

  for (let i = 0; i < PROJECTS.length; i++) {
    const p = PROJECTS[i];
    console.log(`[${i + 1}/${PROJECTS.length}] ${p.id}`);

    // Skip if already generated (any format)
    const already = ["png", "jpg", "webp"].find((e) =>
      existsSync(join(THUMBS_DIR, `${p.id}.${e}`))
    );
    if (already) {
      console.log(`       ⏭  Already exists (${p.id}.${already})\n`);
      skipped++;
      continue;
    }

    try {
      process.stdout.write(`       ⏳ Generating...`);
      const { data, mimeType } = await callGeminiImage(p.prompt);
      const extension = ext(mimeType);
      const outputPath = join(THUMBS_DIR, `${p.id}.${extension}`);
      writeFileSync(outputPath, Buffer.from(data, "base64"));
      console.log(` ✅ Saved as ${p.id}.${extension}`);
      success++;
    } catch (err) {
      console.log(` ❌ Failed: ${err.message}`);
      failed++;
    }

    // Rate limit — Gemini free tier: 15 req/min → wait 4s between requests
    if (i < PROJECTS.length - 1) {
      process.stdout.write(`       ⏸  Waiting 4s (rate limit)...\n`);
      await sleep(4000);
    }

    console.log();
  }

  console.log("─".repeat(50));
  console.log(`✅ Success : ${success}`);
  console.log(`⏭  Skipped : ${skipped}`);
  console.log(`❌ Failed  : ${failed}`);
  console.log(
    "\n📁 Images saved to public/thumbs/ — restart the dev server to see them.\n"
  );
}

main().catch((e) => {
  console.error("\n💥 Fatal error:", e.message);
  process.exit(1);
});
