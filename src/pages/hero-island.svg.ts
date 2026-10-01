import type { APIRoute } from "astro";
import { gardenIslandSvg } from "../lib/garden-island";

// Bygger /hero-island.svg (cachas av webbläsaren och delas mellan alla sidor).
export const GET: APIRoute = () =>
  new Response(gardenIslandSvg(), { headers: { "content-type": "image/svg+xml; charset=utf-8" } });
