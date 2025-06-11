import { hydrate, prerender as ssr } from "preact-iso";

import "./styles/main.scss";

export function App() {
	return (
		<div>
			<div class="color-prim">a</div>
			<div class="color-second">b</div>
			<div class="color-black">c</div>
		</div>
	);
}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}

if (typeof window !== "undefined") {
	hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
