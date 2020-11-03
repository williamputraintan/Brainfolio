import * as React from "react";

function Logo(props) {
  return (
    <svg viewBox="0 0 17 15" fill="none" {...props}>
      <g fill={props.color || "#0013FE"}>
        <path d="M0 9.597V0s6 0 6 4.932-6 4.665-6 4.665zM17 .003V9.6s-6 0-6-4.932 6-4.665 6-4.665zM0 15v-4h17v4z" />
        <circle cx={8.5} cy={5.5} r={1.5} />
      </g>
    </svg>
  );
}

const MemoLogo = React.memo(Logo);
export default MemoLogo;
