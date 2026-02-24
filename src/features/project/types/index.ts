export type Status = "Not Started" | "In Progress" | "Completed" | "On Hold";
export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: Status;
  priority: Priority;
  owner: string;
  teamMembers: string[];
  createdAt: string;
}


export type FormData = {
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: Status;
  priority: Priority;
  owner: string;
  teamMembers: string[];
};

export type FormErrors = Partial<Record<keyof FormData, string>>;

export type ProjectCardProps = {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}

export type DeleteProjectModalProps = {
  project: Project | null;
  onClose: () => void;
  onConfirm: () => void;
}

export type ProjectFormProps ={
  form: FormData;
  setForm: (form: FormData) => void;
  errors: FormErrors;
}
export type EditProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSave: (project: Project) => Promise<void> | void; 
}

export type AddProjectModalProps = {
  open: boolean;
  onClose: () => void;
   onAdd: (projectData: FormData) => Promise<void>;
}