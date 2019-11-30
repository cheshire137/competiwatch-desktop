import styled from "styled-components";
import MatchCell from "./MatchCell";
import { Map } from "../../models/Map";

interface Props {
  theme: string;
  map?: Map;
}

function backgroundColor(props: Props) {
  if (!props.map) {
    return "transparent";
  }

  if (props.map === "Junkertown") {
    if (props.theme === "dark") {
      return "#b57e0a";
    }
    return "#f4b531";
  }

  if (props.map === "Hanamura") {
    if (props.theme === "dark") {
      return "#86385c";
    }
    return "#f9e4f8";
  }

  if (props.map === "Temple of Anubis") {
    if (props.theme === "dark") {
      return "#a76c40";
    }
    return "#edc28e";
  }

  if (props.map === "Volskaya Industries") {
    if (props.theme === "dark") {
      return "#7063b7";
    }
    return "#b0a9d7";
  }

  if (props.map === "Dorado") {
    if (props.theme === "dark") {
      return "#a15e31";
    }
    return "#d19267";
  }

  if (props.map === "Route 66") {
    if (props.theme === "dark") {
      return "#994e49";
    }
    return "#ddbf9f";
  }

  if (props.map === "Watchpoint: Gibraltar") {
    if (props.theme === "dark") {
      return "#58423f";
    }
    return "#c0a6b5";
  }

  if (props.map === "Eichenwalde") {
    if (props.theme === "dark") {
      return "#546857";
    }
    return "#a1ad7b";
  }

  if (props.map === "Busan") {
    if (props.theme === "dark") {
      return "#d56c43";
    }
    return "#f19554";
  }

  if (props.map === "Blizzard World") {
    if (props.theme === "dark") {
      return "#0471bb";
    }
    return "#2aa6fb";
  }

  if (props.map === "Havana") {
    if (props.theme === "dark") {
      return "#44867b";
    }
    return "#77e3d1";
  }

  if (props.map === "Hollywood") {
    if (props.theme === "dark") {
      return "#c68664";
    }
    return "#92d8fd";
  }

  if (props.map === "King's Row") {
    if (props.theme === "dark") {
      return "#425a5c";
    }
    return "#a1bfc5";
  }

  if (props.map === "Numbani") {
    if (props.theme === "dark") {
      return "#566036";
    }
    return "#cad298";
  }

  if (props.map === "Paris") {
    if (props.theme === "dark") {
      return "#7c6785";
    }
    return "#f0d5c0";
  }

  if (props.map === "Ilios") {
    if (props.theme === "dark") {
      return "#788bce";
    }
    return "#a0eafd";
  }

  if (props.map === "Lijiang Tower") {
    if (props.theme === "dark") {
      return "#b55f4e";
    }
    return "#d3a096";
  }

  if (props.map === "Nepal") {
    if (props.theme === "dark") {
      return "#5a7cc6";
    }
    return "#deeafe";
  }

  if (props.map === "Oasis") {
    if (props.theme === "dark") {
      return "#b37061";
    }
    return "#fdf4a6";
  }

  if (props.map === "Horizon Lunar Colony") {
    if (props.theme === "dark") {
      return "#3d3939";
    }
    return "#c6c5c0";
  }

  if (props.map === "Rialto") {
    if (props.theme === "dark") {
      return "#789c86";
    }
    return "#87d0a4";
  }

  return "transparent";
}

export default styled(MatchCell)<Props>`
  background-color: ${props => backgroundColor(props)};
`;
