import { useState } from 'react';
import { Plus, Edit2, Trash2, ChevronRight, ArrowLeft } from 'lucide-react';
import { positions as initialPositions, Position } from '../../data/adminData';

interface PositionManagementProps {
  onBack: () => void;
}

export function PositionManagement({ onBack }: PositionManagementProps) {
  const [positions, setPositions] = useState<Position[]>(initialPositions);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [formData, setFormData] = useState({ name: '', level: 1, parentId: '' });

  const handleAdd = () => {
    const newPosition: Position = {
      id: `pos-${Date.now()}`,
      name: formData.name,
      level: formData.level,
      parentId: formData.parentId || undefined,
    };
    setPositions([...positions, newPosition]);
    setIsAddModalOpen(false);
    setFormData({ name: '', level: 1, parentId: '' });
  };

  const handleEdit = (position: Position) => {
    setEditingPosition(position);
    setFormData({
      name: position.name,
      level: position.level,
      parentId: position.parentId || '',
    });
    setIsAddModalOpen(true);
  };

  const handleUpdate = () => {
    if (editingPosition) {
      setPositions(
        positions.map((p) =>
          p.id === editingPosition.id
            ? { ...p, name: formData.name, level: formData.level, parentId: formData.parentId || undefined }
            : p
        )
      );
      setEditingPosition(null);
      setIsAddModalOpen(false);
      setFormData({ name: '', level: 1, parentId: '' });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this position?')) {
      setPositions(positions.filter((p) => p.id !== id));
    }
  };

  const getParentName = (parentId?: string) => {
    const parent = positions.find((p) => p.id === parentId);
    return parent ? parent.name : 'None';
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl text-gray-900">Position Management</h1>
              <p className="text-sm text-gray-600 mt-1">Manage organizational hierarchy</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingPosition(null);
              setFormData({ name: '', level: 1, parentId: '' });
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Add Position
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto">
          {/* Hierarchy Visualization */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg text-gray-900 mb-4">Organizational Hierarchy</h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {positions
                .sort((a, b) => a.level - b.level)
                .map((position, index) => (
                  <div key={position.id} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="px-4 py-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg shadow-md min-w-[180px] text-center">
                        <p className="text-sm">{position.name}</p>
                        <p className="text-xs opacity-75">Level {position.level}</p>
                      </div>
                    </div>
                    {index < positions.length - 1 && (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Positions Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm">Position Name</th>
                    <th className="px-6 py-3 text-left text-sm">Level</th>
                    <th className="px-6 py-3 text-left text-sm">Reports To</th>
                    <th className="px-6 py-3 text-right text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {positions
                    .sort((a, b) => a.level - b.level)
                    .map((position, index) => (
                      <tr key={position.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{position.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            Level {position.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{getParentName(position.parentId)}</td>
                        <td className="px-6 py-4 text-sm text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(position)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(position.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-t-2xl">
              <h2 className="text-xl">{editingPosition ? 'Edit Position' : 'Add New Position'}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Position Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter position name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Level</label>
                <input
                  type="number"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="10"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Reports To</label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">None (Top Level)</option>
                  {positions
                    .filter((p) => p.id !== editingPosition?.id)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingPosition(null);
                    setFormData({ name: '', level: 1, parentId: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingPosition ? handleUpdate : handleAdd}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  {editingPosition ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
