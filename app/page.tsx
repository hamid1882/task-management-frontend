/* eslint-disable */
"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";

import CreateTaskModal from "@/components/CreateTaskModal";
import { PlusIcon } from "@/components/icons";
import TaskCard from "@/components/TaskCard";
import { useEffect, useState } from "react";
import { taskService } from "@/services/api";

type TaskType = {
  _id: string;
  title: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setError("Error Occured");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="my-[18px]  rounded-[10px] p-[12px] min-h-[500px] overflow-auto">
      <div className="flex justify-between items-center mb-[28px]">
        <h1 className="font-semibold">All Tasks</h1>
        <Button
          color="primary"
          variant="shadow"
          startContent={<PlusIcon />}
          onPress={onOpen}
        >
          Create Task
        </Button>
        <CreateTaskModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          fetchTasks={fetchTasks}
        />
      </div>
      <div className="my-[12px] space-y-[12px] pr-[12px]">
        {tasks && tasks.length > 0 ? (
          tasks.map((data, i) => (
            <TaskCard
              key={i}
              title={data.title}
              id={data._id}
              fetchTasks={fetchTasks}
            />
          ))
        ) : (
          <div>
            {error ? (
              <h1>Some Error Occured</h1>
            ) : loading ? (
              <h1>Loading...</h1>
            ) : (
              <p>No Tasks found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
