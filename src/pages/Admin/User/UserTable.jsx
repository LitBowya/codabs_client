// UserTable.jsx
import React, { useState } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation
} from "../../../redux/services/userApi";
import { useRegisterMutation } from "../../../redux/services/authApi";
import {
  FiEdit,
  FiTrash,
  FiChevronUp,
  FiChevronDown,
  FiPlus,
  FiKey, FiChevronRight, FiChevronLeft
} from "react-icons/fi";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal";
import InputField from "../../../components/InputField";
import Spinner from "../../../components/Spinner";
import EmptyState from "../../../components/EmptyState";
import { useSelector } from "react-redux";

const UserTable = () => {
  // Filter and pagination state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [sortOption, setSortOption] = useState("createdAt:desc");
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch users with filters
  const {
    data: response,
    isLoading,
    isError,
    refetch
  } = useGetAllUsersQuery({
    search: searchQuery,
    role: selectedRole,
    sort: sortOption,
    page,
    limit
  });

  const user = useSelector((state) => state.auth.user);
  const isAdmin =
    user.roles?.includes("superadmin") || user.roles?.includes("admin");

  const users = response?.users || [];
  const pagination = response?.pagination || {
    page: 1,
    totalPages: 1,
    totalUsers: 0
  };

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  // Form states
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
    roles: ["viewer"]
  });

  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    profilePicture: ""
  });

  const [roleForm, setRoleForm] = useState({
    roles: []
  });

  // Mutations
  const [updateUser, { isLoading: isUpdateUserLoading }] = useUpdateUserMutation();
  const [updateUserRole, { isLoading: isUpdateUserRoleLoading }] = useUpdateUserRoleMutation();
  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation();
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const roleOptions = ["admin", "editor", "viewer", "superadmin"];

  // Handlers
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleRoleFilterChange = (value) => {
    setSelectedRole(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };

  // Image Upload Handler
  const handleImageUpload = (e, formType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (formType === "add") {
          setAddForm((prev) => ({ ...prev, profilePicture: reader.result }));
        } else {
          setEditForm((prev) => ({ ...prev, profilePicture: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add User
  const openAddModal = () => setIsAddModalOpen(true);
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({
        ...addForm
      }).unwrap();
      toast.success("User created successfully");
      setIsAddModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Registration failed");
    }
  };

  // Edit User
  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      phone: user.phone,
      profilePicture: user.profilePicture
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        id: selectedUser._id,
        ...editForm
      }).unwrap();
      toast.success("User updated successfully");
      setIsEditModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Update failed");
    }
  };

  // Role Management
  const openRoleModal = (user) => {
    setSelectedUser(user);
    setRoleForm({ roles: [...user.roles] });
    setIsRoleModalOpen(true);
  };

  const handleRoleChange = (role) => {
    setRoleForm((prev) => ({
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role]
    }));
  };

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserRole({
        id: selectedUser._id,
        role: roleForm.roles
      }).unwrap();

      toast.success("Roles updated successfully");
      setIsRoleModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Role update failed");
    }
  };

  // Delete User
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUser._id).unwrap();
      toast.success("User deleted successfully");
      setIsDeleteModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Deletion failed");
    }
  };

  const isSuperAdmin = (user) => user?.roles?.includes("superadmin");

  if (isLoading) return <Spinner />;
  if (isError) return <div className="text-red-500">Error loading users</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-4">
      {/* Controls Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
        />

        <select
          value={selectedRole}
          onChange={(e) => handleRoleFilterChange(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Roles</option>
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="createdAt:desc">Newest First</option>
          <option value="createdAt:asc">Oldest First</option>
          <option value="name:asc">Name A-Z</option>
          <option value="name:desc">Name Z-A</option>
        </select>

        <button
          onClick={openAddModal}
          className="hover:bg-blue-500 cursor-pointer bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiPlus /> Add User
        </button>
      </div>

      {/* Table Section */}
      {users.length === 0 ? (
        <EmptyState
          title="No Users Found"
          description="Try adjusting your filters or creating a new user"
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Roles
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <React.Fragment key={user._id}>
                  <tr
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      setExpandedId(expandedId === user._id ? null : user._id)
                    }
                  >
                    <td className="px-6 py-4">
                      <img
                        src={user.profilePicture || "/default-avatar.png"}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {user.roles.map((role) => (
                          <span
                            key={role}
                            className={`px-2 py-1 rounded text-xs ${
                              role === "superadmin"
                                ? "bg-purple-100 text-purple-800"
                                : role === "admin"
                                  ? "bg-blue-100 text-blue-800"
                                  : role === "editor"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                              {role}
                            </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {!isSuperAdmin(user) && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(user);
                            }}
                            className="text-blue-500  cursor-pointer hover:text-blue-700"
                          >
                            <FiEdit size={24} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openRoleModal(user);
                            }}
                            className="text-green-500 cursor-pointer  hover:text-green-700"
                          >
                            <FiKey size={24} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteModal(user);
                            }}
                            className="text-red-500  cursor-pointer hover:text-red-700"
                          >
                            <FiTrash size={24} />
                          </button>
                        </>
                      )}
                      <span className="inline-block ml-2">
                          {expandedId === user._id ? (
                            <FiChevronUp size={24} />
                          ) : (
                            <FiChevronDown size={24} />
                          )}
                        </span>
                    </td>
                  </tr>

                  {expandedId === user._id && (
                    <tr className="bg-gray-50">
                      <td colSpan="5" className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            {isAdmin && (
                              <p>
                                <span className="font-medium">User ID:</span>{" "}
                                {user.userId}
                              </p>
                            )}
                            <p>
                              <span className="font-medium">Phone:</span>{" "}
                              {user.phone}
                            </p>
                            <p>
                              <span className="font-medium">Registered:</span>{" "}
                              {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">System Roles</h4>
                            <div className="flex flex-wrap gap-2">
                              {user.roles.map((role) => (
                                <span
                                  key={role}
                                  className="px-2 py-1 bg-gray-100 rounded text-sm"
                                >
                                    {role}
                                  </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-2 md:mb-0 text-sm text-gray-600">
              Page {pagination.page} of {pagination.totalPages} (
              {pagination.totalUsers} total users)
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                <FiChevronLeft size={24} />
              </button>
              <span>{pagination.page} of {pagination.totalPages}</span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pagination.totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <InputField
            label="Email"
            value={addForm.email}
            onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
            required
            type="email"
          />
          <InputField
            label="Name"
            value={addForm.name}
            onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
            required
          />
          <InputField
            label="Phone Number"
            value={addForm.phone}
            onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "add")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {addForm.profilePicture && (
              <img
                src={addForm.profilePicture}
                alt="Preview"
                className="h-20 w-20 rounded-full object-cover mt-2"
              />
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            {isRegisterLoading ? <Spinner /> : <button
              type="submit"
              className="px-4 py-2 hover:bg-blue-500 cursor-pointer bg-primary text-white rounded"
            >
              Create User
            </button>}
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <InputField
            label="Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            required
          />
          <InputField
            label="Phone Number"
            value={editForm.phone}
            onChange={(e) =>
              setEditForm({ ...editForm, phone: e.target.value })
            }
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "edit")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {editForm.profilePicture && (
              <img
                src={editForm.profilePicture}
                alt="Preview"
                className="h-20 w-20 rounded-full object-cover mt-2"
              />
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            {isUpdateUserLoading ? <Spinner /> : <button
              type="submit"
              className="px-4 py-2 hover:bg-blue-500 cursor-pointer bg-primary  text-white rounded"
            >
              Save Changes
            </button>}
          </div>
        </form>
      </Modal>

      {/* Role Update Modal */}
      <Modal
        isOpen={isRoleModalOpen}
        onRequestClose={() => setIsRoleModalOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">Update Roles</h2>
        <form onSubmit={handleRoleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {roleOptions.map((role) => (
              <label
                key={role}
                className="flex items-center space-x-2 p-2 border rounded"
              >
                <input
                  type="checkbox"
                  checked={roleForm.roles.includes(role)}
                  onChange={() => handleRoleChange(role)}
                  className="h-4 w-4 text-blue-500"
                  disabled={
                    role === "superadmin" &&
                    !roleForm.roles.includes("superadmin")
                  }
                />
                <span className="text-sm capitalize">{role}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setIsRoleModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            {isUpdateUserRoleLoading ? <Spinner /> : <button
              type="submit"
              className="px-4 py-2 hover:bg-blue-500 cursor-pointer bg-primary  text-white rounded"
            >
              Update Roles
            </button>}
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
          <p className="mb-6">
            Are you sure you want to delete {selectedUser?.name}'s account?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            {isDeleteLoading ? <Spinner /> : <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserTable;
