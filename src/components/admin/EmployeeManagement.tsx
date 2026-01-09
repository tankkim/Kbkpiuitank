import { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowLeft, Search, Filter, ChevronDown, ChevronRight, Users } from 'lucide-react';
import { employees as initialEmployees, Employee } from '../../data/adminData';

interface EmployeeManagementProps {
  onBack: () => void;
}

export function EmployeeManagement({ onBack }: EmployeeManagementProps) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('all');
  const [viewMode, setViewMode] = useState<'branch' | 'list'>('branch');
  const [expandedBranches, setExpandedBranches] = useState<Set<string>>(new Set(['Jakarta Pusat', 'Jakarta Gunung Sahari']));
  const [formData, setFormData] = useState<Partial<Employee>>({
    employeeCode: '',
    name: '',
    position: '',
    region: '',
    branch: '',
    email: '',
    phone: '',
    joinDate: '',
    status: 'active',
  });

  const handleAdd = () => {
    const newEmployee: Employee = {
      id: `emp-${Date.now()}`,
      employeeCode: formData.employeeCode || '',
      name: formData.name || '',
      position: formData.position || '',
      region: formData.region,
      branch: formData.branch,
      email: formData.email || '',
      phone: formData.phone || '',
      joinDate: formData.joinDate || new Date().toISOString().split('T')[0],
      status: formData.status || 'active',
    };
    setEmployees([...employees, newEmployee]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setIsAddModalOpen(true);
  };

  const handleUpdate = () => {
    if (editingEmployee) {
      setEmployees(
        employees.map((e) =>
          e.id === editingEmployee.id ? { ...e, ...formData } as Employee : e
        )
      );
      setEditingEmployee(null);
      setIsAddModalOpen(false);
      resetForm();
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter((e) => e.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      employeeCode: '',
      name: '',
      position: '',
      region: '',
      branch: '',
      email: '',
      phone: '',
      joinDate: '',
      status: 'active',
    });
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = filterPosition === 'all' || emp.position === filterPosition;
    return matchesSearch && matchesPosition;
  });

  // Group employees by branch
  const employeesByBranch = filteredEmployees.reduce((acc, emp) => {
    const branchKey = emp.branch || 'Unassigned';
    if (!acc[branchKey]) {
      acc[branchKey] = [];
    }
    acc[branchKey].push(emp);
    return acc;
  }, {} as Record<string, Employee[]>);

  const toggleBranch = (branch: string) => {
    const newExpanded = new Set(expandedBranches);
    if (newExpanded.has(branch)) {
      newExpanded.delete(branch);
    } else {
      newExpanded.add(branch);
    }
    setExpandedBranches(newExpanded);
  };

  const positions = ['Region Head', 'Branch Manager', 'Branch Sales Manager', 'RM Sales'];
  const regions = ['REGIONAL I', 'REGIONAL II', 'REGIONAL III', 'REGIONAL IV', 'REGIONAL V', 'REGIONAL VI', 'REGIONAL VII'];

  // Branch data by region
  const branchesData: Record<string, string[]> = {
    'REGIONAL I': ['JAKARTA PUSAT', 'JAKARTA SELATAN', 'TANGERANG', 'JAKARTA SUDIRAYA', 'JAKARTA GATAYA'],
    'REGIONAL II': ['BANDUNG DAGO', 'BANDUNG PASTEUR'],
    'REGIONAL III': ['SURABAYA TUNJUNGAN', 'MALANG'],
    'REGIONAL IV': ['SEMARANG', 'SOLO'],
    'REGIONAL V': ['MEDAN', 'PEKANBARU'],
    'REGIONAL VI': ['MAKASSAR', 'MANADO'],
    'REGIONAL VII': ['DENPASAR', 'MATARAM'],
  };

  // Get available branches based on selected region
  const availableBranches = formData.region ? branchesData[formData.region] || [] : [];

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
              <h1 className="text-2xl text-gray-900">Employee Management</h1>
              <p className="text-sm text-gray-600 mt-1">Register and manage employee information</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingEmployee(null);
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 hover:border-gray-400 transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl mt-1 text-gray-900">{employees.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl mt-1 text-green-600">
                {employees.filter((e) => e.status === 'active').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl mt-1 text-gray-500">
                {employees.filter((e) => e.status === 'inactive').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Positions</p>
              <p className="text-2xl mt-1 text-blue-600">4</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, code, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="w-64 relative">
                <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={filterPosition}
                  onChange={(e) => setFilterPosition(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                >
                  <option value="all">All Positions</option>
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('branch')}
                  className={`px-4 py-1.5 rounded text-sm transition-all ${
                    viewMode === 'branch'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  By Branch
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-1.5 rounded text-sm transition-all ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List View
                </button>
              </div>
            </div>
          </div>

          {/* Employees Display - Branch View or List View */}
          {viewMode === 'branch' ? (
            <div className="space-y-4">
              {Object.entries(employeesByBranch).map(([branch, branchEmployees]) => (
                <div key={branch} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Branch Header */}
                  <div className="bg-gray-700 text-white px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBranch(branch)}
                        className="w-7 h-7 rounded bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                      >
                        {expandedBranches.has(branch) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      <Users className="w-4 h-4" />
                      <h3 className="text-sm">{branch}</h3>
                      <span className="px-1.5 py-0.5 bg-white/20 rounded text-xs">
                        {branchEmployees.length} {branchEmployees.length === 1 ? 'employee' : 'employees'}
                      </span>
                    </div>
                  </div>

                  {/* Branch Employees */}
                  {expandedBranches.has(branch) && (
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {branchEmployees.map((employee) => (
                          <div
                            key={employee.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-sm text-gray-900">{employee.name}</h4>
                                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                                    employee.status === 'active'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {employee.status}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500">{employee.employeeCode}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleEdit(employee)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(employee.id)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <div className="space-y-1.5 text-xs text-gray-600">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">Position:</span>
                                <span className="text-gray-900">{employee.position}</span>
                              </div>
                              {employee.region && (
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500">Region:</span>
                                  <span className="text-gray-900">{employee.region}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">Email:</span>
                                <span className="text-gray-900 truncate">{employee.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">Phone:</span>
                                <span className="text-gray-900">{employee.phone}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // List View (Original Table)
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Code</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Position</th>
                      <th className="px-4 py-3 text-left">Region</th>
                      <th className="px-4 py-3 text-left">Branch</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Phone</th>
                      <th className="px-4 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-4 py-3 text-gray-900">{employee.employeeCode}</td>
                        <td className="px-4 py-3 text-gray-900">{employee.name}</td>
                        <td className="px-4 py-3 text-gray-600">{employee.position}</td>
                        <td className="px-4 py-3 text-gray-600">{employee.region || '-'}</td>
                        <td className="px-4 py-3 text-gray-600">{employee.branch || '-'}</td>
                        <td className="px-4 py-3 text-gray-600">{employee.email}</td>
                        <td className="px-4 py-3 text-gray-600">{employee.phone}</td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              employee.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {employee.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(employee)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(employee.id)}
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
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="bg-gray-700 text-white px-6 py-3 rounded-t-2xl">
              <h2 className="text-lg">{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Employee Code</label>
                  <input
                    type="text"
                    value={formData.employeeCode}
                    onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., RH001"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter full name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Position</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Position</option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Region</label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Region</option>
                    {regions.map((reg) => (
                      <option key={reg} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Branch (if applicable)</label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Branch</option>
                  {availableBranches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="email@kbindonesia.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="+62 xxx-xxxx-xxxx"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Join Date</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingEmployee(null);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingEmployee ? handleUpdate : handleAdd}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {editingEmployee ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}