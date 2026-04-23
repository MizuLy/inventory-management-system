import React from "react";

export default function ConfirmDelete({ id, onConfirm }) {
  return (
    <>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete?
          </h3>
          <p className="pb-4">
            By clicking on confirm, the data will be deleted permanently.
          </p>

          <button
            onClick={() => onConfirm(id)}
            className="px-4 py-2 rounded-lg text-white bg-nord-frost hover:bg-nord-frost"
          >
            Confirm
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    </>
  );
}
