import React from "react";

function Button(props) {
  return (
    <button {...props}>
      <div>{props.children}</div>
      <hr/>
      <i>This is button from @jithinolickal/child-app-1</i>
    </button>
  );
}

export default Button;
