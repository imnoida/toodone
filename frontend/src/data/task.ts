import {
  Timestamp,
  type FirestoreDataConverter,
  serverTimestamp,
  type FieldValue
} from 'firebase/firestore';

export type Task = {
  __type: 'task';
  id: string;
  userId: string;
  createdAt?: Date | FieldValue; // タスクの作成時刻
  done: boolean; // タスクを完了したかどうか
  name: string; // タスクの内容
  scheduledAt: Date | null | FieldValue; // タスクの期限
};

export const TaskConverter: FirestoreDataConverter<Task> = {
  toFirestore: (task) => {
    return {
      __type: 'task',
      userId: task.userId,
      done: task.done,
      name: task.name,
      scheduledAt: task.scheduledAt instanceof Date
        ? Timestamp.fromDate(task.scheduledAt)
        : task.scheduledAt,
      createdAt: task.createdAt instanceof Date
        ? Timestamp.fromDate(task.createdAt)
        : serverTimestamp()
    };
  },
  fromFirestore: (sn) => {
    const data = sn.data();
    const task = {
      id: sn.id,
      ...data,
      scheduledAt: data.scheduledAt instanceof Timestamp ? data.scheduledAt.toDate() : data.scheduledAt,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : data.createdAt,
    } as Task;
    task.id = sn.id;
    return task;
  },
};