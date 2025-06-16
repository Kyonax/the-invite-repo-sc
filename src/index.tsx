import { hydrate, prerender as ssr } from "preact-iso";
import { Handwritten } from "./component/Handwritten";

import data from "./data/families-invited.json"; // adjust path as needed
import seal_sc from "./assets/the-invite-seal-sc.png";

const FALLBACK_TEXT = "Familia Moreno Cruz";
const FALLBACK_RESERVED = 1;

import "./styles/main.scss";

export function App({ data }) {
	return (
		<div id="root">
			<section class="loader">
				<div class="loader__container">
					<Handwritten
						text={data?.text || FALLBACK_TEXT}
						fontSize={100}
						letterDelay={0.22}
					/>
					<p>
						Hemos reservado {data?.reserved || FALLBACK_RESERVED} lugar(es) en
						su honor
					</p>
				</div>
			</section>
			<section class="main">
				<div class="main__seal">
					<span>Click Aqui!</span>
					<img src={seal_sc} alt="The Invite Seal - S&C" />
				</div>

				<h1>This is the first section,</h1>
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
