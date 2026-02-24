import { useMemo, useState } from "react";
import EmptyState from "../../../components/common/EmptyState";
import StatsBar from "../../project/components/StatsBar";
import UserCard from "../components/UserCard";
import UserFilters from "../components/UserFilters";
import AddUserModal from "../modals/AddUserModal";
import DeleteUserModal from "../modals/DeleteUserModal";
import EditUserModal from "../modals/EditUserModal";
import UserDetailModal from "../modals/UserDetailModal";
import type { User } from "../types";
import { SEED_USERS } from "../constant";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>(SEED_USERS);

  // Filters
  const [search, setSearch]           = useState("");
  const [filterRole, setFilterRole]   = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDept, setFilterDept]   = useState("");

  // Modal state
  const [addOpen, setAddOpen]         = useState(false);
  const [viewUser, setViewUser]       = useState<User | null>(null);
  const [editUser, setEditUser]       = useState<User | null>(null);
  const [deleteUser, setDeleteUser]   = useState<User | null>(null);

  // Derived filtered list
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      const matchSearch =
        !q ||
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.jobTitle.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q);
      return (
        matchSearch &&
        (!filterRole   || u.role   === filterRole) &&
        (!filterStatus || u.status === filterStatus) &&
        (!filterDept   || u.department === filterDept)
      );
    });
  }, [users, search, filterRole, filterStatus, filterDept]);

  // CRUD handlers
  const handleAdd    = (user: User) => setUsers((prev) => [user, ...prev]);
  const handleSave   = (updated: User) =>
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  const handleDelete = () => {
    if (!deleteUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
    setDeleteUser(null);
  };

  const clearFilters = () => {
    setSearch(""); setFilterRole(""); setFilterStatus(""); setFilterDept("");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-cyan-50/30"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* <Header onAddUser={() => setAddOpen(true)} /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <StatsBar projects={users} />

        <UserFilters
          search={search} filterRole={filterRole}
          filterStatus={filterStatus} filterDept={filterDept}
          resultCount={filtered.length}
          onSearch={setSearch} onRole={setFilterRole}
          onStatus={setFilterStatus} onDept={setFilterDept}
          onClear={clearFilters}
        />

        {filtered.length === 0 ? (
          <EmptyState onNewProject={() => setAddOpen(true)} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((u) => (
              <UserCard
                key={u.id}
                user={u}
                onView={setViewUser}
                onEdit={setEditUser}
                onDelete={setDeleteUser}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <AddUserModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
      <EditUserModal
        user={editUser}
        onClose={() => setEditUser(null)}
        onSave={handleSave}
      />
      <DeleteUserModal
        user={deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={handleDelete}
      />
      <UserDetailModal
        user={viewUser}
        onClose={() => setViewUser(null)}
        onEdit={(u) => { setViewUser(null); setEditUser(u); }}
        onDelete={(u) => { setViewUser(null); setDeleteUser(u); }}
      />
    </div>
  );
}
export default UsersPage