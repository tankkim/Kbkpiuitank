import { useState } from 'react';
import { CheckCircle, Circle, Calendar, TrendingUp, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import { myTodosToday, todoCompletionHistory, type TodoItem } from '../../data/todoData';
import { MobileHeader } from './MobileHeader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TodoScreenProps {
  onBack: () => void;
  notificationCount?: number;
  onNavigate?: (screen: string) => void;
}

export function TodoScreen({ onBack, notificationCount, onNavigate }: TodoScreenProps) {
  const [todos, setTodos] = useState<TodoItem[]>(myTodosToday);
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date('2026-01-09'));
  const [todoNotes, setTodoNotes] = useState<{ [key: string]: string }>({});

  const handleToggleTodo = (todoId: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return;

    // Check if todo is being completed (not already completed)
    if (!todo.isCompleted) {
      const currentNote = todoNotes[todoId] || todo.notes || '';
      if (!currentNote.trim()) {
        alert('Please add notes before completing this task.');
        return;
      }
    }

    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
          completedAt: !todo.isCompleted ? new Date().toISOString() : undefined,
          notes: todoNotes[todoId] || todo.notes,
        };
      }
      return todo;
    }));
  };

  const handleNoteChange = (todoId: string, note: string) => {
    setTodoNotes({
      ...todoNotes,
      [todoId]: note,
    });
  };

  const handleSaveNote = (todoId: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          notes: todoNotes[todoId] || todo.notes,
        };
      }
      return todo;
    }));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const filteredTodos = todos.filter(todo => {
    const matchesPriority = selectedPriority === 'all' || todo.priority === selectedPriority;
    const matchesCompleted = showCompleted || !todo.isCompleted;
    return matchesPriority && matchesCompleted;
  }).sort((a, b) => {
    // Sort uncompleted first, then by priority
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1; // Uncompleted tasks first
    }
    // Within same completion status, sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const completedCount = todos.filter(t => t.isCompleted).length;
  const totalCount = todos.length;
  const completionRate = Math.round((completedCount / totalCount) * 100);

  const priorityColors = {
    high: 'text-red-600 bg-red-50 border-red-200',
    medium: 'text-orange-600 bg-orange-50 border-orange-200',
    low: 'text-blue-600 bg-blue-50 border-blue-200',
  };

  const isToday = selectedDate.toDateString() === new Date('2026-01-09').toDateString();

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader 
        title="Daily To-Do List" 
        showBack={true}
        onBack={onBack}
        showNotification={true}
        showProfile={true}
        notificationCount={notificationCount}
        onNavigate={onNavigate}
      />

      <div className="p-2.5">
        {/* Date Navigator */}
        <div className="bg-white p-1.5 rounded-lg border border-gray-200 mb-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeDate(-1)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-xs font-semibold">{formatDate(selectedDate)}</span>
              {isToday && (
                <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Today</span>
              )}
            </div>

            <button
              onClick={() => changeDate(1)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          <div className="bg-white p-1.5 rounded-lg border border-gray-200">
            <div className="text-[10px] text-gray-500 mb-0.5">Total</div>
            <div className="text-base font-semibold">{totalCount}</div>
          </div>

          <div className="bg-white p-1.5 rounded-lg border border-gray-200">
            <div className="text-[10px] text-gray-500 mb-0.5">Done</div>
            <div className="text-base font-semibold text-green-600">{completedCount}</div>
          </div>

          <div className="bg-white p-1.5 rounded-lg border border-gray-200">
            <div className="text-[10px] text-gray-500 mb-0.5">Rate</div>
            <div className="text-base font-semibold text-blue-600">{completionRate}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-2 rounded-lg border border-gray-200 mb-2">
          <div className="flex items-center justify-between mb-1 text-xs">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold">{completedCount}/{totalCount}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full transition-all"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg flex items-center justify-between text-xs"
          >
            <span>
              Priority: {selectedPriority === 'all' ? 'All' : selectedPriority.toUpperCase()}
            </span>
            <span className="text-gray-400">{showFilters ? '▲' : '▼'}</span>
          </button>

          {showFilters && (
            <div className="mt-1.5 bg-white border border-gray-200 rounded-lg p-1.5 space-y-1">
              {['all', 'high', 'medium', 'low'].map(priority => (
                <button
                  key={priority}
                  onClick={() => {
                    setSelectedPriority(priority);
                    setShowFilters(false);
                  }}
                  className={`w-full px-2.5 py-1.5 rounded text-xs text-left transition-colors ${
                    selectedPriority === priority
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {priority === 'all' ? 'All Priorities' : priority.toUpperCase()}
                </button>
              ))}
              
              <div className="pt-1.5 mt-1.5 border-t border-gray-200">
                <label className="flex items-center gap-2 px-2.5 py-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCompleted}
                    onChange={(e) => setShowCompleted(e.target.checked)}
                    className="w-3.5 h-3.5"
                  />
                  <span className="text-xs text-gray-700">Show Completed</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* To-Do Items */}
        <div className="space-y-1.5 mb-2.5">
          {filteredTodos.map(todo => {
            const currentNote = todoNotes[todo.id] !== undefined ? todoNotes[todo.id] : (todo.notes || '');
            const hasUnsavedChanges = currentNote !== (todo.notes || '');
            
            return (
              <div
                key={todo.id}
                className={`bg-white rounded-lg border transition-all ${
                  todo.isCompleted ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
                }`}
              >
                <div className="p-2">
                  <div className="flex items-start gap-2 mb-1.5">
                    {/* Checkbox */}
                    <button
                      onClick={() => handleToggleTodo(todo.id)}
                      className="mt-0.5 flex-shrink-0"
                      title={!todo.isCompleted && !currentNote.trim() ? "Please add notes before completing" : ""}
                    >
                      {todo.isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-600 fill-green-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 active:text-blue-600 transition-colors" />
                      )}
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-xs font-semibold mb-0.5 ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}>
                        {todo.title}
                      </h3>
                      <p className={`text-[11px] text-gray-500 mb-1.5 ${todo.isCompleted ? 'line-through' : ''}`}>
                        {todo.description}
                      </p>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] border ${priorityColors[todo.priority]}`}>
                          {todo.priority.toUpperCase()}
                        </span>
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
                          {todo.category}
                        </span>
                        {todo.isCompleted && todo.completedAt && (
                          <span className="text-[10px] text-green-600 flex items-center gap-0.5">
                            <CheckCircle className="w-2.5 h-2.5" />
                            {new Date(todo.completedAt).toLocaleTimeString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notes Section - Always Visible */}
                  <div className="pt-1.5 border-t border-gray-200">
                    <label className="text-[10px] text-gray-600 mb-1 block font-semibold">
                      Notes {!todo.isCompleted && <span className="text-red-500">*</span>}
                    </label>
                    <textarea
                      placeholder="Add notes to complete this task..."
                      className={`w-full p-1.5 border rounded text-[11px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                        !todo.isCompleted && !currentNote.trim() ? 'border-red-200 bg-red-50/30' : 'border-gray-200'
                      }`}
                      rows={2}
                      value={currentNote}
                      onChange={(e) => handleNoteChange(todo.id, e.target.value)}
                      disabled={todo.isCompleted}
                    />
                    {hasUnsavedChanges && (
                      <button
                        onClick={() => handleSaveNote(todo.id)}
                        className="mt-1 px-2.5 py-1 bg-blue-600 text-white rounded text-[10px] active:bg-blue-700 transition-colors flex items-center gap-1"
                      >
                        <Save className="w-2.5 h-2.5" />
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 7-Day Trend Chart */}
        <div className="bg-white p-2.5 rounded-lg border border-gray-200">
          <h3 className="text-xs font-semibold mb-2">7-Day Completion Trend</h3>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={todoCompletionHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 9 }} tickFormatter={(val) => val.slice(5)} />
              <YAxis tick={{ fontSize: 9 }} />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} name="Total" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}