import { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import { validateUserForm } from "../utility";
import type { User, UserFormData, UserFormErrors } from "../types";
import type { EditUserModalProps } from "../types";
import Modal from "../../../components/ui/Modal";



function userToForm(u: User): UserFormData {
  return {
    fullName:   u.fullName,
    email:      u.email,
    password:   "",            // never pre-fill password
    role:       u.role,
    status:     u.status,
    jobTitle:   u.jobTitle,
    department: u.department,
    location:   u.location,
    experience: u.experience,
  };
}

export default function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const [form, setForm] = useState<UserFormData>(
    user ? userToForm(user) : {} as UserFormData
  );
  const [errors, setErrors] = useState<UserFormErrors>({});

  // Sync when user prop changes
  useEffect(() => {
    if (user) {
      setForm(userToForm(user));
      setErrors({});
    }
  }, [user]);

  const handleSubmit = () => {
    const errs = validateUserForm(form, true);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave({
      ...user!,
      ...form,
      // Keep existing password if field was left blank
      password: form.password || user!.password,
    } as User);
    onClose();
  };

  return (
    <Modal
      open={!!user}
      onClose={onClose}
      title="Edit User"
      subtitle={user ? `Updating profile for ${user.fullName}` : ""}
    >
      {user && (
        <>
          <UserForm form={form} setForm={setForm} errors={errors} isEdit />
          <div className="px-7 pb-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl shadow-md shadow-teal-200 transition active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
