export default function TaskCard({
  task,
  editId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  removeTask,
}) {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
      {editId === task._id ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="border p-1 rounded flex-1 mr-2"
        />
      ) : (
        <span className="font-medium">{task.title}</span>
      )}

      <div className="flex gap-2">
        {editId === task._id ? (
          <button onClick={() => saveEdit(task._id)} className="text-green-500">
            Save
          </button>
        ) : (
          <button onClick={() => startEdit(task)} className="text-yellow-500">
            Edit
          </button>
        )}

        <button onClick={() => removeTask(task._id)} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
}
