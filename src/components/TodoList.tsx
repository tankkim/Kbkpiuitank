import { useState } from 'react';
import { PageHeader } from './PageHeader';
import { CheckCircle, Circle, Clock, TrendingUp, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { myTodosToday, todoCompletionHistory, type TodoItem } from '../data/todoData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TodoListProps {
  unreadNotificationsCount: number;
  onNotificationClick: () => void;
}

export function TodoList({ unreadNotificationsCount, onNotificationClick }: TodoListProps) {
  const [todos, setTodos] = useState<TodoItem[]>(myTodosToday);
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date('2026-01-09'));
  const [todoNotes, setTodoNotes] = useState<{ [key: string]: string }>({});

  const handleToggleTodo = (todoId: string, noteValue: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return;

    // Check if todo is being completed (not already completed)
    if (!todo.isCompleted && !noteValue.trim()) {
      alert('Please add notes before completing this task.');
      return;
    }

    setTodos(todos.map(t => {
      if (t.id === todoId) {
        return {
          ...t,
          isCompleted: !t.isCompleted,
          completedAt: !t.isCompleted ? new Date().toISOString() : undefined,
          notes: noteValue,
        };
      }
      return t;
    }));
    
    // Clear temp note after completion
    if (!todo.isCompleted) {
      setTodoNotes(prev => {
        const newNotes = { ...prev };
        delete newNotes[todoId];
        return newNotes;
      });
    }
  };

  const handleNoteChange = (todoId: string, note: string) => {
    setTodoNotes({
      ...todoNotes,
      [todoId]: note,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const filteredTodos = todos
    .filter(todo => {
      const matchesPriority = selectedPriority === 'all' || todo.priority === selectedPriority;
      const matchesCompleted = showCompleted || !todo.isCompleted;
      return matchesPriority && matchesCompleted;
    })
    .sort((a, b) => {
      // Sort incomplete first
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      return 0;
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
      <PageHeader 
        title="Daily To-Do List"
        unreadNotificationsCount={unreadNotificationsCount}
        onNotificationClick={onNotificationClick}
      />

      <div className="p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Side - To-Do List */}
          <div className="col-span-9">
            {/* Date Navigator */}
            <div className="bg-white p-2.5 rounded-lg border border-gray-200 mb-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => changeDate(-1)}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-semibold">{formatDate(selectedDate)}</span>
                  {isToday && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Today</span>
                  )}
                </div>

                <button
                  onClick={() => changeDate(1)}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-2.5 mb-3">
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Total Tasks</div>
                    <div className="text-xl mt-0.5">{totalCount}</div>
                  </div>
                  <Calendar className="w-7 h-7 text-blue-500" />
                </div>
              </div>

              <div className="bg-white p-2 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Completed</div>
                    <div className="text-xl mt-0.5">{completedCount}</div>
                  </div>
                  <CheckCircle className="w-7 h-7 text-green-500" />
                </div>
              </div>

              <div className="bg-white p-2 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Pending</div>
                    <div className="text-xl mt-0.5">{totalCount - completedCount}</div>
                  </div>
                  <Circle className="w-7 h-7 text-gray-400" />
                </div>
              </div>

              <div className="bg-white p-2 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Completion</div>
                    <div className="text-xl mt-0.5">{completionRate}%</div>
                  </div>
                  <TrendingUp className="w-7 h-7 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white p-3 rounded-lg border border-gray-200 mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm">Progress</span>
                <span className="text-sm font-semibold">{completedCount}/{totalCount} completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2.5 rounded-full transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-2.5 rounded-lg border border-gray-200 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Priority:</span>
                  {['all', 'high', 'medium', 'low'].map(priority => (
                    <button
                      key={priority}
                      onClick={() => setSelectedPriority(priority)}
                      className={`px-2.5 py-1 rounded-lg text-sm transition-colors ${
                        selectedPriority === priority
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCompleted}
                    onChange={(e) => setShowCompleted(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-600">Show Completed</span>
                </label>
              </div>
            </div>

            {/* To-Do Items */}
            <div className="space-y-2">
              {filteredTodos.map(todo => {
                const currentNote = todoNotes[todo.id] !== undefined ? todoNotes[todo.id] : (todo.notes || '');
                
                return (
                  <div
                    key={todo.id}
                    className={`bg-white rounded-lg border-2 transition-all ${
                      todo.isCompleted ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
                    }`}
                  >
                    <div className="p-2.5">
                      <div className="flex items-start gap-2.5">
                        {/* Checkbox */}
                        <button
                          onClick={() => handleToggleTodo(todo.id, currentNote)}
                          className="mt-0.5 flex-shrink-0"
                          disabled={todo.isCompleted}
                        >
                          {todo.isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-green-600 fill-green-100" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400 hover:text-blue-600 transition-colors" />
                          )}
                        </button>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <h3 className={`text-sm font-semibold ${todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                {todo.title}
                              </h3>
                              <p className="text-xs text-gray-500 mt-0.5">{todo.description}</p>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span className={`px-2 py-0.5 rounded-full text-xs border ${priorityColors[todo.priority]}`}>
                                {todo.priority.toUpperCase()}
                              </span>
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                                {todo.category}
                              </span>
                            </div>
                          </div>

                          {/* Notes Section - Always visible */}
                          <div className="mt-2">
                            <div className="text-xs text-gray-600 mb-1 font-semibold">
                              Notes {!todo.isCompleted && <span className="text-red-500">*</span>}
                            </div>
                            <textarea
                              value={currentNote}
                              onChange={(e) => handleNoteChange(todo.id, e.target.value)}
                              placeholder={todo.isCompleted ? "No notes added" : "Add notes before completing this task..."}
                              disabled={todo.isCompleted}
                              className={`w-full px-2.5 py-1.5 text-xs border rounded-lg resize-none ${
                                todo.isCompleted 
                                  ? 'bg-gray-50 border-gray-200 text-gray-500' 
                                  : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                              }`}
                              rows={2}
                            />
                          </div>

                          {/* Completion Info */}
                          {todo.isCompleted && todo.completedAt && (
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-green-600">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Completed: {new Date(todo.completedAt).toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Chart */}
          <div className="col-span-3">
            <div className="bg-white p-3 rounded-lg border border-gray-200 sticky top-4">
              <h3 className="text-sm font-semibold mb-3">7-Day Completion Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={todoCompletionHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }} 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip 
                    labelFormatter={(value) => {
                      const date = new Date(value as string);
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Completed"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Total"
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-800 font-semibold mb-1">Quick Tip</div>
                <div className="text-xs text-blue-700">
                  Add notes to describe what you did for each task. Notes are required before marking as complete.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
