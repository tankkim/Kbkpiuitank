import { useState } from 'react';
import { ArrowLeft, Bell, Plus, Trash2, Edit, BarChart3, Search, Filter } from 'lucide-react';
import { todoTemplates, type TodoTemplate } from '../../data/todoData';

interface TodoManagementProps {
  onBack: () => void;
  unreadNotificationsCount: number;
  onNotificationClick: () => void;
}

export function TodoManagement({ onBack, unreadNotificationsCount, onNotificationClick }: TodoManagementProps) {
  const [templates, setTemplates] = useState<TodoTemplate[]>(todoTemplates);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TodoTemplate | null>(null);
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    position: '',
    category: 'Management',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });

  const positions = ['all', ...Array.from(new Set(templates.map(t => t.position)))];

  const filteredTemplates = templates.filter(template => {
    const matchesPosition = selectedPosition === 'all' || template.position === selectedPosition;
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPosition && matchesSearch && template.isActive;
  });

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm('Are you sure you want to delete this to-do template?')) {
      setTemplates(templates.map(t => t.id === templateId ? { ...t, isActive: false } : t));
    }
  };

  const priorityColors = {
    high: 'text-red-600 bg-red-50 border-red-200',
    medium: 'text-orange-600 bg-orange-50 border-orange-200',
    low: 'text-blue-600 bg-blue-50 border-blue-200',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-3 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-sm">To-Do Template Management</h1>
                <p className="text-xs text-gray-500">Create and manage daily task templates by position</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onNotificationClick}
                className="relative p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-2.5 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Template
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-3">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white p-2 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Active Templates</div>
                <div className="text-lg mt-0.5">{templates.filter(t => t.isActive).length}</div>
              </div>
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-2 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Positions</div>
                <div className="text-lg mt-0.5">{positions.filter(p => p !== 'all').length}</div>
              </div>
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-2 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Total Tasks</div>
                <div className="text-lg mt-0.5">{templates.filter(t => t.isActive).length}</div>
              </div>
              <BarChart3 className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-2 rounded-lg border border-gray-200 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-7 pr-2 py-1 border border-gray-200 rounded-lg text-xs w-40"
                />
              </div>

              <Filter className="w-3.5 h-3.5 text-gray-500" />
              {positions.map(position => (
                <button
                  key={position}
                  onClick={() => setSelectedPosition(position)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    selectedPosition === position
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {position === 'all' ? 'All' : position}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-2 py-1.5 text-left font-semibold text-gray-700">Task</th>
                  <th className="px-2 py-1.5 text-left font-semibold text-gray-700">Position</th>
                  <th className="px-2 py-1.5 text-left font-semibold text-gray-700">Category</th>
                  <th className="px-2 py-1.5 text-left font-semibold text-gray-700">Priority</th>
                  <th className="px-2 py-1.5 text-left font-semibold text-gray-700">Created</th>
                  <th className="px-2 py-1.5 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTemplates.map(template => (
                  <tr key={template.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-1.5">
                      <div>
                        <div className="font-semibold text-gray-900 mb-0.5">{template.title}</div>
                        <div className="text-gray-500 text-[11px] line-clamp-1">{template.description}</div>
                      </div>
                    </td>
                    <td className="px-2 py-1.5">
                      <span className="text-gray-700">{template.position}</span>
                    </td>
                    <td className="px-2 py-1.5">
                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px]">
                        {template.category}
                      </span>
                    </td>
                    <td className="px-2 py-1.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] border ${priorityColors[template.priority]}`}>
                        {template.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-2 py-1.5 text-gray-500">
                      {template.createdDate}
                    </td>
                    <td className="px-2 py-1.5">
                      <div className="flex items-center justify-end gap-0.5">
                        <button
                          onClick={() => {
                            setSelectedTemplate(template);
                            setFormData({
                              title: template.title,
                              description: template.description,
                              position: template.position,
                              category: template.category,
                              priority: template.priority
                            });
                            setShowEditModal(true);
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="p-1 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="p-6 text-center text-gray-500 text-xs">
              No templates found. Click "Add Template" to create one.
            </div>
          )}
        </div>
      </div>

      {/* Add Template Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-3">
            <h2 className="text-sm mb-3">Add New To-Do Template</h2>
            
            <div className="space-y-2">
              <div>
                <label className="block text-xs mb-0.5">Task Title</label>
                <input type="text" className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs" />
              </div>
              
              <div>
                <label className="block text-xs mb-0.5">Description</label>
                <textarea className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs" rows={2} />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs mb-0.5">Position</label>
                  <select className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs">
                    {positions.filter(p => p !== 'all').map(pos => (
                      <option key={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs mb-0.5">Category</label>
                  <select className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs">
                    <option value="Management">Management</option>
                    <option value="Sales">Sales</option>
                    <option value="Reporting">Reporting</option>
                    <option value="Communication">Communication</option>
                    <option value="Operations">Operations</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs mb-0.5">Priority</label>
                <select className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Template would be created here');
                  setShowAddModal(false);
                }}
                className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
              >
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Template Modal */}
      {showEditModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-3">
            <h2 className="text-sm mb-3">Edit To-Do Template</h2>
            
            <div className="space-y-2">
              <div>
                <label className="block text-xs mb-0.5">Task Title</label>
                <input
                  type="text"
                  className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-xs mb-0.5">Description</label>
                <textarea
                  className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs"
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs mb-0.5">Position</label>
                  <select
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  >
                    {positions.filter(p => p !== 'all').map(pos => (
                      <option key={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs mb-0.5">Category</label>
                  <select
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Management">Management</option>
                    <option value="Sales">Sales</option>
                    <option value="Reporting">Reporting</option>
                    <option value="Communication">Communication</option>
                    <option value="Operations">Operations</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs mb-0.5">Priority</label>
                <select
                  className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'high' | 'medium' | 'low' })}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Template would be updated here');
                  setShowEditModal(false);
                }}
                className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs"
              >
                Update Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}