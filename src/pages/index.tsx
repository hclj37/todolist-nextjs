import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Link from "next/link";
import { useState } from "react";

const Home: NextPage = () => {
  const { tab } = useRouter().query

  const [tasks, setTasks] = useState([
    { id: 1, title: 'test1', dueTime: '3月16日 18:00', completed: true, creator: { id: 1, name: '华晨', avatar: 'https://p.ipic.vip/s3zeps.jpg' }, createdAt: '2023-03-04 21:00' },
    { id: 2, title: 'test2', dueTime: null, completed: false, creator: { id: 2, name: '张三', avatar: 'https://p.ipic.vip/s3zeps.jpg' }, createdAt: '2023-03-04 21:00' },
    { id: 3, title: 'test3', dueTime: null, completed: false, creator: { id: 3, name: '林李乐', avatar: 'https://p.ipic.vip/s3zeps.jpg' }, createdAt: '2023-03-04 21:00' },
  ])

  const handleCheckboxChange = (taskId: number, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      )
    );
  };

  return (
    <>
      <Head>
        <title>任务</title>
      </Head>
      <div className="flex h-screen">
        <aside className="w-60 bg-slate-50 py-6 px-2">
          <h1 className="text-xl mb-4 pl-4">任务</h1>
          <div className="text-sm">
            <Link href="/" className={`block rounded py-2 px-4 transition hover:bg-slate-200 ${tab ? '' : 'bg-slate-200'}`}>全部任务</Link>
            <Link href="/?tab=created" className={`block rounded py-2 px-4 transition hover:bg-slate-200 ${tab === 'created' ? 'bg-slate-200' : ''}`}>我创建的</Link>
            <Link href="/?tab=assigned" className={`block rounded py-2 px-4 transition hover:bg-slate-200 ${tab === 'assigned' ? 'bg-slate-200' : ''}`}>我分配的</Link>
            <Link href="/?tab=completed" className={`block rounded py-2 px-4 transition hover:bg-slate-200 ${tab === 'completed' ? 'bg-slate-200' : ''}`}>已完成</Link>
          </div>
        </aside>
        <main className="flex-grow p-6">
          <div className="flex justify-between items-top border-b shadow-slate-200 pb-6 mb-6">
            <h2 className="text-lg">我负责的</h2>
            <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-500">新建</button>
          </div>
          <div className="flex text-xs text-slate-700 pl-14 mb-4">
            <span className="w-96">任务标题</span>
            <span className="w-36">截止时间</span>
            <span className="w-36">创建人</span>
            <span className="w-36">创建时间</span>
            <span>任务 ID</span>
          </div>
          <div>
            {tasks.map(task => (
              <div className="flex items-center h-10 px-6 border-b border-slate-100 transition hover:bg-slate-100" key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                  className="rounded mr-4 cursor-pointer"
                />
                <div className={`text-sm w-96 ${task.completed ? 'text-slate-300 line-through' : 'text-slate-900'}`}>
                  {task.title}
                </div>
                <div className="text-xs w-36 text-slate-500">{task.dueTime}</div>
                <div className="text-sm flex items-center w-36">
                  <Image src={task.creator.avatar} width="16" height="16" alt={task.creator.name} className="rounded-full mr-2" />
                  <span>{task.creator.name}</span>
                </div>
                <div className="text-xs w-36 text-slate-500">{task.createdAt}</div>
                <div className="text-xs text-slate-500">
                  {task.id}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
