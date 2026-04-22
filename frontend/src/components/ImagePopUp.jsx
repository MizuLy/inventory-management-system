import React from "react";

export default function ImagePopUp({ image }) {
  return (
    <>
      <dialog id="image_modal" className="modal">
        <div className="modal-box flex justify-center items-center">
          <img src={image} alt="" />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      ;
    </>
  );
}
