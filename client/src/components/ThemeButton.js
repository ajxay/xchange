import React from "react";

function ThemeButton(props) {
  return (
    <button className="bg-black w-100 mb-3 md:mb-0 text-sm text-white px-10 tracking-widest w-3/4 ss:w-auto py-1.5 mr-10 ">
      {props.children}
    </button>
  );
}

export default ThemeButton;
