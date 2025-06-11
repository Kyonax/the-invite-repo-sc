import { hydrate, prerender as ssr } from "preact-iso";
import { Handwritten } from "./component/Handwritten";

import data from "./data/families-invited.json"; // adjust path as needed
const FALLBACK_TEXT = "Familia Moreno Cruz";
const FALLBACK_RESERVED = 1;

import "./styles/main.scss";

export function App({ data }) {
	return (
		<div id="root">
			<section class="loader">
				<div class="loader__container">
					<p>
						<span>Aparta la Fecha</span>
						<br />
						27. 02 .2026
					</p>
					<Handwritten
						text={data?.text || FALLBACK_TEXT}
						fontSize={100}
						letterDelay={0.22}
					/>
					<p>{data?.reserved || FALLBACK_RESERVED} lugar(es) en Reserva</p>
				</div>
			</section>
			<section class="main">
				<div class="main__seal">
					{/* <span>ABRE LA INVITACIÓN</span> &nbsp;
					<span>ABRE LA INVITACIÓN</span> */}
				</div>
			</section>
		</div>
	);
}

// Client-side hydration
if (typeof window !== "undefined") {
	const query = new URLSearchParams(window.location.search);
	const family = query.get("family");
	const result = data[family];

	hydrate(<App data={result} />, document.getElementById("app"));
}

// Server-side prerender
export async function prerender({ url }) {
	const query = new URLSearchParams(url.split("?")[1] || "");
	const family = query.get("family");
	const result = data[family];

	return await ssr(<App data={result} />);
}
