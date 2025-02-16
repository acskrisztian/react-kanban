import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import useUser from "@/hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from "@/lib/boards";
import { addBoard } from "@/store/boardSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RootState } from "@/store/store";
import { closeCreateBoardModal } from "@/store/modalSlice";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});

const CreateBoard = () => {
  const user = useUser();
  const dispatch = useDispatch();
  const isCreateBoardModalOpen = useSelector((state: RootState) => state.modal.isCreateBoardModalOpen);

  const handleCreateBoard = async (values: { title: string }) => {
    try {
      const newBoard = await createBoard({
        title: values.title,
        admin: user?.id || "",
      });
      dispatch(addBoard({ ...newBoard }));
      dispatch(closeCreateBoardModal());
    } catch (error) {
      console.error("Failed to create board:", error);
    }
  };
  return (
    <Dialog open={isCreateBoardModalOpen} onOpenChange={() => dispatch(closeCreateBoardModal())}>
      <DialogContent>
        <DialogHeader className="font-bold">Create Board</DialogHeader>
        <Formik
          initialValues={{ title: "" }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={async (values, { setSubmitting }) => {
            await handleCreateBoard(values);
            setSubmitting(false);
          }}
        >
          {({
            isSubmitting,
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
          }) => (
            <Form>
              <div className="flex flex-col mb-[8px]">
                <label
                  className="text-[14px] font-medium mb-[8px]"
                  htmlFor="title"
                >
                  Board Name
                </label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter board title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.title && errors.title && (
                  <div className="text-red-500 text-sm">{errors.title}</div>
                )}
              </div>

              <Button
                className="mt-[24px]"
                type="submit"
                disabled={isSubmitting}
              >
                Create Board
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoard;
