import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import TaskItem from "../components/TaskItem";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TasksScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await AsyncStorage.getItem("tasks");
    if (data) setTasks(JSON.parse(data));
  }

  async function saveTasks(list) {
    setTasks(list);
    await AsyncStorage.setItem(
      "tasks",
      JSON.stringify(list)
    );
  }

  function addTask() {
  if (!task.trim()) return;

  const list = [
    ...tasks,
    {
      id: Date.now().toString(),
      text: task,
      done: false,
    },
  ];

  saveTasks(list);
  setTask("");
}

  function conclude(index) {
    const list = [...tasks];
    list[index].done = !list[index].done;
    saveTasks(list);
  }

  function remove(index) {
    const list = tasks.filter((_, i) => i !== index);
    saveTasks(list);

  function toggleTask(id) {
  const updated = tasks.map((task) =>
    task.id === id
      ? { ...task, done: !task.done }
      : task
  );

  saveTasks(updated);
}

function deleteTask(id) {
  const updated = tasks.filter(
    (task) => task.id !== id
  );

  saveTasks(updated);
}
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nova tarefa"
        value={task}
        onChangeText={setTask}
      />

      <Button title="Adicionar" onPress={addTask} />

     <FlatList
  data={tasks}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TaskItem
      item={item}
      onToggle={toggleTask}
      onDelete={deleteTask}
    />
  )}
/>
    </View>
  );
}