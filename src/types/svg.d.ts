declare module "*.svg?component" {
  import { FunctionComponent } from "preact";
  const content: FunctionComponent<preact.JSX.SVGAttributes<SVGSVGElement>>;
  export default content;
}
