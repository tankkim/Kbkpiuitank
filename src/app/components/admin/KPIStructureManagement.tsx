import { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowLeft, Check, X } from 'lucide-react';
import { kpiIndicators as initialKPIs, KPIIndicator } from '../../data/adminData';

interface KPIStructureManagementProps {
  onBack: () => void;
}

export function KPIStructureManagement({ onBack }: KPIStructureManagementProps) {
  const [kpis, setKPIs] = useState<KPIIndicator[]>(initialKPIs);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingKPI, setEditingKPI] = useState<KPIIndicator | null>(null);
  const [formData, setFormData] = useState<Partial<KPIIndicator>>({
    category: 'main',
    name: '',
    unit: '',
    weight: 0,
    cap: 0,
    regionHead: false,
    branchManager: false,
    branchSalesManager: false,
    rmSales: false,
  });

  const handleAdd = () => {
    const newKPI: KPIIndicator = {
      id: `kpi-${Date.now()}`,
      category: formData.category || 'main',
      name: formData.name || '',
      unit: formData.unit || '',
      weight: formData.weight || 0,
      cap: formData.cap || 0,
      regionHead: formData.regionHead || false,
      branchManager: formData.branchManager || false,
      branchSalesManager: formData.branchSalesManager || false,
      rmSales: formData.rmSales || false,
    };
    setKPIs([...kpis, newKPI]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEdit = (kpi: KPIIndicator) => {
    setEditingKPI(kpi);
    setFormData(kpi);
    setIsAddModalOpen(true);
  };

  const handleUpdate = () => {
    if (editingKPI) {
      setKPIs(
        kpis.map((k) =>
          k.id === editingKPI.id ? { ...k, ...formData } as KPIIndicator : k
        )
      );
      setEditingKPI(null);
      setIsAddModalOpen(false);
      resetForm();
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this KPI indicator?')) {
      setKPIs(kpis.filter((k) => k.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      category: 'main',
      name: '',
      unit: '',
      weight: 0,
      cap: 0,
      regionHead: false,
      branchManager: false,
      branchSalesManager: false,
      rmSales: false,
    });
  };

  const mainIndicators = kpis.filter((k) => k.category === 'main');
  const additionalIndicators = kpis.filter((k) => k.category === 'additional');

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
              <h1 className="text-2xl text-gray-900">KPI Structure Management</h1>
              <p className="text-sm text-gray-600 mt-1">Configure indicators, weights, and position assignments</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingKPI(null);
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Add KPI Indicator
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Main Indicators */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3">
              <h3 className="text-lg">Main Indicators</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left min-w-[250px]">Indicator Name</th>
                    <th className="px-4 py-3 text-center">Unit</th>
                    <th className="px-4 py-3 text-center">Weight</th>
                    <th className="px-4 py-3 text-center">Cap</th>
                    <th className="px-4 py-3 text-center">Region Head</th>
                    <th className="px-4 py-3 text-center">Branch Manager</th>
                    <th className="px-4 py-3 text-center">Branch Sales Mgr</th>
                    <th className="px-4 py-3 text-center">RM Sales</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mainIndicators.map((kpi) => (
                    <tr key={kpi.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 text-gray-900">{kpi.name}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{kpi.unit}</td>
                      <td className="px-4 py-3 text-center text-gray-900">{kpi.weight}</td>
                      <td className="px-4 py-3 text-center text-gray-900">{kpi.cap}</td>
                      <td className="px-4 py-3 text-center">
                        {kpi.regionHead ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {kpi.branchManager ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {kpi.branchSalesManager ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {kpi.rmSales ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(kpi)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(kpi.id)}
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

          {/* Additional Indicators */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3">
              <h3 className="text-lg">Additional Indicators</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left min-w-[250px]">Indicator Name</th>
                    <th className="px-4 py-3 text-center">Unit</th>
                    <th className="px-4 py-3 text-center">Weight</th>
                    <th className="px-4 py-3 text-center">Cap</th>
                    <th className="px-4 py-3 text-center">Region Head</th>
                    <th className="px-4 py-3 text-center">Branch Manager</th>
                    <th className="px-4 py-3 text-center">Branch Sales Mgr</th>
                    <th className="px-4 py-3 text-center">RM Sales</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {additionalIndicators.map((kpi) => (
                    <tr key={kpi.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 text-gray-900">{kpi.name}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{kpi.unit}</td>
                      <td className="px-4 py-3 text-center text-gray-900">{kpi.weight}</td>
                      <td className="px-4 py-3 text-center text-gray-900">{kpi.cap}</td>
                      <td className="px-4 py-3 text-center">
                        {kpi.regionHead ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {kpi.branchManager ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {kpi.branchSalesManager ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {kpi.rmSales ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(kpi)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(kpi.id)}
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-4 rounded-t-2xl">
              <h2 className="text-xl">{editingKPI ? 'Edit KPI Indicator' : 'Add New KPI Indicator'}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'main' | 'additional' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="main">Main Indicators</option>
                    <option value="additional">Additional Indicators</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Number, Idr Mn, %"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Indicator Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter indicator name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Weight</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Cap</label>
                  <input
                    type="number"
                    value={formData.cap}
                    onChange={(e) => setFormData({ ...formData, cap: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-3">Position Assignment</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.regionHead}
                      onChange={(e) => setFormData({ ...formData, regionHead: e.target.checked })}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Region Head</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.branchManager}
                      onChange={(e) => setFormData({ ...formData, branchManager: e.target.checked })}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Branch Manager</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.branchSalesManager}
                      onChange={(e) => setFormData({ ...formData, branchSalesManager: e.target.checked })}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Branch Sales Manager</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rmSales}
                      onChange={(e) => setFormData({ ...formData, rmSales: e.target.checked })}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">RM Sales</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingKPI(null);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingKPI ? handleUpdate : handleAdd}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  {editingKPI ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
