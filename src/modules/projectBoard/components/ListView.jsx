import TaskRow from './TaskRow.jsx';

export default function ListView({ tasks, onEdit }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 text-xs font-medium text-gray-500 border-b border-gray-200">
        <div className="col-span-5">任务</div>
        <div className="col-span-2">优先级</div>
        <div className="col-span-2">状态</div>
        <div className="col-span-2">截止日期</div>
        <div className="col-span-1"></div>
      </div>
      {tasks.length > 0 ? tasks.map(task => <TaskRow key={task.id} task={task} onEdit={onEdit} />) : (
        <div className="text-center py-12 text-gray-400 text-sm">该项目下暂无任务，点击"新建任务"开始添加</div>
      )}
    </div>
  );
}
