// OurTeamTable.jsx
import React, { useState } from "react";
import {
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation
} from "../../../redux/services/teamApi";
import {
  FiEdit,
  FiTrash,
  FiPlus,
  FiChevronUp,
  FiChevronDown
} from "react-icons/fi";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaWhatsapp
} from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal";
import InputField from "../../../components/InputField";
import Spinner from "../../../components/Spinner";
import EmptyState from "../../../components/EmptyState";

const OurTeamTable = ({ teamMembers, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    roles: [],
    bio: "",
    image: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      whatsapp: ""
    }
  });

  // RTK Query mutations
  const [createTeamMember, { isLoading: isCreating }] =
    useCreateTeamMemberMutation();
  const [updateTeamMember, { isLoading: isUpdating }] =
    useUpdateTeamMemberMutation();
  const [deleteTeamMember, { isLoading: isDeleting }] =
    useDeleteTeamMemberMutation();

  const rolesEnum = ["Leadership", "Consultancy", "Design", "Construction"];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedMember) {
        await updateTeamMember({
          id: selectedMember._id,
          ...formData
        }).unwrap();
        toast.success("Team member updated successfully");
      } else {
        await createTeamMember(formData).unwrap();
        toast.success("Team member created successfully");
      }
      closeModal();
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Operation failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTeamMember(selectedMember._id).unwrap();
      toast.success("Team member deleted successfully");
      closeModal();
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Deletion failed");
    }
  };

  const openEditModal = (member) => {
    setSelectedMember(member);
    setFormData({
      ...member,
      socialLinks: member.socialLinks || {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: "",
        whatsapp: ""
      }
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (member) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedMember(null);
    setFormData({
      name: "",
      position: "",
      roles: [],
      bio: "",
      image: "",
      socialLinks: {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: "",
        whatsapp: ""
      }
    });
  };
  return (
    <div className="space-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Team Members</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary cursor-pointer hover:bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FiPlus className="mr-2" /> Add Member
        </button>
      </div>

      <div className="space-y-2">
        {teamMembers.length === 0 ? (
          <EmptyState
            title="No Team Members Found"
            description="You have not added any team member yet."
          />
        ) : (
          <>
            {teamMembers.map((member) => (
              <div
                key={member._id}
                className="rounded-lg overflow-hidden"
              >
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    setExpandedId(expandedId === member._id ? null : member._id)
                  }
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      {member.roles.map((role) => (
                        <span
                          key={role}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(member);
                        }}
                        className="text-blue-500 cursor-pointer  hover:text-blue-700"
                      >
                        <FiEdit size={24} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(member);
                        }}
                        className="text-red-500  cursor-pointer hover:text-red-700"
                      >
                        <FiTrash size={24} />
                      </button>
                      {expandedId === member._id ? (
                        <FiChevronUp size={24} />
                      ) : (
                        <FiChevronDown size={24} />
                      )}
                    </div>
                  </div>
                </div>

                {expandedId === member._id && (
                  <div className="p-4 border-t bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Bio</h4>
                        <p className="text-gray-600 whitespace-pre-line">
                          {member.bio}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Social Links</h4>
                        <div className="flex space-x-4">
                          {member.socialLinks?.linkedin && (
                            <a
                              href={member.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaLinkedin className="text-blue-700 h-6 w-6 hover:text-blue-800" />
                            </a>
                          )}
                          {member.socialLinks?.twitter && (
                            <a
                              href={member.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaTwitter className="text-blue-400 h-6 w-6 hover:text-blue-500" />
                            </a>
                          )}
                          {member.socialLinks?.facebook && (
                            <a
                              href={member.socialLinks.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaFacebook className="text-blue-600 h-6 w-6 hover:text-blue-700" />
                            </a>
                          )}
                          {member.socialLinks?.instagram && (
                            <a
                              href={member.socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaInstagram className="text-pink-500 h-6 w-6 hover:text-pink-600" />
                            </a>
                          )}
                          {member.socialLinks?.whatsapp && (
                            <a
                              href={`https://wa.me/${member.socialLinks.whatsapp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaWhatsapp className="text-green-500 h-6 w-6 hover:text-green-600" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">
          {selectedMember ? "Edit Team Member" : "Add New Team Member"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <InputField
            label="Position"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium">Roles</label>
            <div className="grid grid-cols-2 gap-2">
              {rolesEnum.map((role) => (
                <label key={role} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.roles.includes(role)}
                    onChange={(e) => {
                      const roles = e.target.checked
                        ? [...formData.roles, role]
                        : formData.roles.filter((r) => r !== role);
                      setFormData({ ...formData, roles });
                    }}
                    className="h-4 w-4 text-blue-500"
                  />
                  <span className="text-sm">{role}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Biography
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            required
            placeholder="Give a brief biography"
            className="w-full p-3 border border-gray-300 rounded-lg transition-all"
            rows={10}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="h-20 w-20 rounded-full object-cover mt-2"
              />
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Social Links</h4>
            <InputField
              label="LinkedIn URL"
              value={formData.socialLinks.linkedin}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: {
                    ...prev.socialLinks,
                    linkedin: e.target.value
                  }
                }))
              }
              leftIcon={<FaLinkedin className="text-blue-700" />}
            />

            <InputField
              label="Twitter URL"
              value={formData.socialLinks.twitter}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                }))
              }
              leftIcon={<FaTwitter className="text-blue-400" />}
            />

            <InputField
              label="Facebook URL"
              value={formData.socialLinks.facebook}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: {
                    ...prev.socialLinks,
                    facebook: e.target.value
                  }
                }))
              }
              leftIcon={<FaFacebook className="text-blue-600" />}
            />

            <InputField
              label="Instagram URL"
              value={formData.socialLinks.instagram}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: {
                    ...prev.socialLinks,
                    instagram: e.target.value
                  }
                }))
              }
              leftIcon={<FaInstagram className="text-pink-500" />}
            />

            <InputField
              label="WhatsApp Number"
              value={formData.socialLinks.whatsapp}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: {
                    ...prev.socialLinks,
                    whatsapp: e.target.value
                  }
                }))
              }
              leftIcon={<FaWhatsapp className="text-green-500" />}
              placeholder="Include country code (e.g. +1234567890)"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border cursor-pointer rounded"
              disabled={isCreating || isUpdating}
            >
              Cancel
            </button>
            {isCreating || isUpdating ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-primary cursor-pointer hover:bg-blue-500 text-white rounded flex items-center justify-center"
                disabled={isCreating || isUpdating}
              >
                {selectedMember ? "Update Member" : "Create Member"}
              </button>
            )}
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onRequestClose={closeModal}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
          <p className="mb-6">
            Are you sure you want to delete {selectedMember?.name}?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 cursor-pointer border rounded hover:bg-gray-100"
              disabled={isDeleting}
            >
              Cancel
            </button>
            {isDeleting ? (
              <Spinner />
            ) : (
              <button
                onClick={handleDelete}
                className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                disabled={isDeleting}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OurTeamTable;
