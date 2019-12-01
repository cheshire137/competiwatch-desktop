import styled from "styled-components";

export const winColors = [
  [178, 212, 132],
  [102, 189, 125]
];
export const lossColors = [
  [250, 170, 124],
  [246, 106, 110]
];
export const neutralColor = [254, 234, 138];

export interface Props {
  theme: string;
  isPlacement?: boolean;
}

function backgroundColor(props: Props) {
  if (props.isPlacement) {
    if (props.theme === "dark") {
      return "#3a434b";
    }
    return "#efefef";
  }
  return "transparent";
}

export default styled("td")`
  background-color: ${props => backgroundColor(props)};
  border: 1px solid #000;
  padding: 0.3em 0.6em;
  text-align: center;
`;
