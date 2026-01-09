import { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowLeft, Building2, MapPin, ChevronDown, ChevronRight, Users, X } from 'lucide-react';
import { employees as initialEmployees } from '../../data/adminData';

interface Branch {
  id: string;
  code: string;
  name: string;
  address: string;
  city: string;
  managerName?: string;
  status: 'active' | 'inactive';
}

interface Region {
  id: string;
  code: string;
  name: string;
  headName?: string;
  status: 'active' | 'inactive';
  branches: Branch[];
}

interface OrganizationManagementProps {
  onBack: () => void;
}

export function OrganizationManagement({ onBack }: OrganizationManagementProps) {
  const [activeTab, setActiveTab] = useState<'regions' | 'branches'>('regions');
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set(['reg-1']));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'region' | 'branch'>('region');
  const [editingItem, setEditingItem] = useState<Region | Branch | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<{ regionId: string; branch: Branch } | null>(null);
  
  // Use employee data from adminData
  const employees = initialEmployees;

  const [regions, setRegions] = useState<Region[]>([
    {
      id: 'reg-1',
      code: 'REG-I',
      name: 'REGIONAL I',
      headName: 'John Doe',
      status: 'active',
      branches: [
        { id: 'br-1', code: 'JKT-001', name: 'JAKARTA PUSAT', address: 'Jl. Sudirman No. 123', city: 'Jakarta', managerName: 'Jane Smith', status: 'active' },
        { id: 'br-2', code: 'JKT-002', name: 'JAKARTA SELATAN', address: 'Jl. Senopati Raya 45', city: 'Jakarta', managerName: 'Budi Santoso', status: 'active' },
        { id: 'br-3', code: 'JKT-003', name: 'TANGERANG', address: 'Jl. BSD Boulevard 88', city: 'Tangerang', managerName: 'Hendra Gunawan', status: 'active' },
        { id: 'br-4', code: 'JKT-004', name: 'JAKARTA SUDIRAYA', address: 'Jl. Sudirman Raya 77', city: 'Jakarta', managerName: 'Eko Prasetyo', status: 'active' },
        { id: 'br-5', code: 'JKT-005', name: 'JAKARTA GATAYA', address: 'Jl. Gatot Subroto 99', city: 'Jakarta', managerName: 'Dian Pertiwi', status: 'active' },
      ]
    },
    {
      id: 'reg-2',
      code: 'REG-II',
      name: 'REGIONAL II',
      headName: 'Dewi Kusuma',
      status: 'active',
      branches: []
    },
    {
      id: 'reg-3',
      code: 'REG-III',
      name: 'REGIONAL III',
      headName: 'Joko Susanto',
      status: 'active',
      branches: []
    },
  ]);

  const [formData, setFormData] = useState<any>({});

  // Calculate employee count for a branch
  const getBranchEmployeeCount = (branchName: string) => {
    return employees.filter(emp => emp.branch === branchName && emp.status === 'active').length;
  };

  // Get employees for a branch
  const getBranchEmployees = (branchName: string) => {
    return employees.filter(emp => emp.branch === branchName);
  };

  const toggleRegion = (regionId: string) => {
    const newExpanded = new Set(expandedRegions);
    if (newExpanded.has(regionId)) {
      newExpanded.delete(regionId);
    } else {
      newExpanded.add(regionId);
    }
    setExpandedRegions(newExpanded);
  };

  const handleAddRegion = () => {
    setModalType('region');
    setEditingItem(null);
    setFormData({ code: '', name: '', headName: '', status: 'active' });
    setIsAddModalOpen(true);
  };

  const handleAddBranch = (regionId?: string) => {
    setModalType('branch');
    setEditingItem(null);
    setFormData({ regionId: regionId || '', code: '', name: '', address: '', city: '', managerName: '', status: 'active' });
    setIsAddModalOpen(true);
  };

  const handleEditRegion = (region: Region) => {
    setModalType('region');
    setEditingItem(region);
    setFormData(region);
    setIsAddModalOpen(true);
  };

  const handleEditBranch = (branch: Branch) => {
    setModalType('branch');
    setEditingItem(branch);
    setFormData(branch);
    setIsAddModalOpen(true);
  };

  const handleSave = () => {
    if (modalType === 'region') {
      if (editingItem) {
        setRegions(regions.map(r => r.id === editingItem.id ? { ...r, ...formData } : r));
      } else {
        const newRegion: Region = {
          id: `reg-${Date.now()}`,
          code: formData.code,
          name: formData.name,
          headName: formData.headName,
          status: formData.status,
          branches: []
        };
        setRegions([...regions, newRegion]);
      }
    } else {
      if (editingItem) {
        setRegions(regions.map(r => ({
          ...r,
          branches: r.branches.map(b => b.id === (editingItem as Branch).id ? { ...b, ...formData } : b)
        })));
      } else {
        const newBranch: Branch = {
          id: `br-${Date.now()}`,
          code: formData.code,
          name: formData.name,
          address: formData.address,
          city: formData.city,
          managerName: formData.managerName,
          status: formData.status
        };
        setRegions(regions.map(r => 
          r.id === formData.regionId ? { ...r, branches: [...r.branches, newBranch] } : r
        ));
      }
    }
    setIsAddModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleDeleteRegion = (regionId: string) => {
    if (confirm('Are you sure you want to delete this region? All branches under this region will also be deleted.')) {
      setRegions(regions.filter(r => r.id !== regionId));
    }
  };

  const handleDeleteBranch = (regionId: string, branchId: string) => {
    if (confirm('Are you sure you want to delete this branch?')) {
      setRegions(regions.map(r => 
        r.id === regionId ? { ...r, branches: r.branches.filter(b => b.id !== branchId) } : r
      ));
    }
  };

  const handleViewBranchEmployees = (regionId: string, branch: Branch) => {
    setSelectedBranch({ regionId, branch });
  };

  const totalBranches = regions.reduce((sum, r) => sum + r.branches.length, 0);
  const totalEmployees = regions.reduce((sum, r) => 
    sum + r.branches.reduce((brSum, br) => brSum + getBranchEmployeeCount(br.name), 0), 0
  );

  // Get available region heads (position: Region Head)
  const availableRegionHeads = employees.filter(emp => emp.position === 'Region Head' && emp.status === 'active');
  
  // Get available branch managers (position: Branch Manager)
  const availableBranchManagers = employees.filter(emp => emp.position === 'Branch Manager' && emp.status === 'active');

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
              <h1 className="text-2xl text-gray-900">Organization Structure</h1>
              <p className="text-sm text-gray-600 mt-1">Manage regions and branches</p>
            </div>
          </div>
          <button
            onClick={activeTab === 'regions' ? handleAddRegion : () => handleAddBranch()}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 hover:border-gray-400 transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            Add {activeTab === 'regions' ? 'Region' : 'Branch'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Regions</p>
                  <p className="text-2xl text-gray-900">{regions.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Branches</p>
                  <p className="text-2xl text-gray-900">{totalBranches}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Branches</p>
                  <p className="text-2xl text-green-600">
                    {regions.reduce((sum, r) => sum + r.branches.filter(b => b.status === 'active').length, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Employees</p>
                  <p className="text-2xl text-gray-900">{totalEmployees}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 inline-flex">
            <button
              onClick={() => setActiveTab('regions')}
              className={`px-6 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'regions'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Regions & Branches
            </button>
            <button
              onClick={() => setActiveTab('branches')}
              className={`px-6 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'branches'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Branches
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'regions' ? (
            <div className="space-y-4">
              {regions.map((region) => (
                <div key={region.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Region Header */}
                  <div className="bg-gray-700 text-white px-3 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleRegion(region.id)}
                          className="w-7 h-7 rounded bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                          {expandedRegions.has(region.id) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm">{region.name}</h3>
                            <span className="px-1.5 py-0.5 bg-white/20 rounded text-xs">{region.code}</span>
                            <span className={`px-1.5 py-0.5 rounded text-xs ${
                              region.status === 'active' ? 'bg-green-500/20' : 'bg-gray-500/20'
                            }`}>
                              {region.status}
                            </span>
                          </div>
                          <p className="text-xs text-white/80 mt-0.5">
                            Head: {region.headName || 'Not assigned'} • {region.branches.length} branches
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleAddBranch(region.id)}
                          className="px-2.5 py-1.5 bg-white/20 hover:bg-white/30 rounded text-xs flex items-center gap-1 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Branch
                        </button>
                        <button
                          onClick={() => handleEditRegion(region)}
                          className="p-1.5 hover:bg-white/20 rounded transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteRegion(region.id)}
                          className="p-1.5 hover:bg-white/20 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Branches */}
                  {expandedRegions.has(region.id) && (
                    <div className="p-4">
                      {region.branches.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <Building2 className="w-12 h-12 mx-auto mb-2 opacity-30" />
                          <p className="text-sm">No branches in this region</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {region.branches.map((branch) => {
                            const employeeCount = getBranchEmployeeCount(branch.name);
                            return (
                              <div
                                key={branch.id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => handleViewBranchEmployees(region.id, branch)}
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="text-sm text-gray-900">{branch.name}</h4>
                                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                                        branch.status === 'active'
                                          ? 'bg-green-100 text-green-700'
                                          : 'bg-gray-100 text-gray-700'
                                      }`}>
                                        {branch.status}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-500">{branch.code}</p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditBranch(branch);
                                      }}
                                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteBranch(region.id, branch.id);
                                      }}
                                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                                <div className="space-y-1.5 text-xs text-gray-600">
                                  <div className="flex items-start gap-2">
                                    <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                    <span>{branch.address}, {branch.city}</span>
                                  </div>
                                  {branch.managerName && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-gray-500">Manager:</span>
                                      <span className="text-gray-900">{branch.managerName}</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                                    <Users className="w-3.5 h-3.5" />
                                    <span className="text-gray-500">Employees:</span>
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-semibold">
                                      {employeeCount}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // All Branches Tab
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Code</th>
                      <th className="px-4 py-3 text-left">Branch Name</th>
                      <th className="px-4 py-3 text-left">Region</th>
                      <th className="px-4 py-3 text-left">City</th>
                      <th className="px-4 py-3 text-left">Manager</th>
                      <th className="px-4 py-3 text-center">Employees</th>
                      <th className="px-4 py-3 text-center">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {regions.flatMap(region =>
                      region.branches.map(branch => {
                        const employeeCount = getBranchEmployeeCount(branch.name);
                        return (
                          <tr 
                            key={branch.id} 
                            className="hover:bg-blue-50 transition-colors cursor-pointer"
                            onClick={() => handleViewBranchEmployees(region.id, branch)}
                          >
                            <td className="px-4 py-3 text-gray-900">{branch.code}</td>
                            <td className="px-4 py-3 text-gray-900">{branch.name}</td>
                            <td className="px-4 py-3 text-gray-600">{region.name}</td>
                            <td className="px-4 py-3 text-gray-600">{branch.city}</td>
                            <td className="px-4 py-3 text-gray-600">{branch.managerName || '-'}</td>
                            <td className="px-4 py-3 text-center">
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                                {employeeCount}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`px-2 py-1 rounded text-xs ${
                                branch.status === 'active'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {branch.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditBranch(branch);
                                  }}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteBranch(region.id, branch.id);
                                  }}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
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
              <h2 className="text-lg">
                {editingItem ? `Edit ${modalType === 'region' ? 'Region' : 'Branch'}` : `Add New ${modalType === 'region' ? 'Region' : 'Branch'}`}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {modalType === 'region' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Region Code</label>
                      <input
                        type="text"
                        value={formData.code || ''}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., REG-VIII"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Region Name</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., REGIONAL VIII"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Region Head Name</label>
                    <select
                      value={formData.headName || ''}
                      onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Region Head</option>
                      {availableRegionHeads.map(emp => (
                        <option key={emp.id} value={emp.name}>{emp.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  {!editingItem && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Region</label>
                      <select
                        value={formData.regionId || ''}
                        onChange={(e) => setFormData({ ...formData, regionId: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select Region</option>
                        {regions.map(region => (
                          <option key={region.id} value={region.id}>{region.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Branch Code</label>
                      <input
                        type="text"
                        value={formData.code || ''}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., JKT-003"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Branch Name</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter branch name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={formData.address || ''}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter branch address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={formData.city || ''}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Manager Name</label>
                      <select
                        value={formData.managerName || ''}
                        onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select Branch Manager</option>
                        {availableBranchManagers.map(emp => (
                          <option key={emp.id} value={emp.name}>{emp.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingItem(null);
                    setFormData({});
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {editingItem ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Branch Employees Modal */}
      {selectedBranch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-gray-700 text-white px-6 py-3 rounded-t-2xl z-10 flex items-center justify-between">
              <div>
                <h2 className="text-lg">{selectedBranch.branch.name} - Employees</h2>
                <p className="text-xs text-white/80 mt-0.5">
                  {getBranchEmployees(selectedBranch.branch.name).length} total employees
                </p>
              </div>
              <button
                onClick={() => setSelectedBranch(null)}
                className="w-7 h-7 rounded hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              {getBranchEmployees(selectedBranch.branch.name).length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No employees assigned to this branch yet</p>
                  <p className="text-xs text-gray-400 mt-1">Go to Employee Management to assign employees</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {getBranchEmployees(selectedBranch.branch.name).map((employee) => (
                    <div
                      key={employee.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-sm text-gray-900">{employee.name}</h4>
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              employee.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {employee.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Code:</span>
                              <span className="text-gray-900">{employee.employeeCode}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Position:</span>
                              <span className="text-gray-900">{employee.position}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Email:</span>
                              <span className="text-gray-900">{employee.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Phone:</span>
                              <span className="text-gray-900">{employee.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Join Date:</span>
                              <span className="text-gray-900">{employee.joinDate}</span>
                            </div>
                            {employee.kpiPerformance && (
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">KPI Score:</span>
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-semibold">
                                  {employee.kpiPerformance.finalScore} ({employee.kpiPerformance.rating})
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}