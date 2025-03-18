/* eslint-disable */
import { suggestionService, taskService } from "@/services/api";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { DiamondIconNew } from "./icons";
import { useState } from "react";

function EditTaskModal({
  isOpen,
  onOpenChange,
  fetchTasks,
  titleVal,
  id,
}: any) {
  const [title, setTitle] = useState(titleVal);
  const [suggestions, setSuggestions] = useState([
    "food",
    "laundry",
    "cleaning",
    "washing",
  ]);
  const [loading, setLoading] = useState(false);

  const handleUpdateTask = async () => {
    try {
      await taskService.updateTask(id, {
        title: title,
        status: "pending",
      });

      onOpenChange(false);
      fetchTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
    }
  };

  const handleFetchAiSuggestions = async () => {
    setLoading(true);
    try {
      const response = await suggestionService.getSuggestions();
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Task</ModalHeader>
            <ModalBody>
              <Form className="w-full max-w-md">
                <Input
                  isRequired
                  label="Task Name"
                  labelPlacement="outside"
                  name="task"
                  placeholder="What needs to be done?"
                  type="task"
                  className="min-w-full sm:min-w-[380px]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <GenerateUsingAIButton
                  handleFetchAiSuggestions={handleFetchAiSuggestions}
                  loading={loading}
                />
              </Form>
              <div className="space-y-[6px]">
                {suggestions && suggestions.length > 0 ? (
                  suggestions.map((data) => (
                    <div className="flex items-center justify-between py-[8px] px-[14px] rounded shadow">
                      <p>{data}</p>
                      <Button
                        variant="bordered"
                        color="primary"
                        onPress={() => setTitle(data)}
                      >
                        Use
                      </Button>
                    </div>
                  ))
                ) : (
                  <p>loading...</p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => onOpenChange(false)}
              >
                Close
              </Button>
              <Button color="primary" onPress={handleUpdateTask}>
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default EditTaskModal;

const GenerateUsingAIButton = ({ handleFetchAiSuggestions, loading }: any) => {
  return (
    <div className="my-[8px]">
      <Button
        onPress={handleFetchAiSuggestions}
        isLoading={loading}
        color="primary"
        variant="shadow"
      >
        <DiamondIconNew className=" duration-100" />
        Generate
      </Button>
    </div>
  );
};
