"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { Icons } from "./icons";

export default function DeleteDialog({ mutate, id, url }) {
  const { toast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/${url}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({
          title: "success",
          description: `${url} has been Deleted!`,
        });
      }

      mutate();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Database Error",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Icons.trashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[50%]">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-start space-y-4"
        >
          <Button type="submit">Save</Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
