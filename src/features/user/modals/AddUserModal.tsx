import { useState } from "react";
import { EMPTY_USER_FORM } from "../constant";
import { validateUserForm } from "../utility";
import type { UserFormData, UserFormErrors, User } from "../types";
import { uid } from "../../project/utils";
import Modal from "../../../components/ui/Modal";
import UserForm from "../components/UserForm";

type AddUserModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (user: User) => void;
};

export default function AddUserModal({ open, onClose, onAdd }: AddUserModalProps) {
  const [form, setForm] = useState<UserFormData>({ ...EMPTY_USER_FORM });
  const [errors, setErrors] = useState<UserFormErrors>({});

  const handleClose = () => {
    setForm({ ...EMPTY_USER_FORM });
    setErrors({});
    onClose();
  };

  const handleSubmit = () => {
    const errs = validateUserForm(form, false);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onAdd({
      ...(form as Required<UserFormData>),
      id: uid(),
      createdAt: new Date().toISOString().slice(0, 10),
    } as User);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add New User"
      subtitle="Fill in the details to create a new user account"
    >
      <UserForm form={form} setForm={setForm} errors={errors} isEdit={false} />
      <div className="px-7 pb-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
        <button
          onClick={handleClose}
          className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-xl transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl shadow-md shadow-teal-200 transition active:scale-95"
        >
          Create User
        </button>
      </div>
    </Modal>
  );
}
