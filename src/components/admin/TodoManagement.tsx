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
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

        {/* Templates Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {filteredTemplates.map(template => (
            <div
              key={template.id}
              className="bg-white rounded-lg border border-gray-200 p-2.5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-1.5">
                <h3 className="text-xs flex-1">{template.title}</h3>
                <div className="flex items-center gap-0.5">
                  <button className="p-0.5 hover:bg-gray-100 rounded">
                    <Edit className="w-3 h-3 text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="p-0.5 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-2 line-clamp-2">{template.description}</p>

              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                <span className={`px-1.5 py-0.5 rounded text-xs border ${priorityColors[template.priority]}`}>
                  {template.priority.toUpperCase()}
                </span>
                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                  {template.category}
                </span>
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded text-xs">
                  {template.estimatedMinutes} min
                </span>
              </div>

              <div className="text-xs text-gray-500 border-t border-gray-100 pt-1.5">
                <div className="flex items-center justify-between">
                  <span>Position:</span>
                  <span className="font-semibold text-gray-700">{template.position}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span>Created:</span>
                  <span className="font-semibold text-gray-700">{template.createdDate}</span>
                </div>
              </div>
            </div>
          ))}
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
                  <input type="text" className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs mb-0.5">Priority</label>
                  <select className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs mb-0.5">Estimated Time (minutes)</label>
                  <input type="number" className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs" />
                </div>
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
    </div>
  );
}
