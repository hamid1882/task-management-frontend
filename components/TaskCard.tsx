/* eslint-disable */
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { DeleteIcon, EditIcon } from "./icons";
import { useDisclosure } from "@heroui/modal";
import EditTaskModal from "./EditTaskModal";
import { taskService } from "@/services/api";

function TaskCard({
  title,
  id,
  fetchTasks,
}: {
  title: string;
  id: string;
  fetchTasks: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDeleteTask = async () => {
    try {
      await taskService.deleteTask(id);
      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="">
      <CardBody>
        <div className="flex justify-between items-center hover:bg-white/30 cursor-pointer">
          <p>{title}</p>
          <div className="flex gap-[12px] items-center">
            <Button
              color="secondary"
              onPress={onOpen}
              variant="bordered"
              isIconOnly
            >
              <EditIcon />
            </Button>
            <EditTaskModal
              isOpen={isOpen}
              onOpen={onOpen}
              onOpenChange={onOpenChange}
              titleVal={title}
              id={id}
              fetchTasks={fetchTasks}
            />
            <Button
              onPress={handleDeleteTask}
              color="danger"
              variant="ghost"
              isIconOnly
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default TaskCard;
