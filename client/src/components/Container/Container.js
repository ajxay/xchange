import React from "react";

function Container(props) {
  return (
    <>
      <div className="w-full bg-slate-200 text-gray-600 body-font mx-auto flex justify-center flex-wrap p-10">
        {props.children}
      </div>
    </>
  );
}

export default Container;
